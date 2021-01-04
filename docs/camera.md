# Camera

## perspective
Return a perspective projection matrix : Matrix

Parameter | Type | Description
--------- | ---- | -----------
fovy | Number |  field of view angle in radians
aspect | Number | aspect ratio
near | Number | nearer distance for clipping
far | Number | farther distance for clipping  

### Examples

```js
const camera = GLMath.Camera.perspective(Math.PI / 6.0, 16/9, 1, 10);
```

## ortho
Return a orthogonal projection matrix : Matrix

Parameter | Type | Description
--------- | ---- | -----------
left | Number | left coordinates for clipping 
right | Number | right coordinates for clipping
bottom | Number | bottom coordinates for clipping
top | Number | top coordinates for clipping
near | Number | nearer distance for clipping
far | Number | farther distance for clipping

### Examples

```js
const camera = GLMath.Camera.ortho(-10, 10, -20, 20, 1, 10);
```

## lookAt
Return a look-at view matrix : Matrix

Parameter | Type | Description
--------- | ---- | -----------
eye | Vector | position vector of eye
target | Vector | position vector of target
up | Vector | up vector

### Examples

```js
const eye = new Float32Array([0, 0, 0]);  // origin
const target = new Float32Array([0, 0, 3]);
const up = new Float32Array([0, 1, 0]);

const camera = GLMath.Camera.lookAt(eye, target, up);

// camera is looking at from origin to +z

```
