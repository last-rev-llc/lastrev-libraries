import { ContentType, CreateClientParams } from 'contentful';

export type TypeName =
  | 'String'
  | 'JSON'
  | 'Date'
  | 'Theme'
  | 'Int'
  | 'Float'
  | 'Link'
  | 'Content'
  | 'Media'
  | 'File'
  | 'NavigationItem'
  | 'Card'
  | 'Boolean'
  | 'RichText'
  | 'Location';

// in the future, these should support other sources
export type Source = 'Contentful';
export type ConnectionParams = CreateClientParams;

export type GqlField = {
  fieldName: string;
  types: TypeName[];
  isArray: boolean;
};

export type Fetcher = (
  typeMappings: Record<string, string>,
  connectionParams: ConnectionParams,
  skipReferenceFields: boolean
) => Promise<string>;

export type GenerateSchemaParams = {
  source: Source;
  typeMappings: Record<string, string>;
  skipReferenceFields: boolean;
  connectionParams?: ConnectionParams;
  contentTypes?: ContentType[];
};
