import { keys, pickBy, some } from 'lodash';
import getFieldTypeString from './getFieldTypeString';
import { ContentTypeMap } from './types';

const extractNonReferenceFields = (contentTypeMap: ContentTypeMap): string[] => {
  return keys(
    pickBy(contentTypeMap, (contentType) => {
      const { fields } = contentType;
      const hasRefFields = some(fields, (field) => {
        const fieldType = getFieldTypeString(field);
        return fieldType === 'Link_Entry' || fieldType === 'Array_Link_Entry';
      });
      return !hasRefFields;
    })
  );
};

export default extractNonReferenceFields;
