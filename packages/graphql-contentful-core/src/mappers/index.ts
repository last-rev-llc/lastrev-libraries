import { ApolloContext } from '../resolvers/createResolvers';
import client from '../contentful-client';
import fieldResolver from '../resolvers/fieldResolver';

export type TypeMapper = {
  [fieldName: string]: string | Function;
};

export type Mappers = {
  [typeName: string]: {
    [displayType: string]: TypeMapper;
  };
};

export const MAPPERS: Mappers = {
  // The Header navigation expects NavigationItem that have a link and a children collection
  // Here we setup a mapper for displaying a link as a NavigationItem
  // This allows to use existant links and reduce the amount of nesting
  Page: {
    Page: {
      contents: 'sections'
    }
  },
  Link: {
    Link: {
      // commented this out since this seems too specific to the original implementation
      // url: linkUrlResolver,
      theme: async (link: any, args: any, ctx: any, info: any) => {
        //TODO document this use case for adapting theme fields without updating content model
        //TODO document migrating old fields to new component standards
        // This logic used to be in the ElementCTA component
        const modal = await fieldResolver('Link', 'modal')(link, args, ctx, info);
        if (modal) {
          return { variant: 'button' };
        }
        return {
          variant: 'link'
        };
      }
    },
    NavigationItem: {
      link: (x: any) => ({ ...x, fieldName: 'link' }),
      children: () => []
    }
  },
  RichText: {
    RichText: {
      raw: (x: any) => x
    }
  },
  CardCollection: {
    CardCollection: {
      cards: async (collection: any, args: any, ctx: ApolloContext, info: any) => {
        if (collection?.fields?.cardsFilter) {
          //TODO Figure out how to fetch cards by filters
          const cards: any = await client
            .getEntries({
              ...collection?.fields?.cardsFilter
            })
            .then(({ items }) => ctx.loaders.entries.loadMany(items.map((x) => x?.sys?.id)));
          cards.fieldName = 'cardsFilter';
        }
        try {
          const cards = await fieldResolver('DEFAULT', 'staticContent')(collection, args, ctx, info);
          cards.fieldName = 'staticContent';
          return cards;
        } catch (error) {
          console.log('error', error);
        }
        return [];
      }
    }
  }
};

export default MAPPERS;
