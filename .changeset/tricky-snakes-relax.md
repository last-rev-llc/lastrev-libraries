---
'@last-rev/cms-redis-loader': patch
---

Fix Redis key prefix generation for Sanity CMS configurations

- Add proper support for Sanity CMS in Redis client creation
- Use correct projectId:dataset key prefix for Sanity instead of defaulting to Contentful format
- Prevents Redis entries from being created with incorrect "undefined:master" paths
- Maintains backward compatibility with existing Contentful configurations

Fixes DIL-24
