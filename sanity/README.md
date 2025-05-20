# Sanity Schemas for LastRev Libraries

This folder contains Sanity schema definitions that mirror the Contentful models used in this repository. The document and field names match the Contentful IDs so existing GraphQL extensions can operate without modification.

## Setup

1. Install the Sanity CLI globally if you haven't already:
   ```bash
   npm install -g sanity
   ```
2. Create a new Sanity project inside this repository (or elsewhere):
   ```bash
   sanity init --create-project "my-project"
   ```
3. Copy the `sanity/schemas` folder into your Sanity studio and update the `sanity.config.ts` (or `sanity.json` for older studios) to load the schema types:
   ```ts
   import { defineConfig } from 'sanity'
   import schemaTypes from './schemas'

   export default defineConfig({
     schema: {
       types: schemaTypes
     }
   })
   ```
4. Run the studio:
   ```bash
   sanity start
   ```

## Migrating Content

Content can be exported from Contentful using the [`contentful-export`](https://github.com/contentful/contentful-export) tool. The resulting data can be transformed and imported into Sanity using [`@sanity/import`](https://www.sanity.io/docs/importing-data).

Make sure slugs and reference IDs are preserved during the migration so the GraphQL layer continues to resolve paths correctly.
