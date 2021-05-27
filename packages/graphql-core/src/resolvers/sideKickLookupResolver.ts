import { typeMappings } from '../typeMappings';
import MAPPERS from '../mappers';
import { getLocalizedField } from './fieldResolver';
import { capitalizeFirst } from './createResolvers';

export const sideKickLookupResolver = (displayType: string) => async (content: any, args: any, ctx: any, info: any) => {
  let locale = 'en-US';
  if (info && info.variableValues && info.variableValues.locale) {
    locale = info.variableValues.locale;
  }
  if (args && args.locale) {
    locale = args.locale;
  }
  const typeName = capitalizeFirst(
    typeMappings[content?.sys?.contentType?.sys?.id] ?? content?.sys?.contentType?.sys?.id
  );
  const lookup: { [key: string]: any } = {};
  if (content.sys && content.sys.contentType && MAPPERS[typeName] && MAPPERS[typeName][displayType]) {
    console.log('NeedsLookup', { content, typeName, displayType, m: MAPPERS[typeName] });
    await Promise.all(
      Object.keys(MAPPERS[typeName][displayType]).map(async (field: string) => {
        let fieldName = field;
        let fieldData;
        let fieldContentId = content.sys.id;
        // Check if we have a mapper for this DisplayType
        const mapper = MAPPERS[typeName] ? MAPPERS[typeName][displayType] : null;
        if (mapper && mapper[field] && typeof mapper[field] == 'function') {
          fieldData = await mapper[field](content, args, ctx, info);
          fieldName = fieldData.fieldName;
          console.log('Field', { field, fieldName, fieldData });
        } else if (mapper && mapper[field] && typeof mapper[field] == 'string') {
          fieldName = mapper[field];
          fieldData = getLocalizedField(locale, content, mapper[field]).sys.id;
        }
        if (fieldData && fieldData.sys && fieldData.sys.id) {
          fieldContentId = fieldData.sys.id;
        }
        lookup[field] = {
          contentId: fieldContentId,
          fieldName
        };
        return {};
      })
    );
    return lookup;
  }
  return null;
};
