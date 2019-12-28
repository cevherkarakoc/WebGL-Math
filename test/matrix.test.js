const GLMath = require('../index');

describe('Matrix Functions', () => {
  test('Identy Matrix', () => {
    const expected = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);

    const result = GLMath.Matrix.idendity(4);

    expect(result).toEqual(expected);
  });

  describe('Unary Operations', () => {
    const matrixA = new Float32Array([2.5, 3.7, 5.0, -3.2, 1.5, -11.8, 6.3, -1.2, 3.5]);

    const safe_matrixA = new Float32Array([2.5, 3.7, 5.0, -3.2, 1.5, -11.8, 6.3, -1.2, 3.5]);

    test('Determinant of A to equal -283.943', () => {
      const result = GLMath.Matrix.determinant(matrixA);

      expect(result).toBeCloseTo(-283.943);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
    });

    test('Transpose of A', () => {
      const result = GLMath.Matrix.transpose(matrixA);

      const expected = new Float32Array([2.5, -3.2, 6.3, 3.7, 1.5, -1.2, 5.0, -11.8, 3.5]);

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
    });

    test('Negative A to equal -A', () => {
      const result = GLMath.Matrix.negative(matrixA);

      const expected = new Float32Array([-2.5, -3.7, -5.0, 3.2, -1.5, 11.8, -6.3, 1.2, -3.5]);

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
    });
  });

  describe('Binary Operations', () => {
    const matrixA = new Float32Array([2, -5, 3, 1, 4, -7, 6, -2, 3]);

    const matrixB = new Float32Array([-4, -1, 0, 4, 9, 1, -5, -1, -7]);

    const V = new Float32Array([0.5, -1, 2]);
    const S = 4;

    const safe_matrixA = new Float32Array([2, -5, 3, 1, 4, -7, 6, -2, 3]);

    const safe_matrixB = new Float32Array([-4, -1, 0, 4, 9, 1, -5, -1, -7]);

    const safe_V = new Float32Array([0.5, -1, 2]);

    test('A * S to equal expected', () => {
      const result = GLMath.Matrix.multiplyScalar(matrixA, S);

      const expected = new Float32Array([8, -20, 12, 4, 16, -28, 24, -8, 12]);

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
    });

    test('A * V to equal  (12, -10.5, 14.5)', () => {
      const result = GLMath.Matrix.multiplyVector(matrixA, V);

      const expected = new Float32Array([12, -10.5, 14.5]);

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(V).toEqual(safe_V);
      expect(matrixA).toEqual(safe_matrixA);
    });

    test('A + B to equal expected', () => {
      const result = GLMath.Matrix.add(matrixA, matrixB);

      const expected = new Float32Array([-2, -6, 3, 5, 13, -6, 1, -3, -4]);

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
      expect(matrixB).toEqual(safe_matrixB);
    });

    test('A - B to equal expected', () => {
      const result = GLMath.Matrix.subtract(matrixA, matrixB);

      const expected = new Float32Array([6, -4, 3, -3, -5, -8, 11, -1, 10]);

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
      expect(matrixB).toEqual(safe_matrixB);
    });

    test('A * B (component-wise) to equal expected', () => {
      const result = GLMath.Matrix.multiplyCompWise(matrixA, matrixB);

      const expected = new Float32Array([-8, 5, 0, 4, 36, -7, -30, 2, -21]);

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
      expect(matrixB).toEqual(safe_matrixB);
    });

    test('A * B to equal expected', () => {
      const result = GLMath.Matrix.multiply(matrixA, matrixB);

      const expected = new Float32Array([-9, 16, -5, 23, 14, -48, -53, 35, -29]);

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
      expect(matrixB).toEqual(safe_matrixB);
    });
  });
});
