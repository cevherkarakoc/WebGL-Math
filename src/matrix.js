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
  Float32Array.from(slice(transpose(matA), vecA.length), row =>
    row.reduce((acc, value, index) => acc + value * vecA[index], 0.0)
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

module.exports = {
  slice,
  flat,
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
};
