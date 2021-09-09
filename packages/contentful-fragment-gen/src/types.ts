import { ContentType } from 'contentful';

export type FragementFileData = {
  contentType: string;
  typeName: string;
  baseFields: string[];
  childFields: string[];
};

export type ExcludeConfig = {
  baseExclusions: string[];
  childExclusions: string[];
};

export type ExcludeConfigs = {
  [contentType: string]: ExcludeConfig;
};

export type ContentTypeMap = {
  [contentType: string]: ContentType;
};

export type QueryJson = {
  _contentTypeId: string;
  [key: string]: any;
};

export type FragmentData = {
  contentType: string;
  static: boolean;
  root: boolean;
  simpleValueFields: Set<string>;
  locationFields: Set<string>;
  richTextFields: Set<string>;
  assetFields: Set<string>;
  referenceFields: {
    [fieldName: string]: Set<string>;
  };
};

export type FragmentDataMapping = {
  [fragmentName: string]: FragmentData;
};

export type ReferenceTree = {
  [contentType: string]: string[];
};

export type MergedJsonRepresentation = {
  [fieldName: string]: string | MergedJsonRepresentationMap;
};

export type MergedJsonRepresentationMap = { [contentTypeId: string]: MergedJsonRepresentation };
