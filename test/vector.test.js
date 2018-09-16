const GLMath = require("../index");

describe("Vector Functions", () => {
  describe("Unary Operations, A(-0.45, 0.24, 2.71) and S = 7.6", () => {
    const vectorA = [-0.45, 0.24, 2.71];
    const safe_vectorA = [-0.45, 0.24, 2.71];

    const S = 7.6;

    test('Negative A to equal (0.45, -0.24, -2.71)', () => {
      const result = GLMath.Vector.negative(vectorA);

      expect(result[0]).toBeCloseTo(0.45);
      expect(result[1]).toBeCloseTo(-0.24);
      expect(result[2]).toBeCloseTo(-2.71);
      // Check Side Effects
      expect(vectorA).toEqual(safe_vectorA);
    });

    test('Reverse A to equal (-2.71, -0.24, 0.45)', () => {
      const result = GLMath.Vector.reverse(vectorA);

      expect(result[0]).toBeCloseTo(vectorA[2]);
      expect(result[1]).toBeCloseTo(vectorA[1]);
      expect(result[2]).toBeCloseTo(vectorA[0]);
      // Check Side Effects
      expect(vectorA).toEqual(safe_vectorA);
    });

    test('|A| to equal 2.7575713952679446', () => {
      const result = GLMath.Vector.length(vectorA);

      expect(result).toBeCloseTo(2.7575713952679446);
      // Check Side Effects
      expect(vectorA).toEqual(safe_vectorA);
    });

    test('A * S to equal (-3.42, 1.824, 20.596)', () => {
      const result = GLMath.Vector.scale(vectorA, S);

      expect(result[0]).toBeCloseTo(-3.42);
      expect(result[1]).toBeCloseTo(1.824);
      expect(result[2]).toBeCloseTo(20.596);
      // Check Side Effects
      expect(vectorA).toEqual(safe_vectorA);
    });

    test('Normalize A to equal (-3.42, 1.824, 20.596)', () => {
      const result = GLMath.Vector.normalize(vectorA);

      expect(result[0]).toBeCloseTo(-0.16319);
      expect(result[1]).toBeCloseTo(0.08703);
      expect(result[2]).toBeCloseTo(0.98275);
      expect(GLMath.Vector.length(result)).toBeCloseTo(1.0);
      // Check Side Effects
      expect(vectorA).toEqual(safe_vectorA);
    });
  });

  describe("Binary Operations, A(0.1, 0.6, -0.2) and B(0.7, 0.3, 0.4)", () => {
    const vectorA = [0.1, 0.6, -0.2];
    const vectorB = [0.7, 0.3, 0.4];

    const safe_vectorA = [0.1, 0.6, -0.2];
    const safe_vectorB = [0.7, 0.3, 0.4];

    test('A + B to equal (0.8, 0.9, 0.2)', () => {
      const result = GLMath.Vector.add(vectorA, vectorB);

      expect(result[0]).toBeCloseTo(0.8);
      expect(result[1]).toBeCloseTo(0.9);
      expect(result[2]).toBeCloseTo(0.2);
      // Check Side Effects
      expect(vectorA).toEqual(safe_vectorA);
      expect(vectorB).toEqual(safe_vectorB);
    });

    test('A - B to equal (-0.6, 0.3, -0.6)', () => {
      const result = GLMath.Vector.subtract(vectorA, vectorB);

      expect(result[0]).toBeCloseTo(-0.6);
      expect(result[1]).toBeCloseTo(0.3);
      expect(result[2]).toBeCloseTo(-0.6);
      // Check Side Effects
      expect(vectorA).toEqual(safe_vectorA);
      expect(vectorB).toEqual(safe_vectorB);
    });

    test('A * B (component-wise) to equal (0.07, 0.18, -0.08)', () => {
      const result = GLMath.Vector.multiply(vectorA, vectorB);

      expect(result[0]).toBeCloseTo(0.07);
      expect(result[1]).toBeCloseTo(0.18);
      expect(result[2]).toBeCloseTo(-0.08);
      // Check Side Effects
      expect(vectorA).toEqual(safe_vectorA);
      expect(vectorB).toEqual(safe_vectorB);
    });

    test('A dot B to equal 0.14', () => {
      const result = GLMath.Vector.dot(vectorA, vectorB);

      expect(result).toBeCloseTo(0.17);
      // Check Side Effects
      expect(vectorA).toEqual(safe_vectorA);
      expect(vectorB).toEqual(safe_vectorB);
    });
  });
});

