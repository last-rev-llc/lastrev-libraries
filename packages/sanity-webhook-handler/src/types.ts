export type ProcessCommand<T> = {
  isPreview: boolean;
  action: 'update' | 'delete';
  data: T;
};

export type Handlers = {
  entry: (data: ProcessCommand<any>) => Promise<void>;
  asset: (data: ProcessCommand<any>) => Promise<void>;
  contentType: (data: ProcessCommand<any>) => Promise<void>;
  paths: (applyToPreview: boolean, applyToProduction: boolean) => Promise<void>;
};
