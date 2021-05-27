const { omit } = require(`lodash/fp`);
const path = require('path');

const replace = require(`@rollup/plugin-replace`);
const typescript = require(`rollup-plugin-typescript2`);
const { babel } = require(`@rollup/plugin-babel`);
const json = require(`@rollup/plugin-json`);
const commonjs = require(`@rollup/plugin-commonjs`);
const nodeResolve = require(`@rollup/plugin-node-resolve`);
const alias = require(`@rollup/plugin-alias`);
const postcss = require(`rollup-plugin-postcss`);
const autoprefixer = require(`autoprefixer`);
const progress = require(`rollup-plugin-progress`);
const { terser } = require(`rollup-plugin-terser`);
const sourcemap = require(`rollup-plugin-sourcemaps`);
// const multi = require(`@rollup/plugin-multi-entry`);
const clean = require(`./plugins/clean`);
// const size = require(`./plugins/size`);
const copy = require(`./plugins/copy`);

const env = process.env.NODE_ENV;
const isProduction = env === `production`;

const EXTENSIONS = [`.ts`, `.tsx`, `.js`, `.jsx`, `.es6`, `.es`, `.mjs`];
const omitOpts = omit([
  `alias`, //
  `external`,
  `output`,
  `slugins`,
  `babelHelpers`,
  `filename`
]);

const defaultExternal = (id) => {
  if (id.includes('@babel/runtime')) return true;
  return (
    !id.startsWith(`\0`) &&
    !id.startsWith(`~`) &&
    !id.startsWith(`.`) &&
    !id.startsWith(process.platform === `win32` ? process.cwd() : `/`)
  );
};

const createOutput = (dir = `dist`, defaultOpts) => {
  const opts = omitOpts(defaultOpts);
  const {
    alias: moduleAlias, //
    external,
    output,
    plugins = [],
    filename,
    babelHelpers
  } = defaultOpts;

  const tsconfigOverride = {
    compilerOptions: {
      sourceMap: !isProduction,
      mapRoot: !isProduction ? dir : undefined
    }
  };

  const defaultPlugins = [
    isProduction && clean(dir),
    // multi(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(isProduction ? `production` : `development`)
    }),
    postcss({
      modules: true,
      plugins: [autoprefixer()],
      inject: true,
      sourceMap: true, // defult false
      extract: path.resolve('dist/styles.css')
    }),
    Object.keys(moduleAlias || {}).length > 0 &&
      alias({
        ...moduleAlias,
        resolve: EXTENSIONS
      }),
    nodeResolve({
      mainFields: [`module`, `main`],
      extensions: EXTENSIONS,
      browser: true
    }),
    commonjs({
      include: /\/node_modules\//,
      namedExports: {
        '../../../../node_modules/graphql-request/dist/types.dom': ['HeadersInit']
      }
    }),
    json(),
    typescript({
      typescript: require(`typescript`),
      tsconfigOverride,
      objectHashIgnoreUnknownHack: true,
      rollupCommonJSResolveHack: true
    }),
    babel({
      babelHelpers: babelHelpers || `bundled`,
      extensions: EXTENSIONS,
      presets: [['@babel/env', { modules: false }], '@babel/preset-react'],
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
        babelHelpers === 'runtime' ? '@babel/plugin-transform-runtime' : null
      ],
      exclude: /node_modules/
    }),
    sourcemap(),
    isProduction && terser(),
    // size(dir),
    progress({
      clearLine: false
    })
  ];

  const outputs = [
    {
      dir,
      format: `cjs`,
      sourcemap: isProduction ? `` : true,
      chunkFileNames: filename ? `${filename}.js` : `[name].js`,
      entryFileNames: filename ? `${filename}.js` : `[name].js`,
      ...output
    },
    {
      dir,
      format: `esm`,
      sourcemap: isProduction ? `` : true,
      chunkFileNames: filename ? `${filename}.esm.js` : `[name].esm.js`,
      entryFileNames: filename ? `${filename}.esm.js` : `[name].esm.js`,
      ...output
    }
  ];

  return {
    ...opts,
    external: external || defaultExternal,
    plugins: defaultPlugins.filter(Boolean).concat(plugins),
    output: outputs
  };
};

exports.copy = copy;
exports.config = (opts) => {
  const inputs = Array.isArray(opts) ? opts : [opts];
  return inputs.map(({ dest: dir, ...o }) => {
    return createOutput(dir, o);
  });
};
