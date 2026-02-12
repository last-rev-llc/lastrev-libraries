# @last-rev/sanity-webhook-parser

## 0.3.0

### Minor Changes

- 4a3d88c: Major update to Sanity path for libraries. Sanity object structure will now be preserved instead of mapping to Contentful objects.

## 0.2.1

### Patch Changes

- 6dbe9f4: Add Sanity support to PathStore and fix draft ID handling

  Extends PathStore to support Sanity CMS alongside existing Contentful functionality with cache-based path resolution using Sanity project/dataset key patterns.

  Fixes draft document ID inconsistency by ensuring all packages strip 'drafts.' prefix from document IDs for consistent handling between draft and published content across the entire Sanity integration pipeline.

  This maintains backward compatibility with existing Contentful implementations while enabling full Sanity path resolution support.

## 0.2.0

### Minor Changes

- 5a8c889: Added support for Sanity, renamed some packages, added more test coverage, switched to PNPM
