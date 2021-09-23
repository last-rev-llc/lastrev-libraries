export type ConnectionParams = {
  spaceId: string;
  managementToken: string;
  environmentId: string;
};

export type ContentToImport = {
  contentTypes?: any[];
  editorInterfaces?: any[];
  entries?: any[];
  assets?: any[];
};

export type CopyEnvironmentParams = {
  exportParams: ConnectionParams;
  importParams: ConnectionParams;
  skipEntries?: boolean;
  skipAssets?: boolean;
  skipContentTypes?: boolean;
};
