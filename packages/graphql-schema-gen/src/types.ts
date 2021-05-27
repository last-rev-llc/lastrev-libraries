import { CreateClientParams } from 'contentful';

export type TypeName =
  | 'String'
  | 'JSON'
  | 'Date'
  | 'Theme'
  | 'Number'
  | 'Link'
  | 'Media'
  | 'File'
  | 'NavigationItem'
  | 'Card'
  | 'Boolean'
  | 'RichText';

// in the future, these should support other sources
export type Source = 'Contentful';
export type ConnectionParams = CreateClientParams;

export type GqlField = {
  fieldName: string;
  types: TypeName[];
  isArray: boolean;
};

export type GeneratorInputItem = {
  typeName: string;
  fields: GqlField[];
};

export type GeneratorInput = GeneratorInputItem[];

export type Mapper = (cmsType: string, typeData: any, activeContentTypes: string[]) => GqlField;

export type Fetcher = (connectionParams: ConnectionParams) => Promise<GeneratorInput>;

export type GenerateSchemaParams = { source: Source; connectionParams: ConnectionParams; outFile: string };
