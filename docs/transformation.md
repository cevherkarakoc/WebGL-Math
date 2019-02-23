# Transformation

## translate
Return the translated matrix : Matrix

Parameter | Type | Description
--------- | ---- | -----------
matrix | Matrix | the matrix to translate
vector | Vector | the translation vector

### Examples

```js
const myMatrix = GLMath.Matrix.idendity( 4 );

const resultMatrix = GLMath.Matrix.Transform.translate(myMatrix, [1.5, 3.0, 0.75]);

//resultMatrix : [1, 0, 0, 1.5 
//                0, 1, 0, 3.0 
//                0, 0, 1, 0.75
//                0, 0, 0, 1.0 ]
```

## rotate
Return the rotated matrix : Matrix

Parameter | Type | Description
--------- | ---- | -----------
matrix | Matrix | the matrix to rotate
angle | Number |  the angle of rotation in radians
axis | Vector | the axis to rotate around

### Examples

```js
const myMatrix = GLMath.Matrix.idendity( 4 );
const angle = Math.PI / 4;
const axis = [1, 1, 0];

const resultMatrix = GLMath.Matrix.Transform.rotate(myMatrix, angle, axis);

//resultMatrix : [0.009999999776482582, 0, 0, 0,
//                0, 0.004999999888241291, 0, 0,
//                0, 0, -0.021052632480859756, -1.105263113975525,
//                0, 0, 0, 1
//               ]
```

## scale
Return the scaled matrix : Matrix

Parameter | Type | Description
--------- | ---- | -----------
matrix | Matrix | the matrix to scale
vector | Vector | the scaling vector

### Examples

```js
const myMatrix = GLMath.Matrix.idendity( 4 );

const resultMatrix = GLMath.Matrix.Transform.scale(myMatrix, [1.5, 3.0, 0.75]);

//resultMatrix : [1.5, 0  , 0   , 0
//                0  , 3.0, 0   , 0
//                0  , 0  , 0.75, 0
//                0  , 0  , 0   , 1.0 ]
```