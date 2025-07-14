# @last-rev/graphql-contentful-helpers

## 0.2.1

### Patch Changes

- Updated dependencies [6dbe9f4]
  - @last-rev/cms-path-util@0.2.1
  - @last-rev/sanity-cms-loader@0.2.1

## 0.2.0

### Minor Changes

- 5a8c889: Added support for Sanity, renamed some packages, added more test coverage, switched to PNPM

### Patch Changes

- Updated dependencies [5a8c889]
  - @last-rev/cms-path-rules-engine@0.2.0
  - @last-rev/contentful-cms-loader@0.6.0
  - @last-rev/cms-dynamodb-loader@0.2.0
  - @last-rev/sanity-cms-loader@0.2.0
  - @last-rev/cms-redis-loader@0.2.0
  - @last-rev/testing-library@0.2.0
  - @last-rev/cms-fs-loader@0.2.0
  - @last-rev/cms-path-util@0.2.0
  - @last-rev/app-config@0.6.0
  - @last-rev/timer@0.3.0
  - @last-rev/types@0.5.0

## 0.5.0

### Minor Changes

- 6c0dc760: Updated packages with vulnerabilities to the safest

### Patch Changes

- Updated dependencies [6c0dc760]
  - @last-rev/contentful-cms-loader@0.5.0
  - @last-rev/contentful-dynamodb-loader@0.4.0
  - @last-rev/contentful-fs-loader@0.4.0
  - @last-rev/contentful-path-rules-engine@0.2.0
  - @last-rev/contentful-path-util@0.2.0
  - @last-rev/contentful-redis-loader@0.6.0
  - @last-rev/types@0.4.0

## 0.4.7

### Patch Changes

- 6d0abb0: 'Updated app config to use feature flag for enablePathsV2'
- Updated dependencies [6d0abb0]
- Updated dependencies [6d0abb0]
- Updated dependencies [6d0abb0]
  - @last-rev/contentful-path-rules-engine@0.1.5
  - @last-rev/types@0.3.6
  - @last-rev/app-config@0.5.0
  - @last-rev/contentful-path-util@0.1.22

## 0.4.6

### Patch Changes

- c56decc: Supporting overriding the environment on graphql queries and webhook updates
- Updated dependencies [c56decc]
  - @last-rev/contentful-path-util@0.1.21
  - @last-rev/types@0.3.5

## 0.4.5

### Patch Changes

- Updated dependencies [86a8923]
  - @last-rev/app-config@0.4.5
  - @last-rev/contentful-cms-loader@0.4.1
  - @last-rev/contentful-dynamodb-loader@0.3.1
  - @last-rev/contentful-fs-loader@0.3.1
  - @last-rev/contentful-path-rules-engine@0.1.4
  - @last-rev/contentful-path-util@0.1.20
  - @last-rev/contentful-redis-loader@0.5.3
  - @last-rev/timer@0.2.0

## 0.4.4

### Patch Changes

- 165fc90: Updated apollo server to v4, enable configuration through LR config
- 165fc90: Update dependencies
- Updated dependencies [165fc90]
- Updated dependencies [165fc90]
  - @last-rev/app-config@0.4.4
  - @last-rev/types@0.3.3
  - @last-rev/contentful-path-util@0.1.19

## 0.4.3

### Patch Changes

- bc28135: separated out content and caching strategies in order to support no cache
- Updated dependencies [bc28135]
  - @last-rev/app-config@0.4.0

## 0.4.2

### Patch Changes

- c62ce9d: allow for dynamic or static path generation with old or new path engine
- Updated dependencies [c62ce9d]
- Updated dependencies [c62ce9d]
- Updated dependencies [c62ce9d]
  - @last-rev/app-config@0.3.0
  - @last-rev/types@0.3.2
  - @last-rev/contentful-path-rules-engine@0.1.2

## 0.4.1

### Patch Changes

- 9078801: 'fixed issue with parsing env for vercelHandler'

## 0.4.0

### Minor Changes

- a996010: Added a new entryByFieldBValue loader
- a996010: Added contentful path rules engine and support for it in various packages

### Patch Changes

- Updated dependencies [a996010]
- Updated dependencies [a996010]
  - @last-rev/contentful-cms-loader@0.4.0
  - @last-rev/contentful-dynamodb-loader@0.3.0
  - @last-rev/contentful-fs-loader@0.3.0
  - @last-rev/contentful-redis-loader@0.5.0
  - @last-rev/types@0.3.0

## 0.3.0

### Minor Changes

- fc0aab6: Added a new entryByFieldBValue loader

### Patch Changes

- Updated dependencies [fc0aab6]
  - @last-rev/contentful-cms-loader@0.3.0
  - @last-rev/contentful-dynamodb-loader@0.2.0
  - @last-rev/contentful-fs-loader@0.2.0
  - @last-rev/contentful-redis-loader@0.4.0
  - @last-rev/types@0.2.0

## 0.2.5

### Patch Changes

- 3ba98cd: Bump testing-library version
- Updated dependencies [3ba98cd]
  - @last-rev/app-config@0.2.1
  - @last-rev/contentful-cms-loader@0.2.2
  - @last-rev/contentful-dynamodb-loader@0.1.5
  - @last-rev/contentful-fs-loader@0.1.13
  - @last-rev/contentful-redis-loader@0.3.3
  - @last-rev/testing-library@0.1.10
  - @last-rev/timer@0.1.3

## 0.2.4

### Patch Changes

- d937c88: Moved context creation into function called on each request in gql servers/handlers

## 0.2.3

### Patch Changes

- Updated dependencies [f7e8fa4]
- Updated dependencies [f7e8fa4]
  - @last-rev/app-config@0.2.0
  - @last-rev/contentful-cms-loader@0.2.1
  - @last-rev/contentful-redis-loader@0.3.2

## 0.2.2

### Patch Changes

- Updated dependencies [71bf23b]
  - @last-rev/contentful-redis-loader@0.3.0

## 0.2.1

### Patch Changes

- Updated dependencies [1d7f33d]
  - @last-rev/contentful-redis-loader@0.2.0

## 0.2.0

### Minor Changes

- 25375f1: Added resolveLinks:false to all contentful createClient calls in the framework

### Patch Changes

- Updated dependencies [25375f1]
  - @last-rev/contentful-cms-loader@0.2.0

## 0.1.4

### Patch Changes

- 0921992: Added Dynamodb loaders to graphwl-contentful-helpers
- Updated dependencies [0921992]
- Updated dependencies [0921992]
  - @last-rev/app-config@0.1.3
  - @last-rev/types@0.1.4

## 0.1.3

### Patch Changes

- 1d0dbe0: Update dependencies

## 0.1.2

### Patch Changes

- 3d28069: Disable sidekickLookupResolver for mapper functions, Fix redis loader issues
- Updated dependencies [3d28069]
  - @last-rev/contentful-redis-loader@0.1.5

## 0.1.1

### Patch Changes

- 5ee84d6: Moved App Config to its own package, created contentful-path-util, and created contentful-webhook-handler
- Updated dependencies [5ee84d6]
  - @last-rev/app-config@0.1.1
  - @last-rev/contentful-cms-loader@0.1.3
  - @last-rev/contentful-fs-loader@0.1.8
  - @last-rev/contentful-redis-loader@0.1.3
  - @last-rev/types@0.1.2
