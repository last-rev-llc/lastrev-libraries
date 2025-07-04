const { omit } = require(`lodash/fp`);
const path = require('path');

const replace = require(`@rollup/plugin-replace`);
const jsonlint = require('rollup-plugin-jsonlint');
const commonjs = require(`@rollup/plugin-commonjs`);
const { nodeResolve } = require(`@rollup/plugin-node-resolve`);
const alias = require(`@rollup/plugin-alias`);
const postcss = require(`rollup-plugin-postcss`);
const autoprefixer = require(`autoprefixer`);
const progress = require(`rollup-plugin-progress`);
const terser = require(`@rollup/plugin-terser`);
const sourcemap = require(`rollup-plugin-sourcemaps`);
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const { swc, defineRollupSwcOption } = require('rollup-plugin-swc3');
const PluginTransformImport = require('swc-plugin-transform-import').default;
const generateDeclarations = require('rollup-plugin-generate-declarations');

const env = process.env.NODE_ENV;
const isProduction = env === `production`;

const EXTENSIONS = [`.ts`, `.tsx`, `.js`, `.jsx`, `.es6`, `.es`, `.mjs`];
const omitOpts = omit([
  `alias`, //
  `external`,
  `output`,
  `slugins`,
  `babelHelpers`,
  `filename`,
  'disableTerser',
  'enableSourcemap',
  'preserveModules',
  'preserveModulesRoot'
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
    filename
  } = defaultOpts;

  const defaultPlugins = [
    isProduction &&
      peerDepsExternal({
        includeDependencies: true
      }),
    replace({
      'preventAssignment': true,
      'process.env.NODE_ENV': JSON.stringify(isProduction ? `production` : `development`)
    }),
    postcss({
      modules: {
        globalModulePaths: [/src\/styles/],
        exportGlobals: true
      },
      plugins: [autoprefixer()],
      inject: true,
      sourceMap: !isProduction || defaultOpts.enableSourcemap, // defult false
      extract: path.resolve('dist/styles.css'),
      extensions: ['.css']
    }),
    Object.keys(moduleAlias || {}).length > 0 &&
      alias({
        entries: Object.entries(moduleAlias).map(([find, replacement]) => ({ find, replacement })),
        resolve: EXTENSIONS
      }),
    nodeResolve({
      mainFields: [`module`, `main`],
      extensions: EXTENSIONS,
      browser: true
    }),
    commonjs({
      include: /\/node_modules\//,
      transformMixedEsModules: true,
      defaultIsModuleExports: 'auto',
      esmExternals: true
    }),
    jsonlint({ mode: 'json5' }),
    swc(
      defineRollupSwcOption({
        sourceMaps: !isProduction || defaultOpts.enableSourcemap,
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
            decorators: true,
            dynamicImport: true
          },
          externalHelpers: false,
          target: 'es2016'
        },
        plugin: (m) =>
          new PluginTransformImport({
            'lodash': {
              // eslint-disable-next-line no-template-curly-in-string
              transform: 'lodash/${member}',
              preventFullImport: true
            },
            '@mui/material': {
              // eslint-disable-next-line no-template-curly-in-string
              transform: '@mui/material/${member}',
              preventFullImport: true
            },
            '@mui/icons-material': {
              // eslint-disable-next-line no-template-curly-in-string
              transform: '@mui/icons-material/${member}',
              preventFullImport: true
            }
          }).visitProgram(m)
      })
    ),
    (!isProduction || defaultOpts.enableSourcemap) && sourcemap(),
    isProduction &&
      !defaultOpts.disableTerser &&
      terser({
        compress: {
          drop_console: false,
          drop_debugger: false,
          pure_funcs: [],
          passes: 1
        },
        mangle: {
          keep_fnames: true,
          keep_classnames: true
        },
        format: {
          comments: true,
          beautify: false
        }
      }),
    // size(dir),
    progress({
      clearLine: false
    }),
    generateDeclarations()
  ];

  const outputs = [
    {
      dir,
      format: `cjs`,
      sourcemap: !isProduction || defaultOpts.enableSourcemap ? true : '',
      chunkFileNames: filename ? `${filename}.js` : `[name].js`,
      entryFileNames: filename ? `${filename}.js` : `[name].js`,
      exports: 'auto',
      interop: 'auto',
      preserveModules: true,
      preserveModulesRoot: 'src',
      ...output
    },
    {
      dir,
      format: `esm`,
      sourcemap: !isProduction || defaultOpts.enableSourcemap ? true : '',
      chunkFileNames: filename ? `${filename}.esm.js` : `[name].esm.js`,
      entryFileNames: filename ? `${filename}.esm.js` : `[name].esm.js`,
      exports: 'auto',
      preserveModules: true,
      preserveModulesRoot: 'src',
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

exports.config = (opts) => {
  const inputs = Array.isArray(opts) ? opts : [opts];
  return inputs.map(({ dest: dir, ...o }) => {
    return createOutput(dir, o);
  });
};
