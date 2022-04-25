import gql from 'graphql-tag';

export const typeDefs = gql`
  extend type Media {
    controls: Boolean
  }
`;

export const mappers: any = {
  Media: {
    Media: {
      // NOTE: if needed, this can be modified based on conditions (eg. variant)
      controls: () => true
    }
  },
  Asset: {
    Asset: {
      width: async (media: any) => media?.details?.image?.width,
      height: async (media: any) => media?.details?.image?.height,
      extension: async (media: any) => {
        const splitUrl = media?.url.split('.');
        return splitUrl ? splitUrl[splitUrl.length - 1] : null;
      }
    }
  }
};
