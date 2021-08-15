import DataLoader from 'dataloader';
import { Entry, Asset, ContentType } from 'contentful';

export type ItemKey = {
  id: string;
  preview: boolean;
};

export type ContentfulLoaders = {
  entryLoader: DataLoader<ItemKey, Entry<any> | null>;
  assetLoader: DataLoader<ItemKey, Asset | null>;
  entriesByContentTypeLoader: DataLoader<ItemKey, Entry<any>[]>;
  fetchAllContentTypes: (preview: boolean) => Promise<ContentType[]>;
};
