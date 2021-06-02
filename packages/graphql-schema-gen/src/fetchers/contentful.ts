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

const reserved: Record<string, string> = {
  sidekickLookup: 'JSON',
  id: 'String',
  theme: 'Theme',
  animation: 'JSON'
};

const contentfulFetcher: Fetcher = async (clientParams: CreateClientParams) => {
  const client = createClient(clientParams);

  const contentTypes = await client.getContentTypes();

  const warnings: string[][] = [];

  contentTypes.items.forEach((t) => {
    const warnFields = t.fields.filter((f) => Object.keys(reserved).indexOf(f.id) > -1);
    if (warnFields.length) {
      warnings.push(...warnFields.map((w) => [t.sys.id, w.id]));
    }
  });

  warnings.forEach((w) =>
    console.log(
      `Content Type ${w[0]} is using a reserved field id ${w[1]}. Please make sure that a mapper is written for this field.}`
    )
  );

  return `
${contentTypes.items.map(
  (contentType) => `
type ${upperFirst(contentType.sys.id)} implements Content {
  ${Object.keys(reserved).map(
    (k) => `
  ${k}: ${reserved[k]}
  `
  )}
  ${contentType.fields
    .filter((t) => Object.keys(reserved).indexOf(t.id) === -1)
    .map(
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
