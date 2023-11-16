import { ApolloContext as LRApolloContext } from '@last-rev/types';
import { Entry } from 'contentful';

export interface ApolloContext extends LRApolloContext {
  siteSettings?: Entry<any> | null;
}
