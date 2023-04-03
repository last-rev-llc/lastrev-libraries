# @last-rev/contentful-webhook-handler

## 0.4.15

### Patch Changes

- 9e8d80c: Updated to the latest aws sdk libraries
- Updated dependencies [9e8d80c]
  - @last-rev/contentful-path-util@0.1.23

## 0.4.14

### Patch Changes

- e0351a6: Added ability to use truncated payload in contentful webhook
- Updated dependencies [e0351a6]
  - @last-rev/contentful-webhook-parser@0.1.3

## 0.4.13

### Patch Changes

- c56decc: Supporting overriding the environment on graphql queries and webhook updates
- Updated dependencies [c56decc]
  - @last-rev/contentful-path-util@0.1.21
  - @last-rev/contentful-webhook-parser@0.1.2
  - @last-rev/graphql-contentful-helpers@0.4.6

## 0.4.12

### Patch Changes

- 86a8923: 'Switched to winston logger and added a remote datadog transport'
- Updated dependencies [86a8923]
  - @last-rev/contentful-path-util@0.1.20
  - @last-rev/graphql-contentful-helpers@0.4.5

## 0.4.11

### Patch Changes

- 4fc37b3: Added ability to add jwt signing for webhook verification

## 0.4.10

### Patch Changes

- bc28135: separated out content and caching strategies in order to support no cache
- Updated dependencies [bc28135]
  - @last-rev/contentful-path-util@0.1.17
  - @last-rev/graphql-contentful-helpers@0.4.3

## 0.4.9

### Patch Changes

- 53a8a57: Bump versions

## 0.4.8

### Patch Changes

- d302953: Bump versions

## 0.4.7

### Patch Changes

- 5abaed7: Bump version

## 0.4.6

### Patch Changes

- f7e1181: Added TTLs to Redis calls

## 0.4.5

### Patch Changes

- Updated dependencies [a996010]
- Updated dependencies [a996010]
  - @last-rev/graphql-contentful-helpers@0.4.0

## 0.4.4

### Patch Changes

- Updated dependencies [fc0aab6]
  - @last-rev/graphql-contentful-helpers@0.3.0

## 0.4.3

### Patch Changes

- 3ba98cd: Bump testing-library version
- Updated dependencies [3ba98cd]
  - @last-rev/contentful-path-util@0.1.11
  - @last-rev/contentful-webhook-parser@0.1.1
  - @last-rev/graphql-contentful-helpers@0.2.5

## 0.4.2

### Patch Changes

- d937c88: Using updated createContext function
- Updated dependencies [d937c88]
  - @last-rev/graphql-contentful-helpers@0.2.4

## 0.4.1

### Patch Changes

- f7e8fa4: After entry changes, deleting all entry ids by content type, as these will be immediately re-calculated upon path updating.
  - @last-rev/graphql-contentful-helpers@0.2.3

## 0.4.0

### Minor Changes

- 71bf23b: 'Updated version of ioredis to 5.x, added contentful type checking to redis loader and contentful webhook'

### Patch Changes

- Updated dependencies [71bf23b]
  - @last-rev/contentful-path-util@0.1.10
  - @last-rev/graphql-contentful-helpers@0.2.2

## 0.3.0

### Minor Changes

- 1d7f33d: Enhancing redis data with additional metadata for troubleshooting

### Patch Changes

- @last-rev/graphql-contentful-helpers@0.2.1

## 0.2.0

### Minor Changes

- 25375f1: Added resolveLinks:false to all contentful createClient calls in the framework

### Patch Changes

- Updated dependencies [25375f1]
  - @last-rev/graphql-contentful-helpers@0.2.0

## 0.1.12

### Patch Changes

- d6ec293: Added Algolia integration, cleaned up logs

## 0.1.11

### Patch Changes

- b3c20e0: Update to latest rollup-config
- Updated dependencies [b3c20e0]
  - @last-rev/contentful-path-util@0.1.9

## 0.1.10

### Patch Changes

- 67c704f: Fixed query in dynamodb webhook handler by adding locales: '\*', include: 0

## 0.1.9

### Patch Changes

- 5715727: Fixed a bug in dynamodb loader, removed AttributesToGet
- Updated dependencies [5715727]
  - @last-rev/contentful-path-util@0.1.6

## 0.1.8

### Patch Changes

- 0921992: Update PathUtil and Contentful Webhook handlers to use Dynamodb strategy
- Updated dependencies [0921992]
- Updated dependencies [0921992]
  - @last-rev/contentful-path-util@0.1.5
  - @last-rev/graphql-contentful-helpers@0.1.4

## 0.1.7

### Patch Changes

- 8b5534a: 'Deleting asset in webhook if it contains no URL'

## 0.1.6

### Patch Changes

- e2368a8: 'Rebuilding entry_ids_by_content_type from contentful each time an entry is updated'

## 0.1.5

### Patch Changes

- 76a7655: Fixed some bugs with async logic in path generation and redis loader
- Updated dependencies [76a7655]
  - @last-rev/contentful-path-util@0.1.3

## 0.1.4

### Patch Changes

- 3fd9301: fixed a bug in redis webhook

## 0.1.3

### Patch Changes

- 99a1ce7: Fix missing : in webhook handler

## 0.1.2

### Patch Changes

- 1d0dbe0: Update dependencies
- Updated dependencies [1d0dbe0]
  - @last-rev/graphql-contentful-helpers@0.1.3

## 0.1.1

### Patch Changes

- 5ee84d6: Moved App Config to its own package, created contentful-path-util, and created contentful-webhook-handler
- Updated dependencies [5ee84d6]
  - @last-rev/contentful-path-util@0.1.1
  - @last-rev/graphql-contentful-helpers@0.1.1
