import { ContentType, Field, FieldItem } from '@last-rev/types';
import { has, some, upperFirst } from 'lodash';

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
    default:
      return 'String';
  }
};

const reservedForContent: Record<string, string> = {
  sidekickLookup: 'JSON',
  id: 'String',
  theme: '[Theme]',
  animation: 'JSON',
  variant: 'String'
};

const reservedForPages: Record<string, string> = {
  sidekickLookup: 'JSON',
  id: 'String',
  theme: '[Theme]',
  animation: 'JSON',
  slug: 'String',
  lr__path__: 'String'
};

const isPage = (type: ContentType) => {
  return some(type.fields, (f) => f.id === 'slug');
};

const getTypeDefs = (types: ContentType[], reserved: Record<string, string>, skipReferenceFields: boolean) => `
${types.map(
  (contentType) => `
type ${upperFirst(contentType.sys.id)} implements Content {
  ${Object.keys(reserved).map(
    (k) => `
  ${k}: ${reserved[k]}
  `
  )}
  ${contentType.fields
    .filter((t) => Object.keys(reserved).indexOf(t.id) === -1)
    .filter((field) => {
      if (!skipReferenceFields) {
        return true;
      }
      const fieldType = getFieldType(field);
      return fieldType != 'Content' && fieldType != '[Content]';
    })
    .map(
      (field) => `
  ${field.id}: ${getFieldType(field)}
  `
    )}
}
`
)}
`;

const mapContentTypeIds = (type: ContentType, typeMappings: Record<string, string>): ContentType => {
  let contentTypeId = type.sys.id;
  if (has(typeMappings, contentTypeId)) {
    contentTypeId = typeMappings[contentTypeId];
  }
  return {
    ...type,
    sys: {
      ...type.sys,
      id: contentTypeId
    }
  };
};

export const generateContentfulSchema = (
  typeMappings: Record<string, string>,
  items: ContentType[],
  skipReferenceFields: boolean
) => {
  const contentTypes = items.map((type) => mapContentTypeIds(type, typeMappings));
  // split out pages from other content types
  const [pages, content] = contentTypes.reduce(([p, c], e) => (isPage(e) ? [[...p, e], c] : [p, [...c, e]]), [
    [],
    []
  ] as ContentType[][]);

  const pageTypeDefs = getTypeDefs(pages, reservedForPages, skipReferenceFields);
  const contentTypeDefs = getTypeDefs(content, reservedForContent, skipReferenceFields);

  return `
  ${contentTypeDefs}
  ${pageTypeDefs}
  `;
};
