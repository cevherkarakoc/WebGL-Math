# Matrix (column-major)

## idendity
Return the identity matrix : Matrix

Parameter | Type | Description
--------- | ---- | -----------
number | Number | size of matrix

### Examples

```js
const myMatrix = GLMath.Matrix.idendity( 3 );

//myMatrix : [1, 0, 0,
//            0, 1, 0,
//            0, 0, 1]
```

## determinant
Return the determinant of the matrix : Number

Parameter | Type | Description
--------- | ---- | -----------
matrix | Matrix | Matrix to calculating determinant

### Examples

```js
const myMatrix = GLMath.Matrix.idendity( 3 );
const determinant = GLMath.Matrix.determinant( myMatrix ); // 1
```

## transpose
Return the transpose of the matrix : Matrix

Parameter | Type | Description
--------- | ---- | -----------
matrix | Matrix | Matrix to transpose

### Examples

```js
const myMatrix = new Float32Array([1, 2,
                                   3, 4]);
const transposeMatrix = GLMath.Matrix.transpose( myMatrix );

//transposeMatrix : [1, 3,
//                   2, 4]
```

## negative
Return the negative of the matrix : Matrix

Parameter | Type | Description
--------- | ---- | -----------
matrix | Matrix | Matrix to negative

### Examples

```js
const myMatrix = new Float32Array([4, -2,
                                   1, -3]);
const negativeMatrix = GLMath.Matrix.negative( myMatrix );

//negativeMatrix : [-4, 2,
//                  -1, 3]
```

## multiplyScalar
Return the product of the matrix and the scalar : Matrix

Parameter | Type | Description
--------- | ---- | -----------
matrix | Matrix | Matrix to multiply
number | Number | Factor

### Examples

```js
const myMatrix = new Float32Array([3, 4,
                                   5, 1]);
const resultMatrix = GLMath.Matrix.multiplyScalar( myMatrix , 3 );

//resultMatrix : [9, 12,
//                15, 3]
```

## multiplyVector
Return the product of the matrix and the vector : Vector

Parameter | Type | Description
--------- | ---- | -----------
matrix | Matrix | Matrix to multiply
vector | Vector | Vector

### Examples

```js
const myMatrix = new Float32Array([3, 4,
                                   5, 1]);
const resultVector = GLMath.Matrix.multiplyVector( myMatrix , new Float32Array([2, 3]) );

//resultVector : [21, 11]
```

## add
Return the sum of two matrices: Matrix

Parameter | Type | Description
--------- | ---- | -----------
matrixA | Matrix | First Matrix to add
matrixB | Matrix | Second Matrix to add

### Examples

```js
const matrixA = new Float32Array([1, 5,
                                  1, 3]);
const matrixB = new Float32Array([2, 3,
                                  4, 1]);
const resultMatrix = GLMath.Matrix.add( matrixA , matrixB );

//resultMatrix : [3, 8,
//                5, 4]
```

## subtract
Return the difference of two matrices: Matrix

Parameter | Type | Description
--------- | ---- | -----------
matrixA | Matrix | Minuend Matrix
matrixB | Matrix | Subtrahend Matrix

### Examples

```js
const matrixA = new Float32Array([1, 5,
                                  1, 3]);
const matrixB = new Float32Array([2, 3,
                                  4, 1]);
const resultMatrix = GLMath.Matrix.subtract( matrixA , matrixB );

//resultMatrix : [-1, 2,
//                -3, 2]
```

## multiplyCompWise
Return the component wise multiplication of two matrices: Matrix

Parameter | Type | Description
--------- | ---- | -----------
matrixA | Matrix | First Matrix to multiply
matrixB | Matrix | Second Matrix to multiply

### Examples

```js
const matrixA = new Float32Array([1, 5,
                                  1, 3]);
const matrixB = new Float32Array([2, 3,
                                  4, 1]);
const resultMatrix = GLMath.Matrix.multiplyCompWise( matrixA , matrixB );

//resultMatrix : [2, 15,
//                4, 3 ]
```

## multiply
Return the product of two matrices: Matrix

Parameter | Type | Description
--------- | ---- | -----------
matrixA | Matrix | Left operand
matrixB | Matrix | Right operand

### Examples

```js
const matrixA = new Float32Array([1, 5,
                                  1, 3]);
const matrixB = new Float32Array([2, 3,
                                  4, 1]);
const resultMatrix = GLMath.Matrix.multiply( matrixA , matrixB );

//resultMatrix : [5, 19,
//                5, 23]
```