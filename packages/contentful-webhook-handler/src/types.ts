import { Entry, Asset, ContentType } from 'contentful';

export type ProcessCommand<T extends Entry<any> | Asset | ContentType> = {
  isPreview: boolean;
  action: 'update' | 'delete';
  data: T;
};

export type Handlers = {
  entry: (data: ProcessCommand<Entry<any>>) => Promise<void>;
  asset: (data: ProcessCommand<Asset>) => Promise<void>;
  contentType: (data: ProcessCommand<ContentType>) => Promise<void>;
  paths: (applyToPreview: boolean, applyToProduction: boolean) => Promise<void>;
};
