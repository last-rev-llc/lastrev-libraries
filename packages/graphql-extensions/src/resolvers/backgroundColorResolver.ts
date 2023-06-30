import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import { COLOR_MAPPINGS } from './COLOR_MAPPINGS';

const backgroundColorResolver = async (item: any, _args: any, ctx: ApolloContext) => {
  const color: any = await getLocalizedField(item.fields, 'backgroundColor', ctx);
  if (!color) return null;
  return COLOR_MAPPINGS[color];
};

export default backgroundColorResolver;
