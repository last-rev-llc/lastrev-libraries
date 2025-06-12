import { Entry, Asset, ContentTypeCollection } from '@last-rev/types';

export type ProcessCommand<T extends Entry<any> | Asset | ContentTypeCollection> = {
  isPreview: boolean;
  action: 'update' | 'delete';
  data: T;
};

export type Handlers = {
  entry: (data: ProcessCommand<Entry<any>>) => Promise<void>;
  asset: (data: ProcessCommand<Asset>) => Promise<void>;
  contentType: (data: ProcessCommand<ContentTypeCollection>) => Promise<void>;
  paths: (applyToPreview: boolean, applyToProduction: boolean) => Promise<void>;
};
