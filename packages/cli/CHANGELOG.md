# @last-rev/cli

## 0.5.6

### Patch Changes

- ad87311: Update sync to fs version

## 0.5.5

### Patch Changes

- 0639f30: adding queries to allow for more fine grained sitemap construction/generation
- Updated dependencies [0639f30]
  - @last-rev/app-config@0.3.1
  - @last-rev/graphql-contentful-core@0.5.2

## 0.5.4

### Patch Changes

- c62ce9d: bump version of core
- Updated dependencies [c62ce9d]
- Updated dependencies [c62ce9d]
  - @last-rev/app-config@0.3.0
  - @last-rev/graphql-contentful-core@0.5.1

## 0.5.3

### Patch Changes

- 43124bd: Added update.sh script back; Added logic to open and edit patch file

## 0.5.2

### Patch Changes

- 44f8245: bumped dependency versions

## 0.5.1

### Patch Changes

- Updated dependencies [a996010]
- Updated dependencies [a996010]
  - @last-rev/graphql-contentful-core@0.5.0
  - @last-rev/contentful-sync-to-fs@0.3.4

## 0.5.0

### Minor Changes

- 50e472d: Added automated creation of redis ACL user to CLI

## 0.4.2

### Patch Changes

- Updated dependencies [fc0aab6]
  - @last-rev/graphql-contentful-core@0.4.0
  - @last-rev/contentful-sync-to-fs@0.3.3

## 0.4.1

### Patch Changes

- 3ba98cd: Bump testing-library version
- Updated dependencies [3ba98cd]
- Updated dependencies [3ba98cd]
  - @last-rev/app-config@0.2.1
  - @last-rev/contentful-fragment-gen@0.2.1
  - @last-rev/contentful-import-export@0.1.4
  - @last-rev/contentful-sync-to-fs@0.3.2
  - @last-rev/graphql-contentful-core@0.3.0
  - @last-rev/testing-library@0.1.10

## 0.4.0

### Minor Changes

- d28f4a7: Added framework-update command to CLI

## 0.3.2

### Patch Changes

- Updated dependencies [f7e8fa4]
  - @last-rev/app-config@0.2.0

## 0.3.1

### Patch Changes

- a5b06aa: bumped version of @last-rev/graphql-contentful-core

## 0.3.0

### Minor Changes

- a9c0034: Updated CLI create-app to use a JSON input and added more features to it

## 0.2.2

### Patch Changes

- Updated dependencies [93453e8]
  - @last-rev/contentful-sync-to-fs@0.3.0

## 0.2.1

### Patch Changes

- Updated dependencies [25375f1]
  - @last-rev/contentful-fragment-gen@0.2.0
  - @last-rev/contentful-sync-to-fs@0.2.0
  - @last-rev/graphql-contentful-core@0.2.0

## 0.2.0

### Minor Changes

- 233c117: 'Added a new Develop command to the CLI, and a new eslint plugin package'

## 0.1.36

### Patch Changes

- db8b0af: 'Fixed fieldResolver to resolve unexpanded links and sidekickLookupResolver to return an object always'
- Updated dependencies [db8b0af]
  - @last-rev/graphql-contentful-core@0.1.35

## 0.1.35

### Patch Changes

- d6ec293: Added Algolia integration, cleaned up logs
- Updated dependencies [d6ec293]
  - @last-rev/app-config@0.1.5
  - @last-rev/contentful-fragment-gen@0.1.4
  - @last-rev/contentful-import-export@0.1.3
  - @last-rev/contentful-sync-to-fs@0.1.11
  - @last-rev/graphql-contentful-core@0.1.34

## 0.1.34

### Patch Changes

- 274f803: Switched to use lodash/fp/flow instead of chain
- Updated dependencies [274f803]
  - @last-rev/contentful-sync-to-fs@0.1.10
  - @last-rev/graphql-contentful-core@0.1.33

## 0.1.33

### Patch Changes

- b3c20e0: Update to latest rollup-config
- Updated dependencies [b3c20e0]
  - @last-rev/app-config@0.1.4
  - @last-rev/contentful-fragment-gen@0.1.3
  - @last-rev/contentful-import-export@0.1.2
  - @last-rev/contentful-sync-to-fs@0.1.9

## 0.1.32

### Patch Changes

- 500ff83: Fixed a bug causing path tree to have inconsistent state across multiple calls made in quick succession
- aa834e5: Updated paths to return the correct format for next.js
- aa834e5: removed fallback in getLocalizedField since it was allowing an object to be returned instead of its value
- Updated dependencies [500ff83]
- Updated dependencies [aa834e5]
- Updated dependencies [aa834e5]
  - @last-rev/graphql-contentful-core@0.1.32

## 0.1.31

### Patch Changes

- ca5c190: Updated fragment generator to use typeMappings for fragment names
- d88df66: Added cacheKeyFn to all loaders to fix caching issues
- Updated dependencies [ca5c190]
- Updated dependencies [d88df66]
  - @last-rev/contentful-fragment-gen@0.1.2
  - @last-rev/graphql-contentful-core@0.1.31

## 0.1.30

### Patch Changes

- 04b1e14: Bug Fix: removed capitalization of contentType in fieldResolver of graphql-contentful-core
- Updated dependencies [04b1e14]
  - @last-rev/graphql-contentful-core@0.1.30

## 0.1.29

### Patch Changes

- 0386fee: Added the ability to add resovlers at the interace level for all content
- Updated dependencies [0386fee]
  - @last-rev/graphql-contentful-core@0.1.29

## 0.1.28

### Patch Changes

- 5f999f8: Update lastrev cli contentful core dependency

## 0.1.27

### Patch Changes

- fa99186: 'Parellelized sync entries and assets in sync-to-fs module'
- Updated dependencies [fa99186]
  - @last-rev/contentful-sync-to-fs@0.1.8

## 0.1.26

### Patch Changes

- 022b507: Minor text updates to CLI
- fa9307a: Allow for multiple input directories when generating fragments
- Updated dependencies [fa9307a]
  - @last-rev/contentful-fragment-gen@0.1.1

## 0.1.25

### Patch Changes

- aafeb14: Added a new app config setting skipReferenceFields, to allow schema generation to use the default Content interface for those
- Updated dependencies [aafeb14]
  - @last-rev/app-config@0.1.2
  - @last-rev/graphql-contentful-core@0.1.26

## 0.1.24

### Patch Changes

- 7a7465e: Added populating env vars locally and in Netlify

## 0.1.23

### Patch Changes

- dda53bf: Added netlify setup to create-app cli script

## 0.1.22

### Patch Changes

- a91fe39: Bump the contentful-core dependency

## 0.1.21

### Patch Changes

- 1d83119: Fixed TS error

## 0.1.20

### Patch Changes

- cbf6717: 'Fixed a TS error'

## 0.1.19

### Patch Changes

- 8268b79: Replaced "got" module with https native module to fix dependency bug, added some netlify functionality

## 0.1.18

### Patch Changes

- 1d0dbe0: Update dependencies
- Updated dependencies [1d0dbe0]
  - @last-rev/contentful-sync-to-fs@0.1.7
  - @last-rev/graphql-contentful-core@0.1.23

## 0.1.17

### Patch Changes

- ea75fa3: Update cli contentful-core dependency

## 0.1.16

### Patch Changes

- f109672: Added Contentful import/export to create-app CLI command
- Updated dependencies [f109672]
  - @last-rev/contentful-import-export@0.1.1

## 0.1.15

### Patch Changes

- 5ee84d6: Moved App Config to its own package, created contentful-path-util, and created contentful-webhook-handler
- Updated dependencies [5ee84d6]
  - @last-rev/app-config@0.1.1
  - @last-rev/contentful-sync-to-fs@0.1.6
  - @last-rev/graphql-contentful-core@0.1.19

## 0.1.14

### Patch Changes

- 3089d86: Added Fragement Generator to CLI

## 0.1.13

### Patch Changes

- 7b9d6a1: Added Redis Cache loader, and cleaned up dependencies
- Updated dependencies [7b9d6a1]
  - @last-rev/contentful-s3-sync@0.1.2
  - @last-rev/contentful-sync-to-fs@0.1.5
  - @last-rev/graphql-contentful-core@0.1.12

## 0.1.12

### Patch Changes

- 6e8e402: Moved preview boolean into graphql queries
- Updated dependencies [6e8e402]
  - @last-rev/contentful-sync-to-fs@0.1.4
  - @last-rev/graphql-contentful-core@0.1.9

## 0.1.11

### Patch Changes

- 63176af: Added logging and timers, added a new cms data loader
- Updated dependencies [63176af]
  - @last-rev/graphql-contentful-core@0.1.8

## 0.1.10

### Patch Changes

- 94b5414: Fixed gql handler, and issues with s3 loader
- Updated dependencies [94b5414]
  - @last-rev/graphql-contentful-core@0.1.7

## 0.1.9

### Patch Changes

- 7861125: Bumped version of graphql-contentful-core

## 0.1.8

### Patch Changes

- a09b949: Removed env vars from gql server, requiring all to be passed in
- Updated dependencies [a09b949]
  - @last-rev/graphql-contentful-core@0.1.5

## 0.1.7

### Patch Changes

- ccc1937: Changed the FS structure to support atomic files for lookups and contentTypes
- Updated dependencies [ccc1937]
  - @last-rev/contentful-sync-to-fs@0.1.3
  - @last-rev/graphql-contentful-core@0.1.4

## 0.1.6

### Patch Changes

- 8d45841: added contentful s3 sync and CLI command
- 8d45841: Added netlify.toml to rename packages script in create-app CLI
- Updated dependencies [8d45841]
  - @last-rev/contentful-s3-sync@0.1.1

## 0.1.5

### Patch Changes

- b4bda35: Added new create-app cli command

## 0.1.4

### Patch Changes

- 840ef4a: Fixed dependencies
- Updated dependencies [840ef4a]
  - @last-rev/contentful-sync-to-fs@0.1.2
  - @last-rev/graphql-contentful-core@0.1.3
  - @last-rev/testing-library@0.1.2

## 0.1.3

### Patch Changes

- b83fbf7: Added dependency to @last-rev/contentful-sync-to-fs

## 0.1.2

### Patch Changes

- 012b51f: Added filesystem loaders and sync to fs library
- fd9a8c6: allowing for config file for extensions. Added examples.
- 012b51f: created CLI to run cms sync
- 012b51f: Switched from pages to paths query, and implemented a path to ID lookup
- Updated dependencies [012b51f]
- Updated dependencies [fd9a8c6]
- Updated dependencies [012b51f]
  - @last-rev/graphql-contentful-core@0.1.2

## 0.1.1

### Patch Changes

- 656bbc1: Allow for customer to extend base types/resolvers/mappers
- Updated dependencies [656bbc1]
  - @last-rev/graphql-contentful-core@0.1.1
  - @last-rev/testing-library@0.1.1
