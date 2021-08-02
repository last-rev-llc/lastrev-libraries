# @last-rev/graphql-contentful-core

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
