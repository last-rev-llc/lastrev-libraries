export type SlugToIdLookup = {
  [contentTypeIdSlug: string]: string;
};

export type ContentTypeIdToContentIdsLookup = {
  [contentTypeId: string]: string[];
};

export type ContentTypeIdToSyncTokensLookup = {
  [contentTypeId: string]: string;
};
