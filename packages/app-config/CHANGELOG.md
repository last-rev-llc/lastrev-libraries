# @last-rev/app-config

## 0.4.0

### Minor Changes

- bc28135: separated out content and caching strategies in order to support no cache

## 0.3.1

### Patch Changes

- 0639f30: adding queries to allow for more fine grained sitemap construction/generation

## 0.3.0

### Minor Changes

- c62ce9d: added paths config

## 0.2.3

### Patch Changes

- 3d8437c: Add syncLimit configuration

## 0.2.2

### Patch Changes

- f7e1181: Added TTLs to Redis calls

## 0.2.1

### Patch Changes

- 3ba98cd: Bump testing-library version

## 0.2.0

### Minor Changes

- f7e8fa4: Added maxBatchSize as options for redis and contentful. Allowed all ioredis options to be used.

## 0.1.5

### Patch Changes

- d6ec293: Added Algolia integration, cleaned up logs

## 0.1.4

### Patch Changes

- b3c20e0: Update to latest rollup-config

## 0.1.3

### Patch Changes

- 0921992: Update PathUtil and Contentful Webhook handlers to use Dynamodb strategy
- 0921992: Updated app-config to allow for dynamodb strategy

## 0.1.2

### Patch Changes

- aafeb14: Added a new app config setting skipReferenceFields, to allow schema generation to use the default Content interface for those

## 0.1.1

### Patch Changes

- 5ee84d6: Moved App Config to its own package, created contentful-path-util, and created contentful-webhook-handler
