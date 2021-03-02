# WebGL-Math
[![npm version](https://img.shields.io/npm/v/webgl-math.svg?style=flat)](https://www.npmjs.com/package/webgl-math)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

A functional mathematics library for WebGL. 

# Usage

## Getting Started
Install with npm or yarn
```
npm install webgl-math
// or
yarn add webgl-math
```
 then

```js
const GLMath = require('webgl-math')
// or
import GLMath from 'webgl-math'
```

### Example
Here's a simple example to create Model, View and Projection Matrices.

For more, see the docs
```js
import { Vector, Matrix, Transform, Camera } from 'webgl-math';

const scaleMatrix = Transform.scale(
  Matrix.idendity(4), 
  Float32Array.of(2, 2, 1) // Scale Vector
);

const translateMatrix  = Transform.translate(
  Matrix.idendity(4),
  Float32Array.of(4, 0, 0) // Position Vector
);

// Creating 4x4 Model Matrix except rotation
const modelMatrix = Matrix.multiply(
  translateMatrix,
  scaleMatrix
);

// Creating Perspective Projection Matrix with fovy and aspect ratio
const projectionMatrix = Camera.perspective(Math.PI / 4, 1, 0.1, 100);

// Creating View Matrix
const viewMatrix = Camera.lookAt(
  Float32Array.of(0, 0, 10), // Eye Position
  Float32Array.of(0, 0, -1), // Target
  Float32Array.of(0, 1, 0)   // Up Vector
);
```

# License
Licensed under the [MIT license](LICENSE).
