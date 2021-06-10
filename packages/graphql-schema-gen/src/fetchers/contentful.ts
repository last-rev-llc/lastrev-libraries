import { ContentType, createClient, CreateClientParams, Field, FieldItem } from 'contentful';
import { some, upperFirst } from 'lodash';
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

const reservedForContent: Record<string, string> = {
  sidekickLookup: 'JSON',
  id: 'String',
  theme: 'Theme',
  animation: 'JSON'
};

const reservedForPages: Record<string, string> = {
  sidekickLookup: 'JSON',
  id: 'String',
  theme: 'Theme',
  animation: 'JSON',
  slug: 'String',
  pathParams: 'PathParams',
  contents: '[Content]'
};

const isPage = (type: ContentType) => {
  return some(type.fields, (f) => f.id === 'slug');
};

const getTypeDefs = (types: ContentType[], reserved: Record<string, string>, implementedType: string) => `
${types.map(
  (contentType) => `
type ${upperFirst(contentType.sys.id)} implements ${implementedType} {
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

const contentfulFetcher: Fetcher = async (clientParams: CreateClientParams) => {
  const client = createClient(clientParams);

  const contentTypes = await client.getContentTypes();

  // split out pages from other content types
  const [pages, content] = contentTypes.items.reduce(([p, c], e) => (isPage(e) ? [[...p, e], c] : [p, [...c, e]]), [
    [],
    []
  ] as ContentType[][]);

  const pageTypeDefs = getTypeDefs(pages, reservedForPages, 'Page');
  const contentTypeDefs = getTypeDefs(content, reservedForContent, 'Content');

  return `
  ${contentTypeDefs}
  ${pageTypeDefs}
  `;
};

export default contentfulFetcher;
