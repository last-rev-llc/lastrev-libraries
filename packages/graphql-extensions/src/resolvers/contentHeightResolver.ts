import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';

const HEIGHT_MAPPINGS: { [key: string]: string }= {
  'Small': 'sm',
  'Medium': 'md',
  'Large': 'lg'
};

const contentHeightResolver = async (item: any, _args: any, ctx: ApolloContext) => {
  const height: any = await getLocalizedField(item.fields, 'contentHeight', ctx);
  if (!height)
    return null;
  return HEIGHT_MAPPINGS[height];
};

export default contentHeightResolver;
