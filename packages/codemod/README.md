# @last-rev/sanity-codemod

A codemod tool to migrate Sanity applications from old APIs to new document-based APIs.

## Installation

```bash
npm install -g @last-rev/sanity-codemod
# or
npx @last-rev/sanity-codemod ./src
```

## Usage

### Interactive Mode

Run the codemod interactively to select which migrations to apply:

```bash
sanity-codemod ./src
```

### Dry Run Mode

Preview changes without modifying files:

```bash
sanity-codemod ./src --dry-run
```

### Options

```
Usage: sanity-codemod [options] <target-dir>

Options:
  -V, --version          output the version number
  -d, --dry-run          Preview changes without writing files
  -v, --verbose          Show detailed output
  --loader-api           Apply loader API changes
  --type-changes         Apply type changes
  --directory-keys       Apply directory/key constant changes
  --remove-mapper        Remove sanity-mapper usage
  --i18n                 Apply i18n migration
  --groq                 Transform GROQ queries
  --config               Update configuration files
  --all                  Apply all transforms
  -h, --help             display help for command
```

## Migrations

### 1. Loader API Changes

Transforms loader API calls from the old entry-based naming to the new document-based naming.

| Old Pattern                              | New Pattern                                    |
| ---------------------------------------- | ---------------------------------------------- |
| `ctx.loaders.entryLoader`                | `ctx.sanityLoaders.documentLoader`             |
| `ctx.loaders.assetLoader`                | `ctx.sanityLoaders.documentLoader`             |
| `ctx.loaders.entriesByContentTypeLoader` | `ctx.sanityLoaders.documentsByTypeLoader`      |
| `ctx.loaders.entryByFieldValueLoader`    | `ctx.sanityLoaders.documentByFieldValueLoader` |
| `ctx.loaders.entriesRefByLoader`         | `ctx.sanityLoaders.documentsRefByLoader`       |

```typescript
// Before
const entry = await ctx.loaders.entryLoader.load({ id, preview });
const entries = await ctx.loaders.entriesByContentTypeLoader.load({ contentType: 'page', preview });

// After
const doc = await ctx.sanityLoaders.documentLoader.load({ id, preview });
const docs = await ctx.sanityLoaders.documentsByTypeLoader.load({ contentType: 'page', preview });
```

### 2. Type Changes

Updates type imports and annotations from Contentful-style to Sanity-style.

| Old Type            | New Type         |
| ------------------- | ---------------- |
| `Entry`             | `SanityDocument` |
| `BaseEntry`         | `SanityDocument` |
| `Asset`             | `SanityDocument` |
| `BaseAsset`         | `SanityDocument` |
| `ContentfulLoaders` | `SanityLoaders`  |
| `CmsLoaders`        | `SanityLoaders`  |

```typescript
// Before
import { Entry, ContentfulLoaders } from '@last-rev/types';
const doc: Entry<PageFields>;

// After
import { SanityDocument, SanityLoaders } from '@last-rev/types';
const doc: SanityDocument;
```

### 3. Directory/Key Constants

Updates directory paths and Redis key constants.

| Old                           | New                      |
| ----------------------------- | ------------------------ |
| `'entries'`                   | `'documents'`            |
| `'assets'`                    | `'documents'`            |
| `'entry_ids_by_content_type'` | `'document_ids_by_type'` |

### 4. Remove Sanity Mapper

Removes usage of `@last-rev/sanity-mapper` since documents should now stay in native Sanity format.

```typescript
// Before
import { convertSanityDoc, mapSanityTypesToContentfulTypes } from '@last-rev/sanity-mapper';

const sanityDoc = await fetchDocument(id);
const entry = convertSanityDoc(sanityDoc);

// After
const doc = await fetchDocument(id);
// Use doc directly - native Sanity format
```

### 5. I18n Migration

Transforms document-level i18n patterns to field-level patterns.

```typescript
// Before (document-level)
const title = doc.__i18n_lang === locale ? doc.title : null;
const translations = doc._translations;

// After (field-level)
const title = getLocalizedField(doc, 'title', ctx);
// _translations removed - use i18n arrays via getLocalizedField
```

### 6. GROQ Query Transformation

Removes document-level i18n patterns from GROQ queries.

```groq
// Before
*[_type == "page" && __i18n_lang == $locale]
*[_type == "page"]{..., _translations[]->{...}}

// After
*[_type == "page"]
*[_type == "page"]
// Note: Field-level i18n now handled via getLocalizedField
```

### 7. Config Migration

Updates configuration files to add new Sanity-specific options.

```typescript
// Before
export const config = {
  cms: 'Sanity',
  sanity: { projectId: '...' }
};

// After
export const config = {
  cms: 'Sanity',
  sanity: {
    projectId: '...',
    useInternationalizedArrays: true,
    fallbackToDefaultLocale: false
  }
};
```

## Migration Report

After running the codemod, a migration report is generated at `sanity-migration-report.md` in your target directory containing:

- Summary of changes made
- List of files modified
- Files that need manual review
- Any errors encountered

## Manual Review

Some patterns may require manual review after migration:

- Complex GROQ queries with nested i18n patterns
- Custom loader implementations
- Files with both old and new patterns

Files flagged for manual review will contain `TODO:` or `WARNING:` comments.

## Examples

### Full Migration

```bash
# Run all migrations interactively
sanity-codemod ./src

# Run all migrations non-interactively
sanity-codemod ./src --all

# Dry run first
sanity-codemod ./src --all --dry-run
```

### Selective Migration

```bash
# Only apply loader and type changes
sanity-codemod ./src --loader-api --type-changes

# Only transform GROQ queries
sanity-codemod ./src --groq
```

## Supported File Types

- TypeScript (.ts, .tsx)
- JavaScript (.js, .jsx)
- GROQ query files (.groq)
- Configuration files (.json, .yaml, .yml)

## License

ISC
