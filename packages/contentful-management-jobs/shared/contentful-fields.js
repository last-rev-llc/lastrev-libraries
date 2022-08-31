const MurmurHash3 = require('imurmurhash');
const TurndownService = require('turndown');
const { richTextFromMarkdown } = require('@contentful/rich-text-from-markdown');

const turndownService = new TurndownService({
  headingStyle: 'atx',
});

const getSpaceFieldTypeLookup = async (contentfulEnvironment) => {
  const contentTypes = await contentfulEnvironment.getContentTypes();
  // Loop through the values in contentful and return a new array with only the data we need
  // Could these be combined into one loop?
  return contentTypeLookup = contentTypes.items.map(contentType => { 
    return {
      id: contentType.sys.id,
      fields: contentType.fields.map(field => {
        return {
          id: field.id,
          type: field.type
        }
      })
    }
  }).reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  } ,{});
};

const getContentfulFieldValue = async (value, fieldType, JOB, yamlObj) => {
  // console.log('fieldType: ', fieldType);
  switch (fieldType.type) {
    case 'Array':
      if(value.length > 0 && typeof value[0] !== 'object') {
        return value;
      } else {
        return value.split(',');
      }
    case 'Object':
      return value;
    case 'Link':
      return value;
    case 'Symbol':
      return value;
    case 'Integer':
      return parseInt(value);
    case 'Number':
      return parseFloat(value);
    case 'Boolean':
      return value === 'true';
    case 'Date':
      return value;
    case 'Text':
      return value;
    case 'RichText':
      // You need to convert to markdown before using the Rich Text Parser
      const markdownText = turndownService.turndown(value);
      // console.log('markdownText: ', markdownText);
      const richtext = await richTextFromMarkdown(markdownText);
      // console.log('richtext: ', richtext);
      return richtext;
    case 'Location':
      return value;
    case 'Asset':
      return {
        sys: {
          type: 'Link',
          linkType: 'Asset',
          id: value,
        },
      };
    case 'Entry': 
      return {
        sys: {
          type: 'Link',
          linkType: 'Entry',
          id: value,
        },
      };
    case 'CustomParser':
      const parsedValue = await fieldType.customParser(value, JOB, yamlObj);
      return parsedValue;
    default:
      return value;
  }
}


module.exports = {
  getSpaceFieldTypeLookup,
  getContentfulFieldValue,
  getContentfulIdFromString: string => MurmurHash3(string).result().toString()
};
