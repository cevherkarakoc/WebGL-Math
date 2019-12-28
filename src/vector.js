const negative = vec => vec.map(value => -value);

const reverse = vec => Float32Array.from(vec).reverse();

const length = vec => Math.sqrt(vec.reduce((acc, value) => acc + Math.pow(value, 2), 0.0));

const scale = (vec, number) => vec.map(val => val * number);

const normalize = vec => scale(vec, 1 / (len => (len > 0 ? len : 1))(length(vec)));

const add = (vecA, vecB) => vecA.map((value, index) => value + vecB[index]);

const subtract = (vecA, vecB) => add(vecA, negative(vecB));

const multiply = (vecA, vecB) => vecA.map((value, index) => value * vecB[index]); // component-wise

const dot = (vecA, vecB) => vecA.reduce((acc, val, index) => acc + val * vecB[index], 0.0);

const cross = (vecA, vecB) =>
  Float32Array.of(
    vecA[1] * vecB[2] - vecA[2] * vecB[1],
    vecA[2] * vecB[0] - vecA[0] * vecB[2],
    vecA[0] * vecB[1] - vecA[1] * vecB[0]
  );

const fromAngle = angle => Float32Array.of(Math.cos(angle), Math.sin(angle));

const toAngle = vec => Math.atan2(vec[1], vec[0]);

const rotate = (vec, angle) => fromAngle(toAngle(vec) + angle);

const swizzle = (vec, swizz) => Float32Array.from(swizz.map(index => vec[Math.abs(index)] * Math.sign(1 / index)));

module.exports = {
  negative,
  reverse,
  length,
  scale,
  normalize,
  add,
  subtract,
  multiply,
  dot,
  cross,
  fromAngle,
  toAngle,
  rotate,
  swizzle,
};
