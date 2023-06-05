export type AlgoliaObject = {
  index: string;
  objectId: string;
  referencedIds: string;
  additionalFields: any;
};

export type AlgoliaObjectDataByIndex = Map<string, { objectId: string; stringifiedObject: string }[]>;

export type AlgoliaQueryByReferencedIdResult = {
  contentfulEntryIds: string[];
  stringifiedToObjectIdMap: Map<string, string>;
};

export type AlgoliaRecord = {
  id: string;
  algoliaObjects: AlgoliaObject[];
};

export type AlgoliaObjectsByIndex = {
  [index: string]: AlgoliaObject[];
};

export type QueryConfig = {
  preview: boolean;
  locale: string;
} & ({ contentTypes: string[] } | { ids: string[] });

export type AlgoliaDeleteInstruction = {
  action: 'deleteObject';
  indexName: string;
  body: {
    objectID: string;
  };
};

export type AlgoliaCreateInstruction = {
  action: 'addObject';
  indexName: string;
  body: {
    objectID: string;
  } & any;
};

export type AlgoliaInstructions = (AlgoliaDeleteInstruction | AlgoliaCreateInstruction)[];

export type StateType = 'production' | 'preview';

export type EntryToObjectDataMap = Map<string, Map<string, { objectId: string; index: string }>[]>;

export type BatchReindexData = {
  entryId: string;
  items: {
    objectId: string;
    index: string;
  }[];
};
