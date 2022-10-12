import gql from 'graphql-tag';
import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

export const mappers: any = {
  CommonResource: {
    CommonResource: {
      image: (item: any, _args: any, ctx: ApolloContext) => {
        const mediaRef: any = getLocalizedField(item.fields, 'media', ctx);
        return mediaRef;
      }
    }
  }
};

export const typeDefs = gql`
  extend type CommonResource {
    image: Media
  }
`;
