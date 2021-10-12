import { each, mapValues } from 'lodash';
import getFieldTypeString from './getFieldTypeString';
import { ContentTypeMap, FragmentData, FragmentDataMapping } from './types';

const getStaticFragmentData = (staticTypes: ContentTypeMap): FragmentDataMapping => {
  return mapValues(staticTypes, (contentType, contentTypeId) => {
    const out: FragmentData = {
      static: true,
      root: false,
      contentType: contentTypeId,
      simpleValueFields: new Set<string>(),
      richTextFields: new Set<string>(),
      locationFields: new Set<string>(),
      assetFields: new Set<string>(),
      referenceFields: {}
    };

    each(contentType.fields, (field) => {
      const fieldType = getFieldTypeString(field);
      switch (fieldType) {
        case 'Link_Entry':
        case 'Array_Link_Entry':
          // do nothing
          break;
        case 'RichText':
        case 'Array_RichText':
          out.richTextFields.add(field.id);
          break;
        case 'Link_Asset':
        case 'Array_Link_Asset':
          out.assetFields.add(field.id);
          break;
        case 'Location':
          out.locationFields.add(field.id);
          break;
        default:
          out.simpleValueFields.add(field.id);
          break;
      }
    });

    return out;
  });
};

export default getStaticFragmentData;
