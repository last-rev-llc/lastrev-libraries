# @last-rev/graphql-algolia-integration

## 0.5.0

### Minor Changes

- 5a8c889: Added support for Sanity, renamed some packages, added more test coverage, switched to PNPM

### Patch Changes

- Updated dependencies [5a8c889]
  - @last-rev/contentful-webhook-parser@0.3.0

## 0.4.1

### Patch Changes

- dbb51ef7: Fixed issue with algolia draft content
- 1478cd3d: Fix null value not being checked

## 0.4.0

### Minor Changes

- 9db7883b: Add batchSize option to Algolia replaceAllObjects method

## 0.3.0

### Minor Changes

- d23444ad: Stop Algolia sync if there is at least one error

## 0.2.0

### Minor Changes

- 6c0dc760: Updated packages with vulnerabilities to the safest

### Patch Changes

- Updated dependencies [6c0dc760]
  - @last-rev/contentful-webhook-parser@0.2.0

## 0.1.13

### Patch Changes

- aa93d0d: Fixed a bug where we were looping through locales and generating way too many lists of IDs

## 0.1.12

### Patch Changes

- 57c80cb: 'Added batching by IDs to algolia integration'

## 0.1.11

### Patch Changes

- 15d1995: bumped version of apollo client and switched to tsc compilation

## 0.1.10

### Patch Changes

- 6d0abb0: Updated tyeps to fix issues from apollo server update

## 0.1.9

### Patch Changes

- c56decc: Supporting overriding the environment on graphql queries and webhook updates
- Updated dependencies [c56decc]
  - @last-rev/contentful-webhook-parser@0.1.2

## 0.1.8

### Patch Changes

- 86a8923: 'Switched to winston logger and added a remote datadog transport'

## 0.1.7

### Patch Changes

- 6ea22ce: Extract all Redis client to file scope
- 6ea22ce: Split queries by content type to optimze size

## 0.1.6

### Patch Changes

- e2d81c1: Split queries by content type to optimze size

## 0.1.5

### Patch Changes

- 3ba98cd: Bump testing-library version
- Updated dependencies [3ba98cd]
  - @last-rev/contentful-webhook-parser@0.1.1

## 0.1.4

### Patch Changes

- 577773e: fixed a bug where second attempt to parse domainUrl from event fails in algolia function

## 0.1.3

### Patch Changes

- e305c7e: Removed some console log statements

## 0.1.2

### Patch Changes

- 9aa6c30: Parsing out the domainUrl from the request

## 0.1.1

### Patch Changes

- 508d135: Fixed type in algolia integration package json bin command
