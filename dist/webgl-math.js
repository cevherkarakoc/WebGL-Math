(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.GLMath = {}));
}(this, (function (exports) { 'use strict';

  var name = "webgl-math";
  var version = "1.1.0";
  var description = "A Mathematics Library for WebGL";
  var main = "index.js";
  var scripts = {
  	build: "rollup -c",
  	test: "jest",
  	"test-watchAll": "jest --watchAll",
  	"test-vector": "jest vector",
  	"test-matrix": "jest matrix",
  	prepublish: "npm run build"
  };
  var repository = {
  	type: "git",
  	url: "git+https://github.com/cevherkarakoc/WebGL-Math.git"
  };
  var author = "cevherkarakoc <cevherkarakoc@live.com> (https://github.com/cevherkarakoc)";
  var license = "MIT";
  var bugs = {
  	url: "https://github.com/cevherkarakoc/WebGL-Math/issues"
  };
  var homepage = "https://github.com/cevherkarakoc/WebGL-Math#readme";
  var devDependencies = {
  	jest: "^25.1.0",
  	rollup: "^2.1.0",
  	"@rollup/plugin-commonjs": "^11.0.2",
  	"@rollup/plugin-json": "^4.0.2",
  	"rollup-plugin-terser": "^5.3.0"
  };
  var _package = {
  	name: name,
  	version: version,
  	description: description,
  	main: main,
  	scripts: scripts,
  	repository: repository,
  	author: author,
  	license: license,
  	bugs: bugs,
  	homepage: homepage,
  	devDependencies: devDependencies
  };

  var _package$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    name: name,
    version: version,
    description: description,
    main: main,
    scripts: scripts,
    repository: repository,
    author: author,
    license: license,
    bugs: bugs,
    homepage: homepage,
    devDependencies: devDependencies,
    'default': _package
  });

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

  var vector = {
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

  const negative$1 = matA => multiplyScalar(matA, -1);

  const multiplyScalar = (matA, number) => matA.map(value => value * number);

  const multiplyVector = (matA, vecA) =>
    Float32Array.from(slice(transpose(matA), vecA.length), row =>
      row.reduce((acc, value, index) => acc + value * vecA[index], 0.0)
    );

  const add$1 = (matA, matB) => matA.map((value, index) => value + matB[index]);

  const subtract$1 = (matA, matB) => add$1(matA, negative$1(matB));

  const multiplyCompWise = (matA, matB) => matA.map((value, index) => value * matB[index]); // component-wise

  const _multiply = (matA, matB) =>
    new Float32Array(matA.length * matA.length).map((_, index) =>
      vector.dot(matA[index % matA.length], matB[Math.floor(index / matA.length)])
    );

  const multiply$1 = (matA, matB) =>
    _multiply(slice(transpose(matA), Math.sqrt(matA.length)), slice(matB, Math.sqrt(matB.length)));

  var matrix = {
    slice,
    flat,
    idendity,
    determinant,
    transpose,
    negative: negative$1,
    multiplyScalar,
    multiplyVector,
    add: add$1,
    subtract: subtract$1,
    multiplyCompWise,
    multiply: multiply$1,
  };

  const _rotateHelperMatrix = (angle, _axis) => {
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    const axis = vector.normalize(_axis);
    const t = vector.scale(axis, 1 - cos);

    const col1 = Float32Array.of(cos + t[0] * axis[0], t[0] * axis[1] + sin * axis[2], t[0] * axis[2] - sin * axis[1]);

    const col2 = Float32Array.of(t[1] * axis[0] - sin * axis[2], cos + t[1] * axis[1], t[1] * axis[2] + sin * axis[0]);

    const col3 = Float32Array.of(t[2] * axis[0] + sin * axis[1], t[2] * axis[1] - sin * axis[0], cos + t[2] * axis[2]);

    return [col1, col2, col3];
  };

  const _translate = (matA, vecA) =>
    matrix.flat(
      matrix.slice(matA, vecA.length).map((value, index, arr) =>
        index !== arr.length - 1
          ? value
          : arr.reduce(
              (acc, value, index) => vector.add(acc, vector.scale(value, vecA[index])),
              new Float32Array(vecA.length).fill(0.0)
            )
      )
    );

  const _rotate = (matA, matR) =>
    matrix.flat(
      matrix.slice(matA, Math.sqrt(matA.length)).map((value, i, arr) =>
        i === arr.length - 1
          ? value
          : arr
              .slice(0, 3)
              .reduce((acc, value, j) => vector.add(acc, vector.scale(value, matR[i][j])), new Float32Array(4).fill(0.0))
      )
    );

  const _scale = (matA, vecA) =>
    matrix.flat(matrix.slice(matA, vecA.length).map((row, index) => vector.scale(row, vecA[index])));

  const scale$1 = (matA, vecA) => _scale(matA, Float32Array.of(...vecA, 1.0));
  const translate = (matA, vecA) => _translate(matA, Float32Array.of(...vecA, 1.0));
  const rotate$1 = (matA, angle, axis) => _rotate(matA, _rotateHelperMatrix(angle, axis));

  var transform = {
    scale: scale$1,
    translate,
    rotate: rotate$1,
  };

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
    const forward = vector.normalize(vector.subtract(eye, target));
    const right = vector.cross(vector.normalize(_up), forward);
    const up = vector.cross(forward, right);

    return matrix.multiply(
      matrix.transpose(
        matrix.flat([
          Float32Array.of(...right, 0.0),
          Float32Array.of(...up, 0.0),
          Float32Array.of(...forward, 0.0),
          Float32Array.of(0, 0, 0, 1),
        ])
      ),
      transform.translate(matrix.idendity(4), matrix.negative(eye))
    );
  };

  var camera = {
    perspective,
    ortho,
    lookAt,
  };

  function getCjsExportFromNamespace (n) {
  	return n && n['default'] || n;
  }

  var require$$0 = getCjsExportFromNamespace(_package$1);

  const version$1 = require$$0.version;

  var VERSION = version$1;
  var Vector = vector;
  var Matrix = matrix;
  var Camera = camera;
  var Transform = transform;

  var WebGLMath = {
  	VERSION: VERSION,
  	Vector: Vector,
  	Matrix: Matrix,
  	Camera: Camera,
  	Transform: Transform
  };

  exports.Camera = Camera;
  exports.Matrix = Matrix;
  exports.Transform = Transform;
  exports.VERSION = VERSION;
  exports.Vector = Vector;
  exports.default = WebGLMath;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
