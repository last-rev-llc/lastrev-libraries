const yaml = require('js-yaml');
const fs = require('fs');
const yamlToJson = async (filePath) => {
    try {
      const doc = yaml.load(fs.readFileSync(filePath, 'utf8'));
      return doc;
    } catch (e) {
      console.log(e);
    }
};

module.exports = {
    yamlToJson
}