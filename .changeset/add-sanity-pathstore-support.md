---
"@last-rev/cms-path-util": patch
"@last-rev/cms-webhook-handler": patch  
"@last-rev/sanity-mapper": patch
"@last-rev/sanity-webhook-parser": patch
---

Add Sanity support to PathStore and fix draft ID handling

Extends PathStore to support Sanity CMS alongside existing Contentful functionality with cache-based path resolution using Sanity project/dataset key patterns.

Fixes draft document ID inconsistency by ensuring all packages strip 'drafts.' prefix from document IDs for consistent handling between draft and published content across the entire Sanity integration pipeline.

This maintains backward compatibility with existing Contentful implementations while enabling full Sanity path resolution support.