const Vector = require('./vector');
const Matrix = require('./matrix');

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
  Matrix.flat(
    Matrix.slice(matA, vecA.length).map((value, index, arr) =>
      index !== arr.length - 1
        ? value
        : arr.reduce(
            (acc, value, index) => Vector.add(acc, Vector.scale(value, vecA[index])),
            new Float32Array(vecA.length).fill(0.0)
          )
    )
  );

const _rotate = (matA, matR) =>
  Matrix.flat(
    Matrix.slice(matA, Math.sqrt(matA.length)).map((value, i, arr) =>
      i === arr.length - 1
        ? value
        : arr
            .slice(0, 3)
            .reduce((acc, value, j) => Vector.add(acc, Vector.scale(value, matR[i][j])), new Float32Array(4).fill(0.0))
    )
  );

const _scale = (matA, vecA) =>
  Matrix.flat(Matrix.slice(matA, vecA.length).map((row, index) => Vector.scale(row, vecA[index])));

const scale = (matA, vecA) => _scale(matA, Float32Array.of(...vecA, 1.0));
const translate = (matA, vecA) => _translate(matA, Float32Array.of(...vecA, 1.0));
const rotate = (matA, angle, axis) => _rotate(matA, _rotateHelperMatrix(angle, axis));

module.exports = {
  scale,
  translate,
  rotate,
};
