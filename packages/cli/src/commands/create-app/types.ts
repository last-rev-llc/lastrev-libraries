export type SelectedActions = {
  createApp: boolean;
  migrateContent: boolean;
};

export type CreateAppProps = {
  example: string;
  directory: string;
  name: string;
};

export type CmsOptions = {
  processCms: boolean;
  cms?: 'Contentful';
  skipEntries?: boolean;
  skipAssets?: boolean;
  exportToken?: string;
  importSpaceId?: string;
  importToken?: string;
  importEnv?: string;
};
