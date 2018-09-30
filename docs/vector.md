# Vector

## negative
Return the negative of the vector : Vector

Parameter | Type | Description
--------- | ---- | -----------
vector | Vector | Vector to negative

### Examples

```js
const myVector = [2, 5, -7];
const negativeVector = GLMath.Vector.negative( myVector );

//myVector : [2, 5, -7]
//negativeVector : [-2, -5, 7]
```

## reverse
Return the reverse of the vector : Vector

Parameter | Type | Description
--------- | ---- | -----------
vector | Vector | Vector to reverse

### Examples

```js
const myVector = [2, 5, -7];
const reverseVector = GLMath.Vector.reverse( myVector );

//myVector : [2, 5, -7]
//negativeVector : [-7, 5, 2]
```

## length
Return the length(magnitude) of the vector: Number

Parameter | Type | Description
--------- | ---- | -----------
vector | Vector | Vector to calculate length of

### Examples

```js
const myVector = [3, 4];
const length = GLMath.Vector.length( myVector ); // 5
```

## normalize
Return normalized vector: Vector

Parameter | Type | Description
--------- | ---- | -----------
vector | Vector | Vector to normalize

### Examples

```js
const myVector = [3, 4];
const normalizedVector = GLMath.Vector.normalize( myVector ); // [0.6, 0.8]
```

## scale
Return scaled vector: Vector

Parameter | Type | Description
--------- | ---- | -----------
vector | Vector | Vector to scale
number | Number | Factor

### Examples

```js
const myVector = [3, 4];
const resultVector = GLMath.Vector.scale( myVector, 3 ); // [9, 12]
```

## add
Return the sum of the vectors: Vector

Parameter | Type | Description
--------- | ---- | -----------
vectorA | Vector | First Vector to add
vectorB | Vector | Second Vector to add

### Examples

```js
const resultVector = GLMath.Vector.add( [3, 5 , 1], [2, 1, -2] ); // [5, 6, -1]
```

## subtract
Return the difference vector: Vector

Parameter | Type | Description
--------- | ---- | -----------
vectorA | Vector | Minuend Vector
vectorB | Vector | Subtrahend Vector

### Examples

```js
const resultVector = GLMath.Vector.subtract( [5, 6], [2, 1] ); // [3, 5]
```

## multiply
Return the component-wise multiplication of the two vectors: Vector

Parameter | Type | Description
--------- | ---- | -----------
vectorA | Vector | First Vector to multiply
vectorB | Vector | Second Vector to multiply

### Examples

```js
const resultVector = GLMath.Vector.multiply( [2, 3], [4, 5] ); // [8, 15]
```

## dot
Return the dot product of the two vectors: Number

Parameter | Type | Description
--------- | ---- | -----------
vectorA | Vector | Left operand
vectorB | Vector | Right operand

### Examples

```js
const resultVector = GLMath.Vector.dot( [-6, 8], [5, 12] ); // 66
```

## cross
Return the cross product of the two vectors: Vector (3D)

Parameter | Type | Description
--------- | ---- | -----------
vectorA | Vector (3D) | Left operand
vectorB | Vector (3D)| Right operand

### Examples

```js
const resultVector = GLMath.Vector.cross( [2, 3, 4], [5, 6, 7] ); // [-3, 6, -3]
```