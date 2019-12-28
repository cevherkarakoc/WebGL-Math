const Vector = require('./vector');

// Only Square Matrix
const slice = (matA, length) =>
  Array.from(new Float32Array(length), (_, index) => matA.slice(index * length, (index + 1) * length));

const flat = slicedMat =>
  Float32Array.from(slicedMat.reduce((acc, value) => Float32Array.of(...acc, ...Float32Array.from(value))));

const idendity = rowCount =>
  new Float32Array(rowCount * rowCount).map((_, index) => (index % (rowCount + 1) === 0 ? 1 : 0));

const determinant = matA => {
  if (matA.length === 1) return matA[0];
  else {
    const row = Math.sqrt(matA.length);

    return matA.slice(0, row).reduce((acc, value, index) => {
      const tempMat = matA.filter((_, j) => j >= row && (j - index) % row !== 0);

      const sign = index % 2 == 0 ? 1 : -1;

      return acc + sign * value * determinant(tempMat);
    }, 0.0);
  }
};

const transpose = matA => {
  const row = Math.sqrt(matA.length);

  return Float32Array.from(
    new Float32Array(matA.length),
    (_, index) => (index % row) * row + Math.floor(index / row)
  ).map(value => matA[value]);
};

const negative = matA => multiplyScalar(matA, -1);

const multiplyScalar = (matA, number) => matA.map(value => value * number);

const multiplyVector = (matA, vecA) =>
  Float32Array.from(
    slice(transpose(matA), vecA.length),
    row => row.reduce((acc, value, index) => acc + value * vecA[index], 0.0)
  );

const add = (matA, matB) => matA.map((value, index) => value + matB[index]);

const subtract = (matA, matB) => add(matA, negative(matB));

const multiplyCompWise = (matA, matB) => matA.map((value, index) => value * matB[index]); // component-wise

const _multiply = (matA, matB) =>
  new Float32Array(matA.length * matA.length).map((_, index) =>
    Vector.dot(matA[index % matA.length], matB[Math.floor(index / matA.length)])
  );

const multiply = (matA, matB) =>
  _multiply(slice(transpose(matA), Math.sqrt(matA.length)), slice(matB, Math.sqrt(matB.length)));

// Transform Functions
const _rotateHelperMatrix = (angle, _axis) => {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  const axis = Vector.normalize(_axis);
  const t = Vector.scale(axis, 1 - cos);

  const col1 = Float32Array.of(cos + t[0] * axis[0], t[0] * axis[1] + sin * axis[2], t[0] * axis[2] - sin * axis[1]);

  const col2 = Float32Array.of(t[1] * axis[0] - sin * axis[2], cos + t[1] * axis[1], t[1] * axis[2] + sin * axis[0]);

  const col3 = Float32Array.of(t[2] * axis[0] + sin * axis[1], t[2] * axis[1] - sin * axis[0], cos + t[2] * axis[2]);

  return [col1, col2, col3];
};

const _translate = (matA, vecA) =>
  flat(
    slice(matA, vecA.length).map((value, index, arr) =>
      index !== arr.length - 1
        ? value
        : arr.reduce(
            (acc, value, index) => Vector.add(acc, Vector.scale(value, vecA[index])),
            new Float32Array(vecA.length).fill(0.0)
          )
    )
  );

const _rotate = (matA, matR) =>
  flat(
    slice(matA, Math.sqrt(matA.length)).map((value, i, arr) =>
      i === arr.length - 1
        ? value
        : arr
            .slice(0, 3)
            .reduce((acc, value, j) => Vector.add(acc, Vector.scale(value, matR[i][j])), new Float32Array(4).fill(0.0))
    )
  );

const _scale = (matA, vecA) => flat(slice(matA, vecA.length).map((row, index) => Vector.scale(row, vecA[index])));

const Transform = {
  scale: (matA, vecA) => _scale(matA, Float32Array.of(...vecA, 1.0)),
  translate: (matA, vecA) => _translate(matA, Float32Array.of(...vecA, 1.0)),
  rotate: (matA, angle, axis) => _rotate(matA, _rotateHelperMatrix(angle, axis)),
};

const Camera = {
  perspective: (fovy, aspect, near, far) => {
    const thf = 1 / Math.tan(fovy * 0.5);

    return [
      thf / aspect, 0, 0, 0,
      0, thf, 0, 0,
      0, 0, (far + near) / (near - far), -1,
      0, 0, (2 * far * near) / (near - far), 0,
    ];
  },

  ortho: (left, right, bottom, top, near, far) => [
    2 / (left - right), 0, 0, 0,
    0, 2 / (top - bottom), 0, 0,
    0, 0, 2 / (near - far), 0,
    (right + left) / (left - right),
    (top + bottom) / (bottom - top),
    (far + near) / (near - far),
    1,
  ],

  lookAt: (eye, target, _up) => {
    const forward = Vector.normalize(Vector.subtract(eye, target));
    const right = Vector.cross(Vector.normalize(_up), forward);
    const up = Vector.cross(forward, right);

    return multiply(
      transpose(
        flat([
          Float32Array.of(...right, 0.0),
          Float32Array.of(...up, 0.0),
          Float32Array.of(...forward, 0.0),
          Float32Array.of(0, 0, 0, 1),
        ])
      ),
      Transform.translate(idendity(4), negative(eye))
    );
  },
};

module.exports = {
  idendity,
  determinant,
  transpose,
  negative,
  multiplyScalar,
  multiplyVector,
  add,
  subtract,
  multiplyCompWise,
  multiply,
  Transform,
  Camera,
};
