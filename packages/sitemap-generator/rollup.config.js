import { config } from '@last-rev/rollup-config';
import copy from 'rollup-plugin-copy';

export default config({
  input: './src/index.ts',
  babelHelpers: 'runtime',
  plugins: [
    copy({
      targets: [{ src: 'src/*.hbs', dest: 'dist' }]
    })
  ]
});
