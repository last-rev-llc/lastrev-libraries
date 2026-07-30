import { BaseEntry, BaseAsset, ContentTypeCollection } from '@last-rev/types';

export type ProcessCommand<T extends BaseEntry | BaseAsset | ContentTypeCollection> = {
  isPreview: boolean;
  action: 'update' | 'delete';
  data: T;
  /**
   * Normalized document id from the webhook parser, with any `drafts.` prefix
   * stripped. Sanity's default webhook projection is "the whole document after the
   * change", and a delete has no after-state, so a delete arrives with no document
   * body at all — this is then the only id available.
   */
  itemId?: string;
};

export type Handlers = {
  entry: (data: ProcessCommand<BaseEntry>) => Promise<void>;
  asset: (data: ProcessCommand<BaseAsset>) => Promise<void>;
  contentType: (data: ProcessCommand<ContentTypeCollection>) => Promise<void>;
  paths: (applyToPreview: boolean, applyToProduction: boolean) => Promise<void>;
};
