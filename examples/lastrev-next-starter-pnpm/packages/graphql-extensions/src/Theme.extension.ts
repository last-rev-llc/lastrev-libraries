import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from './types';
import { defaultResolver } from './utils/defaultResolver';

// This is a example of a extension to normalize the color values from the CMS
// Lowercase the color and remove anything after the first _
// If there's a mapping use it
const COLOR_MAPPING: { [key: string]: string } = {};

export const colorResolver = (field: string, root?: true) => async (item: any, _args: any, ctx: ApolloContext) => {
  const colorValue: any = getLocalizedField(item.fields, field, ctx);
  let colorClean = colorValue?.split('_')[0]?.toLowerCase();
  if (COLOR_MAPPING[colorClean]) {
    colorClean = COLOR_MAPPING[colorClean];
  }
  if (!colorClean) return 'inherit';

  if (root) return colorClean?.split('.')[0];
  return colorClean;
};

export const mappers = {
  Link: {
    Link: {
      backgroundColor: defaultResolver('backgroundColor'),
      color: colorResolver('color', true)
    }
  },
  Hero: {
    Hero: {
      backgroundColor: defaultResolver('backgroundColor'),
      color: colorResolver('color', true)
    }
  },
  Block: {
    Block: {
      backgroundColor: defaultResolver('backgroundColor'),
      color: colorResolver('color', true)
    }
  },
  Collection: {
    Collection: {
      backgroundColor: defaultResolver('backgroundColor'),
      color: colorResolver('color', true)
    }
  },

  CollectionDynamic: {
    CollectionDynamic: {
      backgroundColor: defaultResolver('backgroundColor'),
      color: colorResolver('color', true)
    }
  },
  CollectionExpandable: {
    CollectionExpandable: {
      backgroundColor: defaultResolver('backgroundColor'),
      color: colorResolver('color', true)
    }
  },
  Header: {
    Header: {
      backgroundColor: defaultResolver('backgroundColor'),
      color: colorResolver('color', true)
    }
  },
  Footer: {
    Footer: {
      backgroundColor: defaultResolver('backgroundColor'),
      color: colorResolver('color', true)
    }
  },
  ElementForm: {
    ElementForm: {
      backgroundColor: defaultResolver('backgroundColor'),
      color: colorResolver('color', true)
    }
  },
  Section: {
    Section: {
      backgroundColor: defaultResolver('backgroundColor'),
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
