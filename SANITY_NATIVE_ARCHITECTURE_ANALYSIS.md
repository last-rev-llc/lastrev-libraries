# Sanity Native Architecture Analysis

## Executive Summary

This document analyzes the architectural changes required to support **native Sanity objects** in the LastRev libraries. The analysis covers migration from document-based internationalization to `sanity-plugin-internationalized-array` and restructuring the codebase to handle Sanity content natively.

**Key Goals:**

1. Allow Sanity objects to remain in their native format (eliminate conversion to Contentful structure)
2. Migrate from document-based i18n to field-level internationalized arrays
3. Maintain full backward compatibility with existing Contentful implementations
4. Use Sanity's native types from `@sanity/client` / `@sanity/types`

---

## Current Architecture Overview

### Data Flow Today

```
┌─────────────────────────────────────────────────────────────┐
│                     Sanity Studio                           │
│        (Document per locale via @sanity/i18n)              │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │  sanity-cms-loader  │
              │   (Complex GROQ     │
              │   with _translations│
              │   joins)            │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │   sanity-mapper     │    ◄── CONVERSION POINT
              │  convertSanityDoc() │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │  Contentful-style   │
              │  BaseEntry/BaseAsset│
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │  GraphQL Resolvers  │
              │   (fieldResolver)   │
              └─────────────────────┘
```

### Current GROQ Queries (Complex due to i18n)

Every query includes translation joins:

```groq
*[_id in $ids && (!defined(__i18n_lang) || __i18n_lang == $defaultLocale)]{
  ...,
  "_translations": *[
    _type == "translation.metadata" &&
    references(^._id)
  ].translations[]{
    "doc": value->{
      ...
    }
  }[doc.__i18n_lang != $defaultLocale && defined(doc)]
}
```

This pattern repeats in:

- `fetchBatchItems()` - lines 55-66
- `getBatchEntriesByContentTypeFetcher()` - lines 101-111
- `getBatchEntriesByFieldValueFetcher()` - lines 132-142
- `getBatchEntriesRefByFetcher()` - lines 163-173

---

## Target Architecture

### New Data Flow

```
                    ┌─────────────────┐     ┌─────────────────┐
                    │   Contentful    │     │     Sanity      │
                    └────────┬────────┘     │ (i18n-array)    │
                             │              └────────┬────────┘
                             │                       │
                             ▼                       ▼
              ┌──────────────────────┐   ┌──────────────────────┐
              │contentful-cms-loader │   │  sanity-cms-loader   │
              │                      │   │  (Simple GROQ)       │
              └──────────┬───────────┘   └──────────┬───────────┘
                         │                          │
                         ▼                          ▼
              ┌──────────────────────┐   ┌──────────────────────┐
              │  Contentful-style    │   │  Sanity native       │
              │  BaseEntry/BaseAsset │   │  (uses @sanity/types)│
              └──────────┬───────────┘   └──────────┬───────────┘
                         │                          │
                         ▼                          ▼
              ┌──────────────────────┐   ┌──────────────────────┐
              │graphql-contentful-   │   │graphql-sanity-       │
              │resolvers (or shared) │   │resolvers             │
              └──────────┬───────────┘   └──────────┬───────────┘
                         │                          │
                         └──────────┬───────────────┘
                                    ▼
              ┌─────────────────────────────────────────────────────┐
              │                 Client Application                  │
              └─────────────────────────────────────────────────────┘
```

### New GROQ Queries (Simple)

With `sanity-plugin-internationalized-array`, queries become straightforward:

```groq
// Fetch by IDs - no translation joins needed
*[_id in $ids]

// Fetch by type
*[_type == $type]

// Fetch by field value
*[_type == $type && slug.current == $value]

// Fetch references
*[_type == $type && references($id)]
```

### Native Sanity Object Structure

Uses types directly from `@sanity/types`:

```typescript
// Document with internationalized-array fields
{
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;

  // Internationalized string field
  title: [
    { _key: 'en-US', value: 'Home' },
    { _key: 'es-ES', value: 'Inicio' }
  ],

  // Slug (unchanged)
  slug: { _type: 'slug', current: 'home' },

  // Reference
  heroSection: { _type: 'reference', _ref: 'section-xyz' },

  // Portable Text with i18n
  body: [
    { _key: 'en-US', value: [{ _type: 'block', children: [...] }] }
  ],

  // Image
  image: { _type: 'image', asset: { _ref: 'image-abc123' } }
}
```

---

## Packages Requiring Changes

### Tier 1: Core Changes

| Package                         | Required Changes                                                                                      |
| ------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `@last-rev/types`               | Add Sanity-specific type exports (re-export from `@sanity/types`), create CMS-agnostic interfaces     |
| `@last-rev/sanity-cms-loader`   | **Major rewrite**: Remove all conversion logic, simplify GROQ queries, return native Sanity documents |
| `@last-rev/sanity-mapper`       | **Remove or deprecate** - no longer needed                                                            |
| `@last-rev/graphql-cms-core`    | **Major restructure**: Split resolvers into CMS-specific implementations or packages                  |
| `@last-rev/graphql-cms-helpers` | Update context creation for Sanity-specific context                                                   |

### Tier 2: Secondary Changes

| Package                           | Required Changes                                                                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@last-rev/graphql-schema-gen`    | **Significant changes**: Add Sanity schema generation that reads native Sanity schema types directly instead of Contentful-style `ContentType[]` |
| `@last-rev/cms-path-util`         | Update field access for Sanity structure                                                                                                         |
| `@last-rev/cms-sync-to-fs`        | Handle native Sanity format                                                                                                                      |
| `@last-rev/sanity-webhook-parser` | Remove `convertSanityDoc` dependency, pass through native documents                                                                              |
| `@last-rev/cms-webhook-handler`   | Remove `convertSanityDoc` calls, simplify GROQ queries, CMS-aware handler logic                                                                  |

### Tier 3: Unchanged

| Package                 | Reason                              |
| ----------------------- | ----------------------------------- |
| All Contentful packages | Contentful path unchanged           |
| Cache layer packages    | Work if loader interface maintained |
| Infrastructure packages | No CMS dependency                   |

---

## Detailed Implementation Plan

### Phase 1: Types Package Updates

**File:** `packages/types/index.d.ts`

```typescript
// Re-export Sanity types directly
export type {
  SanityDocument,
  SanityImageAsset,
  SanityFileAsset,
  Reference as SanityReference,
  Slug as SanitySlug,
  PortableTextBlock
} from '@sanity/types';

// Internationalized array helper type
export interface InternationalizedValue<T> {
  _key: string; // locale code
  value: T;
}

// CMS-agnostic content type (union)
export type CmsEntry = BaseEntry | SanityDocument;
export type CmsAsset = BaseAsset | SanityImageAsset | SanityFileAsset;

// Updated context to support both CMS types
export type ApolloContext = {
  loaders: CmsLoaders;
  cms: 'Contentful' | 'Sanity';
  // ... rest unchanged
};
```

**Estimated Hours:** 2-3

---

### Phase 2: Sanity CMS Loader Rewrite

**File:** `packages/sanity-cms-loader/src/index.ts`

Complete rewrite with simplified queries:

```typescript
import { createClient, SanityClient } from '@sanity/client';
import DataLoader from 'dataloader';
import type { SanityDocument, SanityImageAsset } from '@sanity/types';

const createLoaders = (config: LastRevAppConfig, defaultLocale: string) => {
  const client = createClient({
    projectId: config.sanity.projectId,
    dataset: config.sanity.dataset,
    apiVersion: config.sanity.apiVersion || '2024-01-01',
    token: config.sanity.token,
    useCdn: true
  });

  const previewClient = createClient({
    ...client.config(),
    useCdn: false,
    perspective: 'drafts'
  });

  // Simple document fetch - no translation joins
  const fetchDocuments = async (ids: string[], preview: boolean) => {
    const c = preview ? previewClient : client;
    return c.fetch<SanityDocument[]>(`*[_id in $ids]`, { ids });
  };

  // Simple type fetch
  const fetchByType = async (type: string, preview: boolean) => {
    const c = preview ? previewClient : client;
    return c.fetch<SanityDocument[]>(`*[_type == $type]`, { type });
  };

  // Simple field value fetch
  const fetchByFieldValue = async (type: string, field: string, value: string, preview: boolean) => {
    const c = preview ? previewClient : client;
    // Handle slug fields specially
    const query =
      field === 'slug'
        ? `*[_type == $type && slug.current == $value][0]`
        : `*[_type == $type && ${field} == $value][0]`;
    return c.fetch<SanityDocument | null>(query, { type, value });
  };

  // Asset fetch
  const fetchAssets = async (refs: string[], preview: boolean) => {
    const c = preview ? previewClient : client;
    return c.fetch<SanityImageAsset[]>(`*[_id in $refs && _type in ['sanity.imageAsset', 'sanity.fileAsset']]`, {
      refs
    });
  };

  return {
    entryLoader: new DataLoader(/* uses fetchDocuments */),
    assetLoader: new DataLoader(/* uses fetchAssets */),
    entriesByContentTypeLoader: new DataLoader(/* uses fetchByType */),
    entryByFieldValueLoader: new DataLoader(/* uses fetchByFieldValue */),
    entriesRefByLoader: new DataLoader(/* simple references query */),
    fetchAllContentTypes: async () => config.sanity.schemaTypes
  };
};
```

**Key Changes:**

- Remove all `convertSanityDoc()` calls
- Remove all `_translations` join logic
- Remove `__i18n_lang` filtering
- Return raw Sanity documents
- Queries are 80% simpler

**Estimated Hours:** 4-6

---

### Phase 3: GraphQL CMS Core Restructure

This is the most significant change. Currently all resolvers assume Contentful-style structure.

**Option A: Separate Packages for CMS-Specific Resolvers**

```
packages/
  graphql-cms-core/           # Shared utilities, schema building
  graphql-contentful-resolvers/  # Contentful-specific field resolution
  graphql-sanity-resolvers/      # Sanity-specific field resolution
```

**Option B: Separate Code Paths in Same Package**

```
packages/graphql-cms-core/src/
  resolvers/
    contentful/
      fieldResolver.ts
      createResolvers.ts
    sanity/
      fieldResolver.ts
      createResolvers.ts
    index.ts  # Routes based on config.cms
  utils/
    contentful/
      getLocalizedField.ts
    sanity/
      getLocalizedField.ts
      resolveReference.ts
```

**Recommended: Option B** - Keeps package count manageable, easier to share common logic.

#### Sanity Field Resolver

```typescript
// packages/graphql-cms-core/src/resolvers/sanity/fieldResolver.ts

import type { SanityDocument } from '@sanity/types';

const getLocalizedValue = <T>(
  field: Array<{ _key: string; value: T }> | undefined,
  locale: string,
  fallbackLocale: string
): T | undefined => {
  if (!field || !Array.isArray(field)) return undefined;
  return (
    field.find((v) => v._key === locale)?.value ??
    field.find((v) => v._key === fallbackLocale)?.value ??
    field[0]?.value
  );
};

const fieldResolver =
  (displayType: string) => async (content: SanityDocument, args: any, ctx: ApolloContext, info: GraphQLResolveInfo) => {
    const { fieldName } = info;
    const locale = ctx.locale || ctx.defaultLocale;

    let value = content[fieldName];

    // Handle internationalized array fields
    if (Array.isArray(value) && value[0]?._key && 'value' in value[0]) {
      value = getLocalizedValue(value, locale, ctx.defaultLocale);
    }

    // Handle slug
    if (value?._type === 'slug') {
      return value.current;
    }

    // Handle single reference
    if (value?._type === 'reference' && value._ref) {
      return ctx.loaders.entryLoader.load({ id: value._ref, preview: ctx.preview });
    }

    // Handle image reference
    if (value?._type === 'image' && value.asset?._ref) {
      return ctx.loaders.assetLoader.load({ id: value.asset._ref, preview: ctx.preview });
    }

    // Handle array of references
    if (Array.isArray(value) && value[0]?._type === 'reference') {
      return ctx.loaders.entryLoader.loadMany(value.map((ref) => ({ id: ref._ref, preview: ctx.preview })));
    }

    return value;
  };
```

#### Resolver Router

```typescript
// packages/graphql-cms-core/src/resolvers/index.ts

import contentfulFieldResolver from './contentful/fieldResolver';
import sanityFieldResolver from './sanity/fieldResolver';

export const getFieldResolver = (cms: 'Contentful' | 'Sanity') => {
  return cms === 'Sanity' ? sanityFieldResolver : contentfulFieldResolver;
};
```

**Estimated Hours:** 8-12

---

### Phase 4: GraphQL Schema Generation

For Sanity, schema generation is simplified to **placeholder types only**. No field mapping is done - fields are added by consumers through typedef extensions.

#### Current Flow (to be replaced for Sanity)

```
Sanity Schema Types
        │
        ▼
mapSanityTypesToContentfulTypes()  ◄── This goes away
        │
        ▼
ContentType[] (Contentful format)
        │
        ▼
generateContentfulSchema()  ◄── Full field mapping
        │
        ▼
GraphQL Schema with all fields
```

#### New Flow for Sanity (Simplified)

```
Sanity Schema Types (native)
        │
        ▼
generateSanitySchema()  ◄── Placeholder types only
        │
        ▼
GraphQL Schema (stubs)
        │
        ▼
Consumer typedef extensions  ◄── Fields added here
        │
        ▼
Complete GraphQL Schema
```

#### New Sanity Schema Generator

**File:** `packages/graphql-schema-gen/src/fetchers/sanity.ts` (new)

Generates placeholder types for documents and objects - no field mapping:

```typescript
// packages/graphql-schema-gen/src/fetchers/sanity.ts

import type { SchemaType } from '@sanity/types';
import { upperFirst } from 'lodash';

// Base fields all Content types get
const baseContentFields = `
  id: String
  sidekickLookup: JSON
  theme: [Theme]
  animation: JSON
  variant: String
`;

// Additional fields for page types
const basePageFields = `
  slug: String
  lr__path__: String
`;

const isPage = (schemaType: SchemaType): boolean => {
  return schemaType.fields?.some((f) => f.name === 'slug') ?? false;
};

export const generateSanitySchema = (typeMappings: Record<string, string>, schemaTypes: SchemaType[]): string => {
  // Filter to document types only (not system types)
  const documentTypes = schemaTypes.filter((t) => t.type === 'document' && !t.name.startsWith('sanity.'));

  // Filter to object types (for nested objects)
  const objectTypes = schemaTypes.filter((t) => t.type === 'object' && !t.name.startsWith('sanity.'));

  const generateDocumentType = (schemaType: SchemaType): string => {
    const typeName = typeMappings[schemaType.name] ?? upperFirst(schemaType.name);
    const isPageType = isPage(schemaType);

    return `
type ${typeName} implements Content {
${baseContentFields}${isPageType ? basePageFields : ''}
}`;
  };

  const generateObjectType = (schemaType: SchemaType): string => {
    const typeName = typeMappings[schemaType.name] ?? upperFirst(schemaType.name);

    // Object types are simple stubs - fields added via extensions
    return `
type ${typeName} {
  _key: String
}`;
  };

  const documentTypeDefs = documentTypes.map(generateDocumentType).join('\n');
  const objectTypeDefs = objectTypes.map(generateObjectType).join('\n');

  return `
${documentTypeDefs}
${objectTypeDefs}
`;
};
```

#### Update Fetchers Index

**File:** `packages/graphql-schema-gen/src/fetchers/index.ts`

```typescript
import { generateContentfulSchema } from './contentful';
import { generateSanitySchema } from './sanity';
import type { SchemaType } from '@sanity/types';
import type { ContentType } from '@last-rev/types';

export const fetchers = async (
  source: 'Contentful' | 'Sanity',
  typeMappings: Record<string, string>,
  schemaTypes: ContentType[] | SchemaType[],
  skipReferenceFields: boolean // Ignored for Sanity
): Promise<DocumentNode> => {
  let gqlStatements: string;

  if (source === 'Sanity') {
    // Sanity: placeholder types only, no field mapping
    gqlStatements = generateSanitySchema(typeMappings, schemaTypes as SchemaType[]);
  } else {
    // Contentful: full field mapping (unchanged)
    gqlStatements = generateContentfulSchema(typeMappings, schemaTypes as ContentType[], skipReferenceFields);
  }

  return gql`
    ${gqlStatements}
  `;
};
```

#### Consumer Usage: Typedef Extensions

Consumers add fields via GraphQL typedef extensions:

```typescript
// In consumer's graphql extensions
const typeDefs = gql`
  extend type Page {
    title: String
    hero: Content
    sections: [Content]
    seo: Seo
  }

  extend type BlogPost {
    title: String
    author: Author
    body: RichText
    publishDate: Date
  }

  extend type Author {
    name: String
    bio: String
    avatar: Media
  }
`;
```

#### Key Differences from Contentful

| Aspect                  | Contentful                 | Sanity                |
| ----------------------- | -------------------------- | --------------------- |
| **Field Generation**    | Auto-generated from schema | None - via extensions |
| **Schema Complexity**   | Full field mapping         | Placeholder stubs     |
| **Consumer Effort**     | Minimal                    | Must define fields    |
| **Flexibility**         | Schema-driven              | Extension-driven      |
| **skipReferenceFields** | Used                       | Ignored               |

#### Benefits of This Approach

1. **Simpler schema gen code** - No field type mapping needed
2. **Consumer control** - Full control over GraphQL field names and types
3. **No type conversion** - Native Sanity types used throughout
4. **Decoupled** - Schema gen doesn't need to understand Sanity field types
5. **Flexible** - Consumers can expose only fields they need

**Estimated Hours:** 1-2

---

### Phase 5: Deprecate/Remove sanity-mapper

The `sanity-mapper` package becomes unnecessary. Options:

1. **Remove entirely** in this major version
2. **Deprecate** and keep for one version cycle
3. **Repurpose** for schema utilities only (keep `mapSanityTypesToContentfulTypes` if needed)

**Recommended:** Keep only schema utilities, remove document conversion.

**Estimated Hours:** 1-2

---

### Phase 6: Path Utilities Update

**File:** `packages/cms-path-util/src/PathUpdater.ts`

Update field access to handle both CMS types:

```typescript
const getFieldValue = (item: any, fieldName: string, locale: string, cms: string): any => {
  if (cms === 'Sanity') {
    const value = item[fieldName];
    // Internationalized array
    if (Array.isArray(value) && value[0]?._key) {
      return value.find((v) => v._key === locale)?.value ?? value[0]?.value;
    }
    // Slug
    if (value?._type === 'slug') return value.current;
    return value;
  }

  // Contentful
  return item.fields?.[fieldName]?.[locale];
};
```

**Estimated Hours:** 2-3

---

### Phase 7: Webhook Handlers Update

Both `sanity-webhook-parser` and `cms-webhook-handler` currently depend on `convertSanityDoc` and the old i18n GROQ query patterns.

#### Current Issues

**File:** `packages/sanity-webhook-parser/src/index.ts`

```typescript
// Line 3: imports convertSanityDoc
import { convertSanityDoc } from '@last-rev/sanity-mapper';

// Line 70: converts the body (unnecessary with native approach)
convertSanityDoc(body, defaultLocale, locales);
```

**File:** `packages/cms-webhook-handler/src/index.ts`

```typescript
// Line 12: imports convertSanityDoc
import { convertSanityDoc } from '@last-rev/sanity-mapper';

// Lines 58-72: Uses old GROQ with _translations joins
doc = await client.fetch(
  `*[_id == $id && (!defined(__i18n_lang) || __i18n_lang == $defaultLocale)]{
    ...,
    "_translations": *[
      _type == "translation.metadata" &&
      references(^._id)
    ].translations[]{
      "doc": value->{
        ...
      }
    }[doc.__i18n_lang != $defaultLocale && defined(doc)]
  }`,
  { id: itemId, defaultLocale }
);
return convertSanityDoc(doc, defaultLocale, locales);

// Lines 189-194: Converts webhook body
data = config.cms === 'Sanity'
  ? convertSanityDoc(body, ...)
  : body;
```

#### Required Changes

**sanity-webhook-parser:**

```typescript
// Remove convertSanityDoc import and call
// The webhook body is already a native Sanity document

const parseWebhook = (config: LastRevAppConfig, body: any, headers: WebhookHeaders): WebhookParserResult => {
  const operation = headers['sanity-operation'];

  let action: 'update' | 'delete' = operation === 'delete' ? 'delete' : 'update';

  // Type detection unchanged
  let type: 'Entry' | 'Asset' | 'ContentType' = 'Entry';
  if (body?._type === 'sanity.imageAsset' || body?._type === 'sanity.fileAsset') {
    type = 'Asset';
  }

  // Rest remains the same - no conversion needed
  return { action, contentStates, type, env, itemId, isTruncated };
};
```

**cms-webhook-handler - getData function:**

```typescript
const getData = async (config, type, env, itemId) => {
  if (config.cms === 'Sanity') {
    const client = createSanityClient({
      projectId: config.sanity.projectId,
      dataset: env,
      apiVersion: '2024-03-18'
    });

    // Simple query - no translation joins
    const doc = await client.fetch(`*[_id == $id][0]`, { id: itemId });
    return doc; // Return native, no conversion
  }
  // Contentful path unchanged
};
```

**cms-webhook-handler - handleWebhook function:**

```typescript
// Remove convertSanityDoc calls
// For Sanity, pass body directly (it's already native)
data = isTruncated && action !== 'delete' ? await getData(config, type, env, itemId) : body; // Native Sanity document, no conversion
```

#### Handler Types Update

The handlers in `cms-webhook-handler/src/handlers.ts` expect `BaseEntry` and `BaseAsset` (Contentful types). For native Sanity:

```typescript
// Update ProcessCommand to accept either type
export type ProcessCommand<T> = {
  isPreview: boolean;
  action: 'update' | 'delete';
  data: T; // Can be BaseEntry | SanityDocument | BaseAsset | SanityImageAsset
};

// Handler implementations need CMS-aware logic
export const createHandlers = (config: LastRevAppConfig) => {
  const isSanity = config.cms === 'Sanity';

  return {
    entry: async (command: ProcessCommand<BaseEntry | SanityDocument>) => {
      const id = isSanity ? (command.data as SanityDocument)._id : (command.data as BaseEntry).sys.id;
      // Cache invalidation logic...
    },
    asset: async (command: ProcessCommand<BaseAsset | SanityImageAsset>) => {
      // Similar CMS-aware logic
    }
    // ...
  };
};
```

**Estimated Hours:** 2-3

---

### Phase 7b: CMS Sync to Filesystem Update

The `cms-sync-to-fs` package syncs all Sanity content to the local filesystem. It also uses `convertSanityDoc` and the old i18n GROQ pattern.

#### Current Issues

**File:** `packages/cms-sync-to-fs/src/sanitySync.ts`

```typescript
// Line 22: imports both conversion functions
import { mapSanityTypesToContentfulTypes, convertSanityDoc } from '@last-rev/sanity-mapper';

// Lines 42-53: Old GROQ query with _translations joins
const query = `*[_type == $contentTypeId && (!defined(__i18n_lang) || __i18n_lang == $defaultLocale)]{
  ...,
  "_translations": *[
    _type == "translation.metadata" &&
    references(^._id)
  ].translations[]{
    "doc": value->{
      ...
    }
  }[doc.__i18n_lang != $defaultLocale && defined(doc)]
}`;

// Line 62: Converts all entries
const items = entries.map((entry: any) => convertSanityDoc(entry, defaultLocale, locales));

// Lines 78-91: Same old GROQ pattern for assets
const query = `*[_type in ['sanity.imageAsset', 'sanity.fileAsset'] && (!defined(__i18n_lang) || __i18n_lang == $defaultLocale)]{
  ...,
  "_translations": *[...]
}`;

// Line 99: Converts all assets
const items = assets.map((asset: any) => convertSanityDoc(asset, defaultLocale, locales));

// Line 146: Uses schema type converter
const contentTypes = mapSanityTypesToContentfulTypes(config.sanity.schemaTypes);
```

#### Required Changes

**Simplified GROQ queries:**

```typescript
// Entry sync - no translation joins
const syncAllEntriesForSchemaType = async (
  client: SanityClient,
  contentTypeId: string,
  config: LastRevAppConfig,
  syncToken?: string
): Promise<SanitySyncCollection> => {
  const query = `*[_type == $contentTypeId${syncToken ? ' && _updatedAt > $syncToken' : ''}]`;
  const entries = await client.fetch(query, { contentTypeId, ...(syncToken && { syncToken }) });

  // Return native documents, no conversion
  return {
    syncToken: new Date().toISOString(),
    items: entries // Native Sanity documents
  };
};

// Asset sync - no translation joins
const syncAllAssets = async (
  client: SanityClient,
  config: LastRevAppConfig,
  syncToken?: string
): Promise<SanitySyncCollection> => {
  const query = `*[_type in ['sanity.imageAsset', 'sanity.fileAsset']${
    syncToken ? ' && _updatedAt > $syncToken' : ''
  }]`;
  const assets = await client.fetch(query, { ...(syncToken && { syncToken }) });

  // Return native documents, no conversion
  return {
    syncToken: new Date().toISOString(),
    items: assets // Native Sanity assets
  };
};
```

**Schema type handling:**

```typescript
// Remove mapSanityTypesToContentfulTypes
// Use native Sanity schema types directly
const contentTypes = config.sanity.schemaTypes; // Already SchemaType[]
```

**Estimated Hours:** 1-2

---

### Phase 8: Testing & Migration

- Unit tests for new Sanity resolvers
- Integration tests for GROQ queries
- E2E tests for GraphQL responses
- Migration script for existing Sanity schemas (optional tooling)

**Estimated Hours:** 6-8

---

## Summary: Estimated Developer Hours

| Phase     | Description                                   | Hours           |
| --------- | --------------------------------------------- | --------------- |
| Phase 1   | Types package updates                         | 2-3             |
| Phase 2   | Sanity loader rewrite                         | 4-6             |
| Phase 3   | GraphQL resolvers restructure                 | 6-10            |
| Phase 4   | GraphQL schema generation (placeholders only) | 1-2             |
| Phase 5   | Deprecate sanity-mapper                       | 1-2             |
| Phase 6   | Path utilities update                         | 2-3             |
| Phase 7   | Webhook handlers update                       | 2-3             |
| Phase 7b  | CMS sync-to-fs update                         | 1-2             |
| Phase 8   | Testing & migration                           | 6-8             |
|           |                                               |                 |
| **Total** |                                               | **25-39 hours** |

### Timeline

For 4-6 hours/day:

- **1 developer:** 4-10 days

---

## Breaking Changes

### For Library Consumers (Sanity Users)

1. **Document structure changes** - Content returned as native Sanity format
2. **Field access patterns** - Use Sanity conventions, not Contentful
3. **i18n migration required** - Must update Sanity Studio to use `sanity-plugin-internationalized-array`
4. **Reference format** - `{ _ref: '...' }` not `{ sys: { id: '...' } }`

### For Contentful Users

**No changes** - Contentful path remains identical.

### Semantic Versioning

- Bump `sanity-cms-loader` to next major version (e.g., 0.2.x → 1.0.0)
- Bump `graphql-cms-core` to next major version
- Bump `graphql-schema-gen` to next major version
- Bump `sanity-webhook-parser` to next major version
- Bump `cms-webhook-handler` to next major version
- Keep old major versions available for existing consumers

---

## Migration Guide for Consumers

### 1. Update Sanity Studio

Install and configure `sanity-plugin-internationalized-array`:

```bash
npm install sanity-plugin-internationalized-array
```

Update schema fields to use internationalized arrays:

```typescript
// Before
defineField({
  name: 'title',
  type: 'string'
});

// After
defineField({
  name: 'title',
  type: 'internationalizedArrayString'
});
```

### 2. Migrate Existing Content

Run migration to convert document-based translations to field-level arrays.

### 3. Update Application Code

If directly accessing content fields, update patterns:

```typescript
// Before (Contentful-style)
const title = content.fields.title[locale];

// After (Sanity native)
const title = content.title.find((t) => t._key === locale)?.value;
```

### 4. Update Dependencies

```bash
npm install @last-rev/sanity-cms-loader@^1.0.0
npm install @last-rev/graphql-cms-core@^1.0.0
```

---

## Appendix: File Changes Summary

### Files to Create

- `packages/graphql-cms-core/src/resolvers/sanity/fieldResolver.ts`
- `packages/graphql-cms-core/src/resolvers/sanity/createResolvers.ts`
- `packages/graphql-cms-core/src/utils/sanity/getLocalizedField.ts`
- `packages/graphql-schema-gen/src/fetchers/sanity.ts`

### Files to Significantly Modify

- `packages/types/index.d.ts` - Add Sanity type exports
- `packages/sanity-cms-loader/src/index.ts` - Complete rewrite, simplified GROQ
- `packages/graphql-cms-core/src/resolvers/index.ts` - Add CMS routing
- `packages/graphql-schema-gen/src/fetchers/index.ts` - Route to Sanity schema generator
- `packages/graphql-schema-gen/src/types.ts` - Accept Sanity SchemaType[]
- `packages/cms-path-util/src/PathUpdater.ts` - CMS-aware field access
- `packages/sanity-webhook-parser/src/index.ts` - Remove convertSanityDoc dependency
- `packages/cms-webhook-handler/src/index.ts` - Remove convertSanityDoc, simplify GROQ, CMS-aware handlers
- `packages/cms-sync-to-fs/src/sanitySync.ts` - Remove convertSanityDoc, simplify GROQ queries

### Files to Deprecate/Remove

- `packages/sanity-mapper/src/index.ts` - Remove `convertSanityDoc`, `mapSanityValueToContentful`
- `packages/sanity-mapper/src/richTextHelpers.ts` - Optional, keep if converting PT to Contentful RT

### Files Unchanged

- All Contentful packages
- All cache layer packages
- Infrastructure packages

---

## Conclusion

This architectural change significantly simplifies the Sanity integration:

- **Simpler GROQ queries** - No translation joins
- **No conversion overhead** - Documents stay native
- **Cleaner separation** - CMS-specific code paths
- **Modern i18n** - Field-level localization

**Total Estimated Effort: 25-39 developer hours (4-10 days for 1 developer)**

**Note: This does not include changes to consumers of the library. It is expected that consumers will need to update their code (mostly graphql extensions) to use the new Sanity native architecture. This is not included in the estimated effort.**
