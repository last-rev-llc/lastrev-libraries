import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';

const COLOR_MAPPINGS: { [key: string]: string }= {
  'Platinum - #E0E6E9': 'yellow',
  'Prussian Blue - #00324A': 'yellow'
};

const backgroundColorResolver = async (item: any, _args: any, ctx: ApolloContext) => {
  const color: any = await getLocalizedField(item.fields, 'backgroundColor', ctx);
  if (!color)
    return null;
  return COLOR_MAPPINGS[color];
};

export const mappers: any = {
  Hero: {
    Hero: {
      backgroundColor: backgroundColorResolver
    }
  },
  Section: {
    Section: {
      backgroundColor: backgroundColorResolver
    }
  }
};
