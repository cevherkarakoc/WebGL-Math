const Vector = require('./vector');

// Only Square Matrix
const slice = (matA, length) => Array
  .from(new Array(length), (_, index) => matA.slice(index * length, (index + 1) * length));

const flat = (slicedMat) => slicedMat.reduce((acc, value) => acc.concat(value));

const idendity = (rowCount) => Array.from(Array(rowCount * rowCount)).map(
  (value, index) => index % (rowCount + 1) == 0 ? 1 : 0
);

const determinant = (matA) => {
  if (matA.length === 1) return matA[0];
  else {
    const row = Math.sqrt(matA.length);

    return matA.slice(0, row).reduce((acc, value, index) => {
      const tempMat = matA.filter((_, j) => j >= row && (j - index) % row !== 0)

      const sign = index % 2 == 0 ? 1 : -1;

      return acc + sign * value * determinant(tempMat);
    }, 0.0);
  }
}

const transpose = (matA) => {
  const row = Math.sqrt(matA.length);

  return Array
    .from(new Array(matA.length), (_, index) => (index % row) * row + Math.floor(index / row))
    .map(value => matA[value]);
}

const negative = (matA) => multiplyScalar(matA, -1);

const multiplyScalar = (matA, number) => matA.map(value => value * number);

const multiplyVector = (matA, vecA) => slice(matA, vecA.length)
  .map(row => row.reduce((acc, value, index) => acc + value * vecA[index], 0.0));

const add = (matA, matB) => matA.map((value, index) => value + matB[index]);

const subtract = (matA, matB) => add(matA, negative(matB));

const multiply = (matA, matB) => matA.map((value, index) => value * matB[index]); // component-wise

// Transform Functions

const _rotateHelperMatrix = (angle, _axis) => {
  const sin = Math.sin(angle);
  const cos = Math.cos(angle);
  const axis = Vector.normalize(_axis);
  const t = Vector.scale(axis, 1 - cos);

  const col1 = [
    cos + t[0] * axis[0],
    t[0] * axis[1] + sin * axis[2],
    t[0] * axis[2] - sin * axis[1]
  ];

  const col2 = [
    t[1] * axis[0] - sin * axis[2],
    cos + t[1] * axis[1],
    t[1] * axis[2] + sin * axis[0],
  ];

  const col3 = [
    t[2] * axis[0] + sin * axis[1],
    t[2] * axis[1] - sin * axis[0],
    cos + t[2] * axis[2],
  ];

  return [col1, col2, col3];
}

const _translate = (matA, vecA) => transpose(flat(slice(transpose(matA), vecA.length)
  .map((value, index, arr) => index !== (arr.length - 1)
    ? value
    : arr.reduce(
      (acc, value, index) => Vector.add(acc, Vector.scale(value, vecA[index])),
      new Array(vecA.length).fill(0.0)
    )
  )
));

const _rotate = (matA, matR) => transpose(flat(slice(transpose(matA), 4)
  .map((value, i, arr) => i === (arr.length - 1)
    ? value
    : arr.slice(0, 3).reduce(
      (acc, value, j) => Vector.add(acc, Vector.scale(value, matR[i][j])),
      new Array(4).fill(0.0)
    ))
));

const _scale = (matA, vecA) => transpose(flat(
  slice(transpose(matA), vecA.length)
    .map((row, index) => Vector.scale(row, vecA[index]))
));

const Transform = {
  scale: (matA, vecA) => _scale(matA, vecA.concat(1.0)),
  translate: (matA, vecA) => _translate(matA, vecA.concat(1.0)),
  rotate: (matA, angle, axis) => _rotate(matA, _rotateHelperMatrix(angle, axis))
}

module.exports = {
  idendity,
  determinant,
  transpose,
  negative,
  multiplyScalar,
  multiplyVector,
  add,
  subtract,
  multiply,
  Transform
}