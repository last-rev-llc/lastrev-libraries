import { BaseEntry, BaseAsset, ContentTypeCollection } from '@last-rev/types';

export type ProcessCommand<T extends BaseEntry | BaseAsset | ContentTypeCollection> = {
  isPreview: boolean;
  action: 'update' | 'delete';
  data: T;
};

export type Handlers = {
  entry: (data: ProcessCommand<BaseEntry>) => Promise<void>;
  asset: (data: ProcessCommand<BaseAsset>) => Promise<void>;
  contentType: (data: ProcessCommand<ContentTypeCollection>) => Promise<void>;
  paths: (applyToPreview: boolean, applyToProduction: boolean) => Promise<void>;
};
