import { type ApolloContext as LrApolloContext } from '@last-rev/types';

export interface ApolloContext extends LrApolloContext {
  siteSettings: any;
}
