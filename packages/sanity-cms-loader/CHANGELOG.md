# @last-rev/sanity-cms-loader

## 0.3.0

### Minor Changes

- 4a3d88c: Major update to Sanity path for libraries. Sanity object structure will now be preserved instead of mapping to Contentful objects.

### Patch Changes

- @last-rev/logging@0.2.1

## 0.2.2

### Patch Changes

- Updated dependencies [ef969ba]
  - @last-rev/sanity-mapper@0.2.2

## 0.2.1

### Patch Changes

- Updated dependencies [6dbe9f4]
  - @last-rev/sanity-mapper@0.2.1

## 0.2.0

### Minor Changes

- 5a8c889: Added support for Sanity, renamed some packages, added more test coverage, switched to PNPM

### Patch Changes

- Updated dependencies [5a8c889]
  - @last-rev/sanity-mapper@0.2.0
  - @last-rev/logging@0.2.0
  - @last-rev/timer@0.3.0

## 0.5.0

### Minor Changes

- 6c0dc760: Updated packages with vulnerabilities to the safest

## 0.4.3

### Patch Changes

- 69551c0: Updated @last-rev/logging package

## 0.4.2

### Patch Changes

- e7fb567: Fixed a bug iin the refby loader

## 0.4.1

### Patch Changes

- 86a8923: 'Switched to winston logger and added a remote datadog transport'
- Updated dependencies [86a8923]
  - @last-rev/logging@0.1.1
  - @last-rev/timer@0.2.0

## 0.4.0

### Minor Changes

- a996010: Added a new entryByFieldBValue loader
- a996010: Added contentful path rules engine and support for it in various packages

## 0.3.0

### Minor Changes

- fc0aab6: Added a new entryByFieldBValue loader

## 0.2.2

### Patch Changes

- 3ba98cd: Bump testing-library version
- Updated dependencies [3ba98cd]
  - @last-rev/timer@0.1.3

## 0.2.1

### Patch Changes

- f7e8fa4: Fixed some issues with redis and cms loading. chunking some requests.

## 0.2.0

### Minor Changes

- 25375f1: Added resolveLinks:false to all contentful createClient calls in the framework

## 0.1.7

### Patch Changes

- dd98970: Fixed an error where invalid contentful queries were leading to failed webhook update

## 0.1.6

### Patch Changes

- d6ec293: Added Algolia integration, cleaned up logs

## 0.1.5

### Patch Changes

- b3c20e0: Update to latest rollup-config
- Updated dependencies [b3c20e0]
  - @last-rev/timer@0.1.2

## 0.1.4

### Patch Changes

- d88df66: Added cacheKeyFn to all loaders to fix caching issues

## 0.1.3

### Patch Changes

- 5ee84d6: Moved App Config to its own package, created contentful-path-util, and created contentful-webhook-handler

## 0.1.2

### Patch Changes

- 7b9d6a1: Added Redis Cache loader, and cleaned up dependencies
- Updated dependencies [7b9d6a1]
  - @last-rev/timer@0.1.1

## 0.1.1

### Patch Changes

- 6e8e402: Moved preview boolean into graphql queries
