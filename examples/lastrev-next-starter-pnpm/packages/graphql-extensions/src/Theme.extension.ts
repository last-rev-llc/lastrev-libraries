import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '@last-rev/types';

// This is a example of a extension to normalize the color values from the CMS
// Lowercase the color and remove anything after the first _
// If there's a mapping use it
const COLOR_MAPPING: { [key: string]: string } = {};

export const colorResolver = (field: string, root?: true) => async (quote: any, _args: any, ctx: ApolloContext) => {
  const colorValue: any = getLocalizedField(quote.fields, field, ctx);
  let colorClean = colorValue?.split('_')[0]?.toLowerCase();
  if (COLOR_MAPPING[colorClean]) {
    colorClean = COLOR_MAPPING[colorClean];
  }
  if (!colorClean) return null;

  if (root) return colorClean?.split('.')[0];
  return colorClean;
};

export const mappers = {
  Link: {
    Link: {
      backgroundColor: colorResolver('backgroundColor'),
      color: colorResolver('color', true)
    }
  },
  Hero: {
    Hero: {
      backgroundColor: colorResolver('backgroundColor'),
      color: colorResolver('color', true)
    }
  }
};
export const resolvers = {
  Content: {
    backgroundColor: colorResolver('backgroundColor'),
    color: colorResolver('color')
  }
};
