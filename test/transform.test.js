const GLMath = require('../index');

describe('Transform Functions', () => {
  const matrixA = GLMath.Matrix.idendity(4);

  const V = new Float32Array([1.5, 3.0, 0.75]);

  const safe_matrixA = GLMath.Matrix.idendity(4);
  const safe_V = new Float32Array([1.5, 3.0, 0.75]);

  test('Scale A by V to equal expected', () => {
    const result = GLMath.Transform.scale(matrixA, V);

    const expected = new Float32Array([1.5, 0, 0, 0, 0, 3.0, 0, 0, 0, 0, 0.75, 0, 0, 0, 0, 1.0]);

    expect(result).toEqual(expected);
    // Check Side Effects
    expect(matrixA).toEqual(safe_matrixA);
    expect(V).toEqual(safe_V);
  });

  test('Translate A by V to equal expected', () => {
    const result = GLMath.Transform.translate(matrixA, V);

    const expected = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1.5, 3.0, 0.75, 1]);

    expect(result).toEqual(expected);
    // Check Side Effects
    expect(matrixA).toEqual(safe_matrixA);
    expect(V).toEqual(safe_V);
  });

  test('Rotate A by V to equal expected', () => {
    const result = GLMath.Transform.rotate(matrixA, Math.PI / 4, new Float32Array([1, 1, 0]));

    const expected = new Float32Array([
      0.8535534143447876,
      0.1464466154575348,
      -0.5,
      0,
      0.1464466154575348,
      0.8535534143447876,
      0.5,
      0,
      0.5,
      -0.5,
      0.7071067690849304,
      0,
      0,
      0,
      0,
      1,
    ]);

    for (let i = 0; i < 16; i++) expect(result[i]).toBeCloseTo(expected[i]);

    expect(matrixA).toEqual(safe_matrixA);
  });
});
