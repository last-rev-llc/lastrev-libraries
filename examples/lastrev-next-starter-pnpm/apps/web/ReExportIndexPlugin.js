const { promises: fs } = require('fs');
const path = require('path');

function loadFiles() {
  const dirPath = __dirname;
  const files = fs.readdirSync(dirPath);
  const modules = [];
  for (const file of files) {
    if (/\.theme\.ts$/.test(file)) {
      const modulePath = path.join(dirPath, file);
      try {
        console.log('Loading theme:', modulePath);

        modules.push(file);
      } catch (error) {
        console.error(`Failed to load module: ${modulePath}`, error);
      }
    }
  }

  return modules;
}

class ReExportIndexPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('ReExportIndexPlugin', async (compilation, callback) => {
      let modulesList = loadFiles();

      // compilation.modules.forEach((module) => {
      //   if (module.resource) {
      //     modulesList.push(module.resource);
      //   }
      // });

      let indexContent = modulesList
        .map((filePath) => {
          let relativePath = path.relative(compiler.options.context, filePath);
          let moduleName = path.basename(relativePath, path.extname(relativePath));
          const componentName = moduleName.replace(/\.theme$/, '');
          return `export ${componentName} from '@ui/${componentName}/${componentName}.theme';`;
        })
        .join('\n');

      fs.writeFileSync(path.resolve('../../packages/ui/src/allTheme.ts'), indexContent);

      // // Adding index.js to the assets (Webpack will write this to the output directory)
      // compilation.assets['index.js'] = {
      //   source: function () {
      //     return indexContent;
      //   },
      //   size: function () {
      //     return indexContent.length;
      //   }
      // };

      callback();
    });
  }
}

module.exports = ReExportIndexPlugin;
