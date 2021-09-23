# @last-rev/cli

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
