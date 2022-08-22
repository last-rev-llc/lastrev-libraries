# @last-rev/contentful-redis-loader

## 0.5.1

### Patch Changes

- f7e1181: Added TTLs to Redis calls

## 0.5.0

### Minor Changes

- a996010: Added a new entryByFieldBValue loader
- a996010: Added contentful path rules engine and support for it in various packages

## 0.4.0

### Minor Changes

- fc0aab6: Added a new entryByFieldBValue loader

## 0.3.3

### Patch Changes

- 3ba98cd: Bump testing-library version
- Updated dependencies [3ba98cd]
  - @last-rev/timer@0.1.3

## 0.3.2

### Patch Changes

- f7e8fa4: Fixed some issues with redis and cms loading. chunking some requests.

## 0.3.1

### Patch Changes

- 48f3c48: Logging if parse fails

## 0.3.0

### Minor Changes

- 71bf23b: 'Updated version of ioredis to 5.x, added contentful type checking to redis loader and contentful webhook'

## 0.2.0

### Minor Changes

- 1d7f33d: Enhancing redis data with additional metadata for troubleshooting

## 0.1.10

### Patch Changes

- dd98970: Fixed an error where invalid contentful queries were leading to failed webhook update

## 0.1.9

### Patch Changes

- d6ec293: Added Algolia integration, cleaned up logs

## 0.1.8

### Patch Changes

- b3c20e0: Update to latest rollup-config
- Updated dependencies [b3c20e0]
  - @last-rev/timer@0.1.2

## 0.1.7

### Patch Changes

- d88df66: Added cacheKeyFn to all loaders to fix caching issues

## 0.1.6

### Patch Changes

- 76a7655: Fixed some bugs with async logic in path generation and redis loader

## 0.1.5

### Patch Changes

- 3d28069: Disable sidekickLookupResolver for mapper functions, Fix redis loader issues

## 0.1.4

### Patch Changes

- 647fc84: Fix redis-loader

## 0.1.3

### Patch Changes

- 5ee84d6: Moved App Config to its own package, created contentful-path-util, and created contentful-webhook-handler

## 0.1.2

### Patch Changes

- 3089d86: Added Fragement Generator to CLI
- 13c1d55: updated to use hash for content_types

## 0.1.1

### Patch Changes

- 7b9d6a1: Added Redis Cache loader, and cleaned up dependencies
- Updated dependencies [7b9d6a1]
  - @last-rev/timer@0.1.1
