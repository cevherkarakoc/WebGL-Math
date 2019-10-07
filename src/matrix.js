const Vector = require('./vector');

// Only Square Matrix
const slice = (matA, length) =>
  Array.from(new Float32Array(length), (_, index) =>
    matA.slice(index * length, (index + 1) * length)
  );

const flat = slicedMat =>
  new Float32Array(
    slicedMat.reduce((acc, value) =>
      Vector.concat(acc, new Float32Array(value))
    )
  );

const idendity = rowCount =>
  Float32Array.from(new Float32Array(rowCount * rowCount)).map((value, index) =>
    index % (rowCount + 1) == 0 ? 1 : 0
  );

const determinant = matA => {
  if (matA.length === 1) return matA[0];
  else {
    const row = Math.sqrt(matA.length);

    return matA.slice(0, row).reduce((acc, value, index) => {
      const tempMat = matA.filter(
        (_, j) => j >= row && (j - index) % row !== 0
      );

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
  new Float32Array(
    slice(transpose(matA), vecA.length).map(row =>
      row.reduce((acc, value, index) => acc + value * vecA[index], 0.0)
    )
  );

const add = (matA, matB) => matA.map((value, index) => value + matB[index]);

const subtract = (matA, matB) => add(matA, negative(matB));

const multiplyCompWise = (matA, matB) =>
  matA.map((value, index) => value * matB[index]); // component-wise

const _multiply = (matA, matB) =>
  Float32Array.from(new Float32Array(matA.length * matA.length), (_, index) =>
    Vector.dot(matA[index % matA.length], matB[Math.floor(index / matA.length)])
  );

const multiply = (matA, matB) =>
  _multiply(
    slice(transpose(matA), Math.sqrt(matA.length)),
    slice(matB, Math.sqrt(matB.length))
  );

// Transform Functions

const _rotateHelperMatrix = (angle, _axis) => {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  const axis = Vector.normalize(_axis);
  const t = Vector.scale(axis, 1 - cos);

  const col1 = new Float32Array([
    cos + t[0] * axis[0],
    t[0] * axis[1] + sin * axis[2],
    t[0] * axis[2] - sin * axis[1],
  ]);

  const col2 = new Float32Array([
    t[1] * axis[0] - sin * axis[2],
    cos + t[1] * axis[1],
    t[1] * axis[2] + sin * axis[0],
  ]);

  const col3 = new Float32Array([
    t[2] * axis[0] + sin * axis[1],
    t[2] * axis[1] - sin * axis[0],
    cos + t[2] * axis[2],
  ]);

  return [col1, col2, col3];
};

const _translate = (matA, vecA) =>
  flat(
    slice(matA, vecA.length).map((value, index, arr) =>
      index !== arr.length - 1
        ? value
        : arr.reduce(
            (acc, value, index) =>
              Vector.add(acc, Vector.scale(value, vecA[index])),
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
            .reduce(
              (acc, value, j) =>
                Vector.add(acc, Vector.scale(value, matR[i][j])),
              new Float32Array(4).fill(0.0)
            )
    )
  );

const _scale = (matA, vecA) =>
  flat(
    slice(matA, vecA.length).map((row, index) => Vector.scale(row, vecA[index]))
  );

const Transform = {
  scale: (matA, vecA) =>
    _scale(matA, Vector.concat(vecA, new Float32Array([1.0]))),
  translate: (matA, vecA) =>
    _translate(matA, Vector.concat(vecA, new Float32Array([1.0]))),
  rotate: (matA, angle, axis) =>
    _rotate(matA, _rotateHelperMatrix(angle, axis)),
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
    (right + left) / (left - right), (top + bottom) / (bottom - top), (far + near) / (near - far), 1,
  ],

  lookAt: (eye, target, _up) => {
    const forward = Vector.normalize(Vector.subtract(eye, target));
    const right = Vector.cross(Vector.normalize(_up), forward);
    const up = Vector.cross(forward, right);

    return multiply(
      transpose(
        flat([
          Vector.concat(right, new Float32Array([0.0])),
          Vector.concat(up, new Float32Array([0.0])),
          Vector.concat(forward, new Float32Array([0.0])),
          new Float32Array([0, 0, 0, 1]),
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
