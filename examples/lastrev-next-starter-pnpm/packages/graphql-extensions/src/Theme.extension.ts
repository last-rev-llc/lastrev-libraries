import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from '@last-rev/types';
import { defaultResolver } from './utils/defaultResolver';

// This is a example of a extension to normalize the color values from the CMS
// Lowercase the color and remove anything after the first _
// If there's a mapping use it
const COLOR_MAPPING: { [key: string]: string } = {};

export const colorResolver = (field: string, root?: true) => async (quote: any, _args: any, ctx: ApolloContext) => {
  const colorValue: any = defaultResolver(field)(quote, _args, ctx);

  let colorClean = colorValue?.split('_')[0];
  if (COLOR_MAPPING[colorClean]) {
    colorClean = COLOR_MAPPING[colorClean];
  }
  // if (!colorClean) return 'inherit';

  if (root) return colorClean?.split('.')[0];
  return colorClean;
};

export const mappers = {
  Link: {
    Link: {
      backgroundColor: colorResolver('backgroundColor', true),
      color: colorResolver('color', true)
    }
  },
  Hero: {
    Hero: {
      backgroundColor: colorResolver('backgroundColor', true),
      color: colorResolver('color', true)
    }
  },
  Block: {
    Block: {
      backgroundColor: colorResolver('backgroundColor', true),
      color: colorResolver('color', true)
    }
  },
  Card: {
    Card: {
      color: colorResolver('color', true)
    }
  },
  Collection: {
    Collection: {
      backgroundColor: colorResolver('backgroundColor', true),
      color: colorResolver('color', true)
    }
  },
  CollectionExpandable: {
    CollectionExpandable: {
      backgroundColor: colorResolver('backgroundColor', true),
      color: colorResolver('color', true)
    }
  },
  Header: {
    Header: {
      backgroundColor: colorResolver('backgroundColor', true),
      color: colorResolver('color', true)
    }
  },
  Footer: {
    Footer: {
      backgroundColor: colorResolver('backgroundColor', true),
      color: colorResolver('color', true)
    }
  },
  Form: {
    Form: {
      backgroundColor: colorResolver('backgroundColor', true),
      color: colorResolver('color', true)
    }
  },
  Section: {
    Section: {
      backgroundColor: colorResolver('backgroundColor', true),
      color: colorResolver('color', true)
    }
  }
};
export const resolvers = {
  Content: {
    backgroundColor: colorResolver('backgroundColor', true),
    color: colorResolver('color')
  }
};
