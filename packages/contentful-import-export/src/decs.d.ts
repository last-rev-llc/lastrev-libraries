declare module 'contentful-export' {
  function contentfulExport({
    spaceId,
    managementToken,
    environmentId,
    skipRoles,
    skipWebhooks,
    skipLocales,
    skipEntries,
    skipAssets,
    skipContentTypes,
    skipEditorInterfaces
  }: {
    spaceId: string;
    managementToken: string;
    environmentId: string;
    saveFile: boolean;
    skipRoles: boolean;
    skipWebhooks: boolean;
    skipLocales: boolean;
    skipEntries?: boolean;
    skipAssets?: boolean;
    skipContentTypes?: boolean;
    skipEditorInterfaces?: boolean;
  }): Promise<{
    contentTypes?: any[];
    editorInterfaces?: any[];
    entries?: any[];
    assets?: any[];
  }>;
  export = contentfulExport;
}

declare module 'contentful-import' {
  function contentfulImport({
    spaceId,
    managementToken,
    content
  }: {
    spaceId: string;
    managementToken: string;
    environmentId: string;
    content: {
      contentTypes?: any[];
      editorInterfaces?: any[];
      entries?: any[];
      assets?: any[];
    };
  }): Promise<void>;
  export = contentfulImport;
}
