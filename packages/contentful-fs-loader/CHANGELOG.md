# @last-rev/contentful-fs-loader

## 0.3.2

### Patch Changes

- 69551c0: Updated @last-rev/logging package

## 0.3.1

### Patch Changes

- 86a8923: 'Switched to winston logger and added a remote datadog transport'
- Updated dependencies [86a8923]
  - @last-rev/logging@0.1.1
  - @last-rev/timer@0.2.0

## 0.3.0

### Minor Changes

- a996010: Added a new entryByFieldBValue loader
- a996010: Added contentful path rules engine and support for it in various packages

## 0.2.0

### Minor Changes

- fc0aab6: Added a new entryByFieldBValue loader

## 0.1.13

### Patch Changes

- 3ba98cd: Bump testing-library version
- Updated dependencies [3ba98cd]
  - @last-rev/timer@0.1.3

## 0.1.12

### Patch Changes

- d6ec293: Added Algolia integration, cleaned up logs

## 0.1.11

### Patch Changes

- b3c20e0: Update to latest rollup-config
- Updated dependencies [b3c20e0]
  - @last-rev/timer@0.1.2

## 0.1.10

### Patch Changes

- d88df66: Added cacheKeyFn to all loaders to fix caching issues

## 0.1.9

### Patch Changes

- 647fc84: Fix redis-loader

## 0.1.8

### Patch Changes

- 5ee84d6: Moved App Config to its own package, created contentful-path-util, and created contentful-webhook-handler

## 0.1.7

### Patch Changes

- 7b9d6a1: Added Redis Cache loader, and cleaned up dependencies
- Updated dependencies [7b9d6a1]
  - @last-rev/timer@0.1.1

## 0.1.6

### Patch Changes

- 6e8e402: Moved preview boolean into graphql queries

## 0.1.5

### Patch Changes

- 63176af: Added logging and timers, added a new cms data loader

## 0.1.4

### Patch Changes

- a09b949: Removed env vars from gql server, requiring all to be passed in

## 0.1.3

### Patch Changes

- ccc1937: Changed the FS structure to support atomic files for lookups and contentTypes

## 0.1.2

### Patch Changes

- 840ef4a: Fixed dependencies

## 0.1.1

### Patch Changes

- fd9a8c6: allowing for config file for extensions. Added examples.
- 012b51f: Switched from pages to paths query, and implemented a path to ID lookup
