import { createServer } from './createServer';
import { createHandler } from './handler';
import { createVercelHandler } from './vercelHandler';
import createRichText from './utils/createRichText';
import getLocalizedField from './utils/getLocalizedField';
import getDefaultFieldValue from './utils/getDefaultFieldValue';
import getTypeName from './utils/getTypeName';
import capitalizeFirst from './utils/capitalizeFirst';
import buildSchema from './buildSchema';
import SchemaCache from './SchemaCache';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';

export {
  createServer,
  getLocalizedField,
  createHandler,
  getDefaultFieldValue,
  createVercelHandler,
  createRichText,
  getTypeName,
  capitalizeFirst,
  buildSchema,
  SchemaCache,
  documentToPlainTextString,
  BLOCKS,
  INLINES,
  MARKS
};
