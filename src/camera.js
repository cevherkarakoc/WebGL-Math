const Vector = require('./vector');
const Matrix = require('./matrix');
const Transform = require('./transform');

const perspective = (fovy, aspect, near, far) => {
  const thf = 1 / Math.tan(fovy * 0.5);

  return Float32Array.of(
    thf / aspect, 0, 0, 0,
    0, thf, 0, 0,
    0, 0, (far + near) / (near - far), -1,
    0, 0, (2 * far * near) / (near - far), 0,
  );
};

const ortho = (left, right, bottom, top, near, far) => Float32Array.of(
  2 / (left - right), 0, 0, 0,
  0, 2 / (top - bottom), 0, 0,
  0, 0, 2 / (near - far), 0,
  (right + left) / (left - right),
  (top + bottom) / (bottom - top),
  (far + near) / (near - far),
  1,
);

const lookAt = (eye, target, _up) => {
  const forward = Vector.normalize(Vector.subtract(eye, target));
  const right = Vector.cross(Vector.normalize(_up), forward);
  const up = Vector.cross(forward, right);

  return Matrix.multiply(
    Matrix.transpose(
      Matrix.flat([
        Float32Array.of(...right, 0.0),
        Float32Array.of(...up, 0.0),
        Float32Array.of(...forward, 0.0),
        Float32Array.of(0, 0, 0, 1),
      ])
    ),
    Transform.translate(Matrix.idendity(4), Matrix.negative(eye))
  );
};

module.exports = {
  perspective,
  ortho,
  lookAt,
};