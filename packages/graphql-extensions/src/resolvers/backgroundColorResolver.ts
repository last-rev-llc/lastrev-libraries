import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';

const COLOR_MAPPINGS: { [key: string]: string } = {
  'Prussian Blue - #00324A': 'midnight.main',
  'Platinum - #E0E6E9': 'platinum.main',
  'Bright Gray - #E3F1F2': 'coolGrey.lighter',
  'Golden Poppy - #FCC201': 'yellow',
  'White - #FFFFFF': 'common.white',
  'Anti-Flash White - #EFF0F1': 'background.paper',
  'Pastel Red - #FF685C': 'primary.light',
  'Vermilion (Plochere) - #DC2D1F': 'primary.dark'
};

const backgroundColorResolver = async (item: any, _args: any, ctx: ApolloContext) => {
  const color: any = await getLocalizedField(item.fields, 'backgroundColor', ctx);
  if (!color)
    return null;
  return COLOR_MAPPINGS[color];
};

export default backgroundColorResolver;
