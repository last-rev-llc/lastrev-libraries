import { upperFirst, has, get, find, map, filter } from 'lodash';
import { Mapper, TypeName } from '../types';

const extractLinkContentTypes = (typeData: any, activeContentTypes: string[]) => {
  const validations = typeData.validations || [];

  const linkContentTypeValidation =
    find(validations, (validation) => {
      return has(validation, 'linkContentType');
    }) || {};

  const allowedTypes: string[] = filter(
    get(linkContentTypeValidation, 'linkContentType', []),
    (linkContentType: string) => {
      return activeContentTypes.indexOf(linkContentType) > -1;
    }
  );

  return allowedTypes;
};

const contentfulMapper: Mapper = (cmsType, typeData, activeContentTypes) => {
  let isArray = false;
  let types: TypeName[] = [];
  switch (cmsType) {
    case 'Symbol':
    case 'Text':
      types.push('String');
      break;
    case 'Integer':
    case 'Number':
      types.push('Number');
      break;
    case 'Date':
      types.push('Date');
      break;
    // not sure how to map a location. just mapping as JSON for now
    case 'Location':
    case 'Object':
      types.push('JSON');
      break;
    case 'Boolean':
      types.push('Boolean');
      break;
    case 'RichText':
      types.push('RichText');
      break;
    case 'Link':
      if (typeData.linkType === 'Asset') {
        types.push('Media');
        break;
      }

      const allowedTypes = extractLinkContentTypes(typeData, activeContentTypes);

      if (!allowedTypes.length) {
        // if no content type validations, default to JSON, since type is unknown
        types.push('JSON');
        break;
      }

      types.push(...(map(allowedTypes, upperFirst) as TypeName[]));
      break;
    case 'Array':
      types.push(...contentfulMapper(typeData.items.type, typeData.items, activeContentTypes).types);
      isArray = true;
      break;
    default:
      throw Error(`Unsupported type: ${cmsType}`);
  }
  return {
    fieldName: upperFirst(typeData.id),
    types,
    isArray
  };
};

export default contentfulMapper;
