# @last-rev/contentful-cms-loader

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
