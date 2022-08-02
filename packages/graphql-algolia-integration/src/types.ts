export type AlgoliaObject = {
  index: string;
  data: any;
};

export type AlgoliaRecord = {
  algoliaObjects: AlgoliaObject[];
};

export type AlgoliaObjectsByIndex = {
  [index: string]: AlgoliaObject[];
};

export type QueryConfig = {
  preview: boolean;
  locale: string;
};
