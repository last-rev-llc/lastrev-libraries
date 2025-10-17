# @last-rev/contentful-sync-to-fs

## 0.2.4

### Patch Changes

- Updated dependencies [78d8909]
  - @last-rev/cms-path-util@0.2.2
  - @last-rev/graphql-cms-helpers@0.2.4
  - @last-rev/sanity-mapper@0.2.1

## 0.2.3

### Patch Changes

- @last-rev/graphql-cms-helpers@0.2.3

## 0.2.2

### Patch Changes

- @last-rev/graphql-cms-helpers@0.2.2

## 0.2.1

### Patch Changes

- Updated dependencies [6dbe9f4]
  - @last-rev/cms-path-util@0.2.1
  - @last-rev/sanity-mapper@0.2.1
  - @last-rev/graphql-cms-helpers@0.2.1

## 0.2.0

### Minor Changes

- 5a8c889: Added support for Sanity, renamed some packages, added more test coverage, switched to PNPM

### Patch Changes

- Updated dependencies [5a8c889]
  - @last-rev/graphql-cms-helpers@0.2.0
  - @last-rev/cms-path-util@0.2.0
  - @last-rev/sanity-mapper@0.2.0
  - @last-rev/logging@0.2.0
  - @last-rev/timer@0.3.0

## 0.4.0

### Minor Changes

- 6c0dc760: Updated packages with vulnerabilities to the safest

### Patch Changes

- Updated dependencies [6c0dc760]
  - @last-rev/contentful-path-util@0.2.0
  - @last-rev/graphql-contentful-helpers@0.5.0

## 0.3.11

### Patch Changes

- 69551c0: Updated @last-rev/logging package
- Updated dependencies [69551c0]
  - @last-rev/contentful-path-util@0.1.24

## 0.3.10

### Patch Changes

- 86a8923: 'Switched to winston logger and added a remote datadog transport'
- Updated dependencies [86a8923]
  - @last-rev/contentful-path-util@0.1.20
  - @last-rev/logging@0.1.1
  - @last-rev/timer@0.2.0
  - @last-rev/graphql-contentful-helpers@0.4.5

## 0.3.9

### Patch Changes

- 4f69103: bumped versions of dependencies

## 0.3.8

### Patch Changes

- 53a8a57: Bump versions

## 0.3.7

### Patch Changes

- d302953: Bump versions

## 0.3.6

### Patch Changes

- 5abaed7: Bump version

## 0.3.5

### Patch Changes

- 3d8437c: Add syncLimit configuration

## 0.3.4

### Patch Changes

- Updated dependencies [a996010]
- Updated dependencies [a996010]
  - @last-rev/graphql-contentful-helpers@0.4.0

## 0.3.3

### Patch Changes

- Updated dependencies [fc0aab6]
  - @last-rev/graphql-contentful-helpers@0.3.0

## 0.3.2

### Patch Changes

- 3ba98cd: Bump testing-library version
- Updated dependencies [3ba98cd]
  - @last-rev/contentful-path-util@0.1.11
  - @last-rev/graphql-contentful-helpers@0.2.5
  - @last-rev/timer@0.1.3

## 0.3.1

### Patch Changes

- d937c88: update sync-to-fs to not create loaders, since now it is done inside createContext
- Updated dependencies [d937c88]
  - @last-rev/graphql-contentful-helpers@0.2.4

## 0.3.0

### Minor Changes

- 93453e8: Add support for sync tokens

## 0.2.0

### Minor Changes

- 25375f1: Added resolveLinks:false to all contentful createClient calls in the framework

### Patch Changes

- Updated dependencies [25375f1]
  - @last-rev/graphql-contentful-helpers@0.2.0

## 0.1.11

### Patch Changes

- d6ec293: Added Algolia integration, cleaned up logs

## 0.1.10

### Patch Changes

- 274f803: Switched to use lodash/fp/flow instead of chain

## 0.1.9

### Patch Changes

- b3c20e0: Update to latest rollup-config
- Updated dependencies [b3c20e0]
  - @last-rev/contentful-path-util@0.1.9
  - @last-rev/timer@0.1.2

## 0.1.8

### Patch Changes

- fa99186: 'Parellelized sync entries and assets in sync-to-fs module'

## 0.1.7

### Patch Changes

- 1d0dbe0: Update dependencies
- Updated dependencies [1d0dbe0]
  - @last-rev/graphql-contentful-helpers@0.1.3

## 0.1.6

### Patch Changes

- 5ee84d6: Moved App Config to its own package, created contentful-path-util, and created contentful-webhook-handler
- Updated dependencies [5ee84d6]
  - @last-rev/contentful-path-util@0.1.1
  - @last-rev/graphql-contentful-helpers@0.1.1

## 0.1.5

### Patch Changes

- 7b9d6a1: Added Redis Cache loader, and cleaned up dependencies
- Updated dependencies [7b9d6a1]
  - @last-rev/timer@0.1.1

## 0.1.4

### Patch Changes

- 6e8e402: Moved preview boolean into graphql queries

## 0.1.3

### Patch Changes

- ccc1937: Changed the FS structure to support atomic files for lookups and contentTypes

## 0.1.2

### Patch Changes

- 840ef4a: Fixed dependencies

## 0.1.1

### Patch Changes

- fd9a8c6: allowing for config file for extensions. Added examples.
- 012b51f: created CLI to run cms sync
- 012b51f: Switched from pages to paths query, and implemented a path to ID lookup
