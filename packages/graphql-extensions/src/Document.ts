import gql from 'graphql-tag';
import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { format } from 'date-fns';

export const typeDefs = gql`
  type Document implements Content {
    id: String
    sidekickLookup: JSON
    animation: JSON
    theme: [Theme]
    googleId: String
    googleDocUrl: String
    lastUpdatedDateOfGoogleDoc: Date
    downloadUrl: String
  }
`;

export const mappers: any = {
  Document: {
    Document: {
      googleDocUrl: async (document: any, _args: any, ctx: ApolloContext) => {
        const googleDocUrl = await getLocalizedField(document?.fields, 'googleDocUrl', ctx);
        if (googleDocUrl?.includes('document')) return `${googleDocUrl}?embedded=true`;
        if (googleDocUrl?.includes('spreadsheets')) return `${googleDocUrl}?widget=true&amp;headers=false`;
        if (googleDocUrl?.includes('presentation') && googleDocUrl?.includes('pub'))
          return googleDocUrl.replace('/pub', '/embed');
        return googleDocUrl;
      },
      downloadUrl: async (document: any, _args: any, ctx: ApolloContext) => {
        const googleId = await getLocalizedField(document?.fields, 'googleId', ctx);
        if (!googleId) return;
        const googleDocUrl = await getLocalizedField(document?.fields, 'googleDocUrl', ctx);
        if (googleDocUrl?.includes('document'))
          return `https://docs.google.com/document/d/${googleId}/export?format=pdf`;
        if (googleDocUrl?.includes('spreadsheets'))
          return `https://docs.google.com/spreadsheets/d/${googleId}/export?format=pdf`;
        if (googleDocUrl?.includes('presentation'))
          return `https://docs.google.com/presentation/d/${googleId}/export/pptx`;
        return;
      },
      lastUpdatedDateOfGoogleDoc: async (document: any, _args: any, ctx: ApolloContext) => {
        const lastUpdatedDateOfGoogleDoc = await getLocalizedField(document?.fields, 'lastUpdatedDateOfGoogleDoc', ctx);
        if (!lastUpdatedDateOfGoogleDoc) return;
        return format(new Date(lastUpdatedDateOfGoogleDoc), 'MMM dd, uuuu HH:mm z');
      }
    }
  }
};
