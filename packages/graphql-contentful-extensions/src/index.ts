import { Source, DocumentNode, GraphQLSchema } from 'graphql';

export * as Card from './Card';
export * as Collection from './Collection';
export * as Header from './Header';
export * as Blog from './Blog';
export * as Hero from './Hero';
export * as Link from './Link';
export * as NavigationItem from './NavigationItem';
export * as Page from './Page';
export * as Section from './Section';
export * as Media from './Media';
export * as Quote from './Quote';
export * as RichText from './RichText';
export * as Theme from './Theme';

export type GraphQlExtension = {
  typeDefs?: string | DocumentNode | Source | GraphQLSchema;
  resolvers?: {};
  mappers?: {};
  typeMappings?: {};
  pathsConfigs?: {};
};
