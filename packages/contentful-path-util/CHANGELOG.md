# @last-rev/contentful-path-util

## 0.1.23

### Patch Changes

- 9e8d80c: Updated to the latest aws sdk libraries

## 0.1.22

### Patch Changes

- 6d0abb0: 'Updated app config to use feature flag for enablePathsV2'
- Updated dependencies [6d0abb0]
- Updated dependencies [6d0abb0]
  - @last-rev/contentful-path-rules-engine@0.1.5
  - @last-rev/logging@0.1.2

## 0.1.21

### Patch Changes

- c56decc: Supporting overriding the environment on graphql queries and webhook updates

## 0.1.20

### Patch Changes

- 86a8923: 'Switched to winston logger and added a remote datadog transport'
- Updated dependencies [86a8923]
  - @last-rev/contentful-path-rules-engine@0.1.4
  - @last-rev/logging@0.1.1
  - @last-rev/timer@0.2.0

## 0.1.19

### Patch Changes

- 165fc90: Update dependencies

## 0.1.18

### Patch Changes

- 137e529: Added preview to the context used inside of the pathUpdater

## 0.1.17

### Patch Changes

- bc28135: separated out content and caching strategies in order to support no cache

## 0.1.16

### Patch Changes

- ee7f115: Remove console.log

## 0.1.15

### Patch Changes

- 1e7a4e5: HOTFIX: missing env keyprefix on PathStore

## 0.1.14

### Patch Changes

- 6ea22ce: Extract all Redis client to file scope

## 0.1.13

### Patch Changes

- b596435: Fixed an issue with pathUpdater where the wrong preview var was being used in the pathStore
- 0639f30: adding queries to allow for more fine grained sitemap construction/generation

## 0.1.12

### Patch Changes

- c62ce9d: Added method to iPathNode to return pathEntries
- Updated dependencies [c62ce9d]
  - @last-rev/contentful-path-rules-engine@0.1.2

## 0.1.11

### Patch Changes

- 3ba98cd: Bump testing-library version
- Updated dependencies [3ba98cd]
  - @last-rev/timer@0.1.3

## 0.1.10

### Patch Changes

- 71bf23b: 'Updated version of ioredis to 5.x, added contentful type checking to redis loader and contentful webhook'

## 0.1.9

### Patch Changes

- b3c20e0: Update to latest rollup-config
- Updated dependencies [b3c20e0]
  - @last-rev/timer@0.1.2

## 0.1.8

### Patch Changes

- 500ff83: Fixed a bug causing path tree to have inconsistent state across multiple calls made in quick succession
- aa834e5: Updated paths to return the correct format for next.js

## 0.1.7

### Patch Changes

- 66416e7: 'Added sitemap generation in graphql layer and a generator script for client use'

## 0.1.6

### Patch Changes

- 5715727: Fixed a bug in dynamodb loader, removed AttributesToGet

## 0.1.5

### Patch Changes

- 0921992: Update PathUtil and Contentful Webhook handlers to use Dynamodb strategy

## 0.1.4

### Patch Changes

- 25c153e: 'Fixed some bugs and cleaned up console logs'

## 0.1.3

### Patch Changes

- 76a7655: Fixed some bugs with async logic in path generation and redis loader

## 0.1.2

### Patch Changes

- 4286082: Normalize path in PathReader getNodeByPath

## 0.1.1

### Patch Changes

- 5ee84d6: Moved App Config to its own package, created contentful-path-util, and created contentful-webhook-handler
