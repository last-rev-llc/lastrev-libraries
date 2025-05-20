import { ContentTypeCollection } from 'contentful';
import { CmsEntry, CmsAsset } from '@last-rev/types';

export type ProcessCommand<T extends CmsEntry<any> | CmsAsset<any> | ContentTypeCollection> = {
  isPreview: boolean;
  action: 'update' | 'delete';
  data: T;
};

export type Handlers = {
  entry: (data: ProcessCommand<CmsEntry<any>>) => Promise<void>;
  asset: (data: ProcessCommand<CmsAsset<any>>) => Promise<void>;
  contentType: (data: ProcessCommand<ContentTypeCollection>) => Promise<void>;
  paths: (applyToPreview: boolean, applyToProduction: boolean) => Promise<void>;
};
