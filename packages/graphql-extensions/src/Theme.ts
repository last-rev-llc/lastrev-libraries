import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import { COLOR_MAPPINGS } from './resolvers/COLOR_MAPPINGS';

export const colorResolver = (field: string, root?: true) => async (quote: any, _args: any, ctx: ApolloContext) => {
  let colorValue: any = getLocalizedField(quote.fields, field, ctx);
  let colorClean = colorValue;

  colorClean = COLOR_MAPPINGS[colorValue];

  if (!colorClean) return null;

  if (root) return colorClean?.split('.')[0];
  return colorClean;
};

export const mappers = {
  Link: {
    Link: {
      // backgroundColor: colorResolver('backgroundColor'),
      color: colorResolver('color', true)
    }
  }
  // Hero: {
  //   Hero: {
  //     backgroundColor: colorResolver('backgroundColor'),
  //     color: colorResolver('color', true)
  //   }
  // }
};
export const resolvers = {
  // Content: {
  //   backgroundColor: colorResolver('backgroundColor'),
  //   color: colorResolver('color')
  // }
};
