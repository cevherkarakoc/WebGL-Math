const GLMath = require('../index');

describe('Camera Functions', () => {
  test('Perspective Camera ', () => {
    const result = GLMath.Camera.perspective(Math.PI / 6.0, 1.66, 3, 10);

    const expected = new Float32Array([
      2.248223304748535, 0, 0, 0,
      0, 3.732050895690918, 0, 0,
      0, 0, -1.8571428060531616, -1,
      0, 0, -8.571428298950195, 0,
    ]);

    for (let i = 0; i < 16; i++) expect(result[i]).toBeCloseTo(expected[i]);
  });

  test('Orthogonal Camera ', () => {
    const result = GLMath.Camera.ortho(-100, 100, -200, 200, 5, 100);

    const expected = new Float32Array([
      -0.01, 0, 0, 0,
      0, 0.005, 0, 0,
      0, 0, -0.021052632480859756, 0,
      0, 0, -1.105263113975525, 1,
    ]);

    for (let i = 0; i < 16; i++) expect(result[i]).toBeCloseTo(expected[i]);
  });

  test('LookAt matrix to equal expected', () => {
    const result = GLMath.Camera.lookAt(
      new Float32Array([0, 0, 15]),
      new Float32Array([0, 0, -3]),
      new Float32Array([0, 1, 0])
    );

    const expected = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -15, 1]);

    expect(result).toEqual(expected);
  });
});
