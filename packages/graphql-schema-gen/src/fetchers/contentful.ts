import { createClient, CreateClientParams, Field, FieldItem } from 'contentful';
import { upperFirst } from 'lodash';
import { Fetcher } from '../types';

const getFieldType = (typeData: Field | FieldItem): string => {
  switch (typeData.type) {
    case 'Symbol':
    case 'Text':
      return 'String';
    case 'Integer':
      return 'Int';
    case 'Number':
      return 'Float';
    case 'Date':
      return 'Date';
    case 'Location':
      return 'Location';
    case 'Object':
      return 'JSON';
    case 'Boolean':
      return 'Boolean';
    case 'RichText':
      return 'RichText';
    case 'Link':
      if (typeData.linkType === 'Asset') {
        return 'Media';
      }
      return 'Content';
    case 'Array':
      return `[${getFieldType(typeData.items as FieldItem)}]`;
  }
};

const contentfulFetcher: Fetcher = async (clientParams: CreateClientParams) => {
  const client = createClient(clientParams);

  const contentTypes = await client.getContentTypes();

  return `
${contentTypes.items.map(
  (contentType) => `
type ${upperFirst(contentType.sys.id)} implements Content {
  ${contentType.fields.map(
    (field) => `
  ${field.id}: ${getFieldType(field)}
  `
  )}
}
`
)}
`;
};

export default contentfulFetcher;
