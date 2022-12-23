# @last-rev/graphql-contentful-core

## 0.5.11

### Patch Changes

- 37d706b: Fix Date scalar

## 0.5.10

### Patch Changes

- 165fc90: Updated apollo server to v4, enable configuration through LR config
- 165fc90: Update dependencies
- Updated dependencies [165fc90]
- Updated dependencies [165fc90]
  - @last-rev/app-config@0.4.4
  - @last-rev/graphql-contentful-helpers@0.4.4
  - @last-rev/types@0.3.3
  - @last-rev/graphql-schema-gen@0.2.2

## 0.5.9

### Patch Changes

- ddc6e6e: Moved Sidekick to a extension, disable core sidekick with a feature flag
- Updated dependencies [ddc6e6e]
  - @last-rev/app-config@0.4.3

## 0.5.8

### Patch Changes

- 3371479: Bring fetching logic into sitemap generator
- Updated dependencies [3371479]
  - @last-rev/app-config@0.4.1

## 0.5.7

### Patch Changes

- Updated dependencies [bc28135]
  - @last-rev/app-config@0.4.0
  - @last-rev/contentful-path-util@0.1.17
  - @last-rev/graphql-contentful-helpers@0.4.3

## 0.5.6

### Patch Changes

- dd724b8: Export more inner pieces, todo: move to contentful utils

## 0.5.5

### Patch Changes

- 53a8a57: Bump versions

## 0.5.4

### Patch Changes

- d302953: Bump versions

## 0.5.3

### Patch Changes

- 5abaed7: Bump version

## 0.5.2

### Patch Changes

- 0639f30: adding queries to allow for more fine grained sitemap construction/generation
- Updated dependencies [b596435]
- Updated dependencies [0639f30]
  - @last-rev/contentful-path-util@0.1.13
  - @last-rev/contentful-redis-loader@0.5.2
  - @last-rev/app-config@0.3.1

## 0.5.1

### Patch Changes

- c62ce9d: Allowing for either static or dynaimc path generation in graphql-contentful-core
- Updated dependencies [c62ce9d]
- Updated dependencies [c62ce9d]
- Updated dependencies [c62ce9d]
  - @last-rev/app-config@0.3.0
  - @last-rev/contentful-path-util@0.1.12
  - @last-rev/types@0.3.2
  - @last-rev/graphql-contentful-helpers@0.4.2

## 0.5.0

### Minor Changes

- a996010: Added a new entryByFieldBValue loader
- a996010: Added contentful path rules engine and support for it in various packages

### Patch Changes

- Updated dependencies [a996010]
- Updated dependencies [a996010]
  - @last-rev/contentful-cms-loader@0.4.0
  - @last-rev/contentful-fs-loader@0.3.0
  - @last-rev/contentful-redis-loader@0.5.0
  - @last-rev/graphql-contentful-helpers@0.4.0
  - @last-rev/types@0.3.0

## 0.4.0

### Minor Changes

- fc0aab6: Added a new entryByFieldBValue loader

### Patch Changes

- Updated dependencies [fc0aab6]
  - @last-rev/contentful-cms-loader@0.3.0
  - @last-rev/contentful-fs-loader@0.2.0
  - @last-rev/contentful-redis-loader@0.4.0
  - @last-rev/graphql-contentful-helpers@0.3.0
  - @last-rev/types@0.2.0

## 0.3.1

### Patch Changes

- 2ead5c4: Move XSS filtering from Components to Data Layer

## 0.3.0

### Minor Changes

- 3ba98cd: July updates

### Patch Changes

- 3ba98cd: Bump testing-library version
- Updated dependencies [3ba98cd]
  - @last-rev/contentful-cms-loader@0.2.2
  - @last-rev/contentful-fs-loader@0.1.13
  - @last-rev/contentful-path-util@0.1.11
  - @last-rev/contentful-redis-loader@0.3.3
  - @last-rev/graphql-contentful-helpers@0.2.5
  - @last-rev/graphql-schema-gen@0.2.1
  - @last-rev/testing-library@0.1.10
  - @last-rev/timer@0.1.3

## 0.2.5

### Patch Changes

- d937c88: Moved context creation into function called on each request in gql servers/handlers
- Updated dependencies [d937c88]
  - @last-rev/graphql-contentful-helpers@0.2.4

## 0.2.4

### Patch Changes

- 1ca514f: Wrapping extension execution exceptions with a prefixed logger with mapper info

## 0.2.3

### Patch Changes

- 0d5a9ee: Moved default lookup out of else statement so it doesn't get overridden in sidekickLookupResolver

## 0.2.2

### Patch Changes

- Updated dependencies [71bf23b]
  - @last-rev/contentful-redis-loader@0.3.0
  - @last-rev/contentful-path-util@0.1.10
  - @last-rev/graphql-contentful-helpers@0.2.2

## 0.2.1

### Patch Changes

- Updated dependencies [1d7f33d]
  - @last-rev/contentful-redis-loader@0.2.0
  - @last-rev/graphql-contentful-helpers@0.2.1

## 0.2.0

### Minor Changes

- 25375f1: Added resolveLinks:false to all contentful createClient calls in the framework

### Patch Changes

- Updated dependencies [25375f1]
  - @last-rev/contentful-cms-loader@0.2.0
  - @last-rev/graphql-contentful-helpers@0.2.0
  - @last-rev/graphql-schema-gen@0.2.0

## 0.1.35

### Patch Changes

- db8b0af: 'Fixed fieldResolver to resolve unexpanded links and sidekickLookupResolver to return an object always'

## 0.1.34

### Patch Changes

- d6ec293: Added Algolia integration, cleaned up logs
- Updated dependencies [d6ec293]
  - @last-rev/contentful-cms-loader@0.1.6
  - @last-rev/contentful-fs-loader@0.1.12
  - @last-rev/contentful-redis-loader@0.1.9
  - @last-rev/graphql-schema-gen@0.1.9
  - @last-rev/types@0.1.7

## 0.1.33

### Patch Changes

- 274f803: Switched to use lodash/fp/flow instead of chain

## 0.1.32

### Patch Changes

- 500ff83: Fixed a bug causing path tree to have inconsistent state across multiple calls made in quick succession
- aa834e5: Updated paths to return the correct format for next.js
- aa834e5: removed fallback in getLocalizedField since it was allowing an object to be returned instead of its value
- Updated dependencies [500ff83]
- Updated dependencies [aa834e5]
  - @last-rev/contentful-path-util@0.1.8
  - @last-rev/types@0.1.6

## 0.1.31

### Patch Changes

- d88df66: Added cacheKeyFn to all loaders to fix caching issues
- Updated dependencies [d88df66]
  - @last-rev/contentful-cms-loader@0.1.4
  - @last-rev/contentful-fs-loader@0.1.10
  - @last-rev/contentful-redis-loader@0.1.7

## 0.1.30

### Patch Changes

- 04b1e14: Bug Fix: removed capitalization of contentType in fieldResolver of graphql-contentful-core

## 0.1.29

### Patch Changes

- 0386fee: Added the ability to add resovlers at the interace level for all content

## 0.1.28

### Patch Changes

- 66416e7: 'Added sitemap generation in graphql layer and a generator script for client use'
- Updated dependencies [66416e7]
  - @last-rev/contentful-path-util@0.1.7
  - @last-rev/types@0.1.5

## 0.1.27

### Patch Changes

- aeb2067: Add page path arg to context
- Updated dependencies [aeb2067]
  - @last-rev/types@0.1.3

## 0.1.26

### Patch Changes

- aafeb14: Added a new app config setting skipReferenceFields, to allow schema generation to use the default Content interface for those
- Updated dependencies [aafeb14]
  - @last-rev/graphql-schema-gen@0.1.7

## 0.1.25

### Patch Changes

- 3d3cfdc: add support for faulsy values in GetLocalizedField

## 0.1.24

### Patch Changes

- 55dfa02: fix default field resolution

## 0.1.23

### Patch Changes

- 1d0dbe0: Update dependencies
- Updated dependencies [1d0dbe0]
  - @last-rev/graphql-contentful-helpers@0.1.3

## 0.1.22

### Patch Changes

- 3d28069: Disable sidekickLookupResolver for mapper functions, Fix redis loader issues
- Updated dependencies [3d28069]
  - @last-rev/contentful-redis-loader@0.1.5
  - @last-rev/graphql-contentful-helpers@0.1.2

## 0.1.21

### Patch Changes

- 647fc84: Update fs-loader and redis-loader dependencies
- Updated dependencies [647fc84]
  - @last-rev/contentful-fs-loader@0.1.9
  - @last-rev/contentful-redis-loader@0.1.4

## 0.1.20

### Patch Changes

- 2ae4f84: Remove s3-loader dependency

## 0.1.19

### Patch Changes

- 5ee84d6: Moved App Config to its own package, created contentful-path-util, and created contentful-webhook-handler
- Updated dependencies [5ee84d6]
  - @last-rev/contentful-cms-loader@0.1.3
  - @last-rev/contentful-fs-loader@0.1.8
  - @last-rev/contentful-path-util@0.1.1
  - @last-rev/contentful-redis-loader@0.1.3
  - @last-rev/graphql-contentful-helpers@0.1.1
  - @last-rev/types@0.1.2

## 0.1.18

### Patch Changes

- 95e5bd0: HOTFIX: AWS dependency breaking styles
- Updated dependencies [95e5bd0]
  - @last-rev/contentful-s3-loader@0.1.6

## 0.1.17

### Patch Changes

- d91a413: Hotfix: Fix pathlookup

## 0.1.16

### Patch Changes

- e123c06: Added createRichText util for contentful-core
- ec03eeb: Add Autocomplete filter to Collection

## 0.1.15

### Patch Changes

- 0fa1d0d: Added vercel graphql handler

## 0.1.14

### Patch Changes

- 77e9a39: Add better error hanlding and retry for CollectionFiltered
  Add contentful clients to gql serverless handler

## 0.1.13

### Patch Changes

- 1f24152: CollectionFiltered and Media improvements

## 0.1.12

### Patch Changes

- 7b9d6a1: Added Redis Cache loader, and cleaned up dependencies
- Updated dependencies [7b9d6a1]
  - @last-rev/contentful-cms-loader@0.1.2
  - @last-rev/contentful-fs-loader@0.1.7
  - @last-rev/contentful-redis-loader@0.1.1
  - @last-rev/contentful-s3-loader@0.1.5
  - @last-rev/graphql-schema-gen@0.1.6
  - @last-rev/timer@0.1.1
  - @last-rev/types@0.1.1

## 0.1.11

### Patch Changes

- 493fa21: Add Contetful client to server context

## 0.1.10

### Patch Changes

- a208efb: Added a util to get default field value

## 0.1.9

### Patch Changes

- 6e8e402: Moved preview boolean into graphql queries
- Updated dependencies [6e8e402]
  - @last-rev/contentful-cms-loader@0.1.1
  - @last-rev/contentful-fs-loader@0.1.6
  - @last-rev/contentful-s3-loader@0.1.4

## 0.1.8

### Patch Changes

- 63176af: Added logging and timers, added a new cms data loader
- Updated dependencies [63176af]
  - @last-rev/contentful-fs-loader@0.1.5
  - @last-rev/contentful-s3-loader@0.1.3
  - @last-rev/graphql-schema-gen@0.1.5

## 0.1.7

### Patch Changes

- 94b5414: Fixed gql handler, and issues with s3 loader
- Updated dependencies [94b5414]
  - @last-rev/contentful-s3-loader@0.1.2

## 0.1.6

### Patch Changes

- 72044a3: Updated sschema gen to pass an array for theme
- Updated dependencies [72044a3]
  - @last-rev/graphql-schema-gen@0.1.4

## 0.1.5

### Patch Changes

- a09b949: Removed env vars from gql server, requiring all to be passed in
- Updated dependencies [a09b949]
  - @last-rev/contentful-fs-loader@0.1.4
  - @last-rev/contentful-s3-loader@0.1.1

## 0.1.4

### Patch Changes

- ccc1937: Changed the FS structure to support atomic files for lookups and contentTypes
- Updated dependencies [ccc1937]
  - @last-rev/contentful-fs-loader@0.1.3

## 0.1.3

### Patch Changes

- 840ef4a: Fixed dependencies
- Updated dependencies [840ef4a]
  - @last-rev/contentful-fs-loader@0.1.2
  - @last-rev/graphql-schema-gen@0.1.3
  - @last-rev/testing-library@0.1.2

## 0.1.2

### Patch Changes

- 012b51f: Added filesystem loaders and sync to fs library
- fd9a8c6: allowing for config file for extensions. Added examples.
- 012b51f: Switched from pages to paths query, and implemented a path to ID lookup
- Updated dependencies [fd9a8c6]
- Updated dependencies [012b51f]
  - @last-rev/contentful-fs-loader@0.1.1
  - @last-rev/graphql-schema-gen@0.1.2

## 0.1.1

### Patch Changes

- 656bbc1: Allow for customer to extend base types/resolvers/mappers
- Updated dependencies [656bbc1]
  - @last-rev/graphql-schema-gen@0.1.1
  - @last-rev/testing-library@0.1.1
