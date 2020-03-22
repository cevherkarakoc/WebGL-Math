import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { terser } from "rollup-plugin-terser";

const plugins = [commonjs(), json()];

export default [
  {
    input: 'index.js',
    output: {
      name: 'GLMath',
      file: 'dist/webgl-math.js',
      exports: "named",
      format: 'umd',
    },
    plugins
  },
  {
    input: 'index.js',
    output: {
      name: 'GLMath',
      file: 'dist/webgl-math.min.js',
      exports: "named",
      format: 'umd',
      sourcemap: true,
      compact: true
    },
    plugins : [...plugins, terser()]
  }

];