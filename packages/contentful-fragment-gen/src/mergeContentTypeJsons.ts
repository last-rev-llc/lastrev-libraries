import { each, get, has, isNil, map, set } from 'lodash';
import Timer from '@last-rev/timer';
import getFieldTypeString from './getFieldTypeString';
import { ContentTypeMap, MergedJsonRepresentationMap, QueryJson } from './types';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'contentful-fragment-gen',
  module: 'mergeContentTypeJsons'
});

const recurseAndMerge = (
  json: QueryJson,
  path: string,
  jsonMap: MergedJsonRepresentationMap,
  contentTypes: ContentTypeMap
) => {
  const contentType = contentTypes[json._contentTypeId];
  if (!contentType) throw Error(`ContentType ${json._contentTypeId} not found!`);
  const fields = contentType.fields;
  const fieldTypeStrings = map(fields, getFieldTypeString);

  let current = get(jsonMap, path);

  if (!current) {
    current = {};
    set(jsonMap, path, current);
  }

  for (let i = 0; i < fieldTypeStrings.length; i++) {
    const typeString = fieldTypeStrings[i];
    const fieldId = fields[i].id;
    switch (typeString) {
      case 'Link_Entry': {
        if (!has(json, fieldId) || isNil(json[fieldId])) break;
        const jsonFieldData = json[fieldId] as QueryJson;
        recurseAndMerge(jsonFieldData, `${path}.${fieldId}.${jsonFieldData._contentTypeId}`, jsonMap, contentTypes);
        break;
      }
      case 'Array_Link_Entry': {
        if (!has(json, fieldId) || isNil(json[fieldId])) break;
        const jsonFieldDataArray = json[fieldId] as QueryJson[];
        each(jsonFieldDataArray, (jsonFieldData) => {
          // current[fieldId] = current[fieldId] || ({} as MergedJsonRepresentationMap);
          recurseAndMerge(jsonFieldData, `${path}.${fieldId}.${jsonFieldData._contentTypeId}`, jsonMap, contentTypes);
        });
        break;
      }

      default:
        current[fields[i].id] = typeString;
        break;
    }
  }
};

const mergeContentTypeJsons = (jsons: QueryJson[], contentTypes: ContentTypeMap): MergedJsonRepresentationMap => {
  let timer = new Timer();
  const map: MergedJsonRepresentationMap = {};
  each(jsons, (json) => recurseAndMerge(json, json._contentTypeId, map, contentTypes));
  logger.debug(`Merged JSON files`, {
    caller: 'mergeContentTypeJsons',
    elapsedMs: timer.end().millis,
    itemsAttempted: jsons.length,
    itemsSuccessful: jsons.length
  });
  return map;
};

export default mergeContentTypeJsons;
