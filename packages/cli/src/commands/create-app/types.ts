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

export type CreateAppConfig = {
  app?: {
    name?: string;
    starter?: string;
    contentfulSpaceId?: string;
    contentfulEnv?: string;
    repoName?: string;
    repoOwner?: string;
    devDomainUrl?: string;
    googleTagManagerId?: string;
  };
  redis?: {
    host?: string;
    port?: number;
    password?: string;
    username?: string;
  };
  netlify?: {
    accountSlug?: string;
    devSiteName?: string;
    prodSiteName?: string;
    storybookSiteName?: string;
  };
  contentfulImport?: {
    sourceSpaceId?: string;
    sourceEnv?: string;
    targetSpaceId?: string;
    targetEnv?: string;
    skipContentTypes?: boolean;
    skipEntries?: boolean;
    skipAssets?: boolean;
    skipExtensions?: boolean;
  };
};
