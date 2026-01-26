import { has, upperFirst } from 'lodash';

// Sanity schema type structure (from config.sanity.schemaTypes)
type SanitySchemaType = {
  name: string;
  type: 'document' | 'object' | string;
};

// Reserved fields for all types implementing Content
const reservedFields: Record<string, string> = {
  sidekickLookup: 'JSON',
  id: 'String',
  theme: '[Theme]',
  animation: 'JSON'
};

/**
 * Map schema type name using typeMappings
 */
const mapSchemaTypeName = (
  schema: SanitySchemaType,
  typeMappings: Record<string, string>
): SanitySchemaType => {
  let name = schema.name;
  if (has(typeMappings, name)) {
    name = typeMappings[name];
  }
  return { ...schema, name };
};

/**
 * Generate GraphQL type for a Sanity document
 * Documents implement Content interface with reserved fields only
 */
const generateDocumentType = (schema: SanitySchemaType): string => {
  const typeName = upperFirst(schema.name);
  const fields = Object.entries(reservedFields)
    .map(([name, type]) => `  ${name}: ${type}`)
    .join('\n');

  return `type ${typeName} implements Content {\n${fields}\n}`;
};

/**
 * Generate GraphQL type for a Sanity object
 * Objects are simple types with no fields
 */
const generateObjectType = (schema: SanitySchemaType): string => {
  const typeName = upperFirst(schema.name);
  return `type ${typeName} {\n  _key: String\n}`;
};

/**
 * Generate GraphQL schema from Sanity schema types
 */
export const generateSanitySchema = (
  typeMappings: Record<string, string>,
  schemas: SanitySchemaType[]
): string => {
  const mappedSchemas = schemas.map((s) => mapSchemaTypeName(s, typeMappings));

  const documents = mappedSchemas.filter((s) => s.type === 'document');
  const objects = mappedSchemas.filter((s) => s.type === 'object');

  const documentTypes = documents.map(generateDocumentType).join('\n\n');
  const objectTypes = objects.map(generateObjectType).join('\n\n');

  return `${documentTypes}\n\n${objectTypes}`;
};
