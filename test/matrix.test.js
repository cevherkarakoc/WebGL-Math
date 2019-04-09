const GLMath = require("../index");

describe("Matrix Functions", () => {
  test('Identy Matrix', () => {
    const expected =
      [1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1]

    const result = GLMath.Matrix.idendity(4);

    expect(result).toEqual(expected);
  });

  describe('Unary Operations', () => {
    const matrixA =
      [2.5, 3.7, 5.0,
        -3.2, 1.5, -11.8,
        6.3, -1.2, 3.5
      ];

    const safe_matrixA =
      [2.5, 3.7, 5.0,
        -3.2, 1.5, -11.8,
        6.3, -1.2, 3.5
      ];

    test('Out Matrix', () => {
      const result = GLMath.Matrix.out(matrixA);

      const expected =
        new Float32Array([2.5, 3.7, 5.0,
          -3.2, 1.5, -11.8,
          6.3, -1.2, 3.5
        ]);

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
    });

    test('Determinant of A to equal -283.943', () => {
      const result = GLMath.Matrix.determinant(matrixA);

      expect(result).toBeCloseTo(-283.943);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
    });

    test('Transpose of A', () => {
      const result = GLMath.Matrix.transpose(matrixA);

      const expected =
        [2.5, -3.2, 6.3,
          3.7, 1.5, -1.2,
          5.0, -11.8, 3.5];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
    });

    test('Negative A to equal -A', () => {
      const result = GLMath.Matrix.negative(matrixA);

      const expected =
        [-2.5, -3.7, -5.0,
          3.2, -1.5, 11.8,
        -6.3, 1.2, -3.5
        ];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
    });

  });

  describe('Binary Operations', () => {
    const matrixA =
      [2, -5, 3,
        1, 4, -7,
        6, -2, 3
      ];

    const matrixB =
      [-4, -1, 0,
        4, 9, 1,
      -5, -1, -7
      ];

    const V = [0.5, -1, 2];
    const S = 4;

    const safe_matrixA =
      [2, -5, 3,
        1, 4, -7,
        6, -2, 3
      ];

    const safe_matrixB =
      [-4, -1, 0,
        4, 9, 1,
      -5, -1, -7
      ];

    const safe_V = [0.5, -1, 2];

    test('A * S to equal expected', () => {
      const result = GLMath.Matrix.multiplyScalar(matrixA, S);

      const expected =
        [8, -20, 12,
          4, 16, -28,
          24, -8, 12
        ];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
    });

    test('A * V to equal  (12, -10.5, 14.5)', () => {
      const result = GLMath.Matrix.multiplyVector(matrixA, V);

      const expected = [12, -10.5, 14.5];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(V).toEqual(safe_V);
      expect(matrixA).toEqual(safe_matrixA);
    });

    test('A + B to equal expected', () => {
      const result = GLMath.Matrix.add(matrixA, matrixB);

      const expected =
        [-2, -6, 3,
          5, 13, -6,
          1, -3, -4
        ];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
      expect(matrixB).toEqual(safe_matrixB);
    });

    test('A - B to equal expected', () => {
      const result = GLMath.Matrix.subtract(matrixA, matrixB);

      const expected =
        [6, -4, 3,
          -3, -5, -8,
          11, -1, 10
        ];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
      expect(matrixB).toEqual(safe_matrixB);
    });

    test('A * B (component-wise) to equal expected', () => {
      const result = GLMath.Matrix.multiplyCompWise(matrixA, matrixB);

      const expected =
        [-8, 5, 0,
          4, 36, -7,
        -30, 2, -21
        ];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
      expect(matrixB).toEqual(safe_matrixB);
    });

    test('A * B to equal expected', () => {
      const result = GLMath.Matrix.multiply(matrixA, matrixB);

      const expected =
        [-9, 16, -5,
          23, 14, -48,
        -53, 35, -29
        ];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
      expect(matrixB).toEqual(safe_matrixB);
    });
  });

  describe('Transform Operations', () => {
    const matrixA = GLMath.Matrix.idendity(4);

    const V = [1.5, 3.0, 0.75];

    const safe_matrixA = GLMath.Matrix.idendity(4);
    const safe_V = [1.5, 3.0, 0.75];

    test('Scale A by V to equal expected', () => {
      const result = GLMath.Matrix.Transform.scale(matrixA, V);

      const expected =
        [1.5, 0, 0, 0,
          0, 3.0, 0, 0,
          0, 0, 0.75, 0,
          0, 0, 0, 1.0
        ];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
      expect(V).toEqual(safe_V);
    });

    test('Translate A by V to equal expected', () => {
      const result = GLMath.Matrix.Transform.translate(matrixA, V);

      const expected =
        [1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          1.5, 3.0, 0.75, 1
        ];

      expect(result).toEqual(expected);
      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
      expect(V).toEqual(safe_V);
    });

    test('Rotate A by V to equal expected', () => {
      const result = GLMath.Matrix.Transform.rotate(matrixA, Math.PI / 4, [1, 1, 0]);

      const expected =
        [0.8535534143447876, 0.1464466154575348, -0.5, 0,
          0.1464466154575348, 0.8535534143447876, 0.5, 0,
          0.5, -0.5, 0.7071067690849304, 0,
          0, 0, 0, 1
        ];

      for (let i = 0; i < 16; i++)
        expect(result[i]).toBeCloseTo(expected[i]);

      // Check Side Effects
      expect(matrixA).toEqual(safe_matrixA);
    });

  });

  describe('Camera Functions', () => {
    test('Perspective Camera ', () => {
      const result = GLMath.Matrix.Camera.perspective(Math.PI / 6.0, 1.66, 3, 10);

      const expected =
        [2.248223304748535, 0, 0, 0,
          0, 3.732050895690918, 0, 0,
          0, 0, -1.8571428060531616, -1,
          0, 0, -8.571428298950195, 0
        ];

      for (let i = 0; i < 16; i++)
        expect(result[i]).toBeCloseTo(expected[i]);
    });

    test('Orthogonal Camera ', () => {
      const result = GLMath.Matrix.Camera.ortho(-100, 100, -200, 200, 5, 100);

      const expected =
        [-0.01, 0, 0, 0,
          0, 0.005, 0, 0,
          0, 0, -0.021052632480859756, 0,
          0, 0, -1.105263113975525, 1
        ];

      for (let i = 0; i < 16; i++)
        expect(result[i]).toBeCloseTo(expected[i]);
    });

    test('LookAt matrix to equal expected', () => {
      const result = GLMath.Matrix.Camera.lookAt([0, 0, 15], [0, 0, -3], [0, 1, 0]);

      const expected =
        [1, 0, 0, 0,
          0, 1, 0, 0,
          0, 0, 1, 0,
          0, 0, -15, 1
        ];

      expect(result).toEqual(expected);
    });
  });
});