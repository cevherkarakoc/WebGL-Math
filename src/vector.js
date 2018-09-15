const negative = vec => vec.map(value => -value);

const reverse = vec => [...vec].reverse();

const length = vec => Math.sqrt(vec.reduce(
  (acc, value) => acc + Math.pow(value, 2), 0.0
));

const scale = (vec, number) => vec.map( val => val * number);

const normalize = vec => scale(vec, 1 / length(vec));

const add = (vecA, vecB) => vecA.map((value, index) => value + vecB[index]);

const subtract = (vecA, vecB) => add(vecA, negative(vecB));

const multiply = (vecA, vecB) => vecA.map( (value, index) => value * vecB[index] ); // component-wise

const dot = (vecA, vecB) => vecA.reduce((acc, val, index) => acc + val * vecB[index], 0.0);

module.exports = {
  negative,
  reverse,
  length,
  scale,
  normalize,
  add,
  subtract,
  multiply,
  dot
}