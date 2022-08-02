export type Lib = {
  name: string;
  location: string;
  version: string;
};

export enum LibraryError {
  NOT_FOUND_IN_LIBS = 'Package was not found in lastrev-libraries',
  NOT_FOUND_IN_NODE_MODULES = 'Package was not found in node_modules',
  NOT_LINKED = 'Package in node_modules is not linked to package in lastrev-libraries',
  NOT_IN_WORKSPACES = 'Package is not in package.json workspaces'
}

export type EvaluatedLib = {
  library: Lib;
  errors: LibraryError[];
};
