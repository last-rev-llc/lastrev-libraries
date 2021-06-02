import { typeMappings } from '../typeMappings';
import { capitalizeFirst } from './createResolvers';
import getFieldDataFetcher from './getFieldDataFetcher';

export const sideKickLookupResolver = (displayType: string) => async (content: any, args: any, ctx: any, info: any) => {
  let locale = 'en-US';
  if (info && info.variableValues && info.variableValues.locale) {
    locale = info.variableValues.locale;
  }
  if (args && args.locale) {
    locale = args.locale;
  }
  const { mappers } = ctx;
  const typeName = capitalizeFirst(
    typeMappings[content?.sys?.contentType?.sys?.id] ?? content?.sys?.contentType?.sys?.id
  );
  const lookup: { [key: string]: any } = {};
  if (content.sys && content.sys.contentType && mappers[typeName] && mappers[typeName][displayType]) {
    console.log('NeedsLookup', { content, typeName, displayType, m: mappers[typeName] });
    await Promise.all(
      Object.keys(mappers[typeName][displayType]).map(async (field: string) => {
        let fieldName = field;
        let fieldContentId = content.sys.id;

        const fieldDataFetcher = getFieldDataFetcher(typeName, displayType, field, mappers);

        const fieldData = await fieldDataFetcher(content, args, ctx, info, locale);

        // why is this needed?
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
