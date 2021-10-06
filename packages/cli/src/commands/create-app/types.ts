export type SelectedActions = {
  createApp: boolean;
  migrateContent: boolean;
  setupNetlify: boolean;
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
