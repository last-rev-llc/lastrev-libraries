import { ApolloContext, getLocalizedField } from '@last-rev/graphql-contentful-core';
import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type CardCollection {
    cards: [Card]
  }
`;

export const typeMappings = {
  sectionContentCards: 'cardCollection'
};

const filterToContentTypeMap: Record<string, string> = {
  'All Blog Posts': 'blogPost'
};

export const mappers = {
  CardCollection: {
    CardCollection: {
      cards: async (collection: any, _args: any, ctx: ApolloContext) => {
        const cardsFilter: string = getLocalizedField(collection.fields, 'cardsFilter', ctx);
        if (cardsFilter && filterToContentTypeMap[cardsFilter]) {
          // this is just example, this does not really exist
          const { loaders } = ctx;

          const cards: any = await loaders.entriesByContentTypeLoader.load(filterToContentTypeMap[cardsFilter]);
          cards.__fieldname__ = 'cardsFilter';
          return cards;
        }
        try {
          const cards = await getLocalizedField(collection.fields, 'staticContent', ctx);
          cards.__fieldName__ = 'staticContent';
          return cards;
        } catch (error) {
          console.log('error', error);
        }
        return [];
      }
    }
  }
};
