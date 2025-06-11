import { Field } from '@last-rev/types';

const getFieldTypeString = (field: Field): string => {
  let segments = [];
  segments.push(field.type);
  if (field.type === 'Array') {
    segments.push(field.items?.type);
    if (field.items?.type === 'Link') {
      segments.push(field.items?.linkType);
    }
  } else if (field.type === 'Link') {
    segments.push(field.linkType);
  }
  return segments.join('_');
};

export default getFieldTypeString;
