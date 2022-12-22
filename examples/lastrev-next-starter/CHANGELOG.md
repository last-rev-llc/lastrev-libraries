# @last-rev/next-starter

## 2.2.0

Fixes:

- Updated Netlify TOML included_files to be more explicit
- Updated wait-on-config to use TCP (it would fail in production due to introspection not available)

Update:

- Replaced @apollo/rover with codegen configuration to download schema
- Updated GraphQL to the latest version
- Updated configuration to disable introspection in GraphQL API route
- Updated configuration to enable introspection in GraphQL runner server
- Updated LR dependencies to their latest versions

Removed:

- Removed cache-netlify-plugin because it was redundant with the existing plugin

## 2.1.0

Added:

- Shared Sentry config with LRNS version tag
- Embedded Apollo Studio for GraphQL (check new .env.template variables)
- Default Security Headers
- LivePreview and Theme API route
- RichText support for: hyperlinks, table and better handling of new lines.
- Sidekick to page contents
- Media support for pdf through iframe
- Fix Media entries not showing in RichText
- Theme extension for normalizing color values (i.e `primary.main_whateverOther_things` -> `primary.main`)

Removed:

- Overall fixes and cleanups of styles, types and console warnings/errors.
- Direct use of Media across components to ContentModule
- Federated schema generated
- Removed next patch, deprecated export flow

Updated:

- Cypress e2e and component testing to version 10
- Build process to use SWC by default
- A11y tags
- nvmrc to be node LTS
- propagateEnv to be fail safe and run on build/dev
- Sentry to skip in development or if no SENTRY_DSN environment is available

## 2.0.3

- Improve fragments for Media, Collection and Card links
- Improve download_schema
- Fix e2e tests not being able to retry

## 2.0.0

### Major Changes

- Add E2E automated tests:
  - Ran on main
  - Ran on PR when the qa-ready label is added
- Component re-estructure to include fragments, themes and types per component
- Improved DX with Apollo configuration
- Updated documentation to include new and exising features
- Improved TS Theme support by adding new files:
  - components.d.ts
  - overrides.d.ts
  - palette.d.ts
  - props.d.ts
- Added robots.txt to the website
- Added improved download_schema script to graphql-sdk
- Removed stories folder (using component stories instead)

## 1.0.0

### Major Changes

- Added Turborepo support
- Updated Next.js to v12
- Added Cypress component testing and e2e testing
- Updated components to be transpiled through `next-transpile-modules` instead of building them.
- Moved Page components to the `components` package instead of `web` and add them to `contentMapping`.
- Moved content mapping to `components/src/contentMapping` package instead of `web/src/_app` (make sure all the same imports are included after the update)
- Use of `ContentModuleProvider` has been moved out of `_app` to the `pages` components. Every page component needs to import `ContentModuleProvider` and use it to get the content module to work.
- MUI theme augmentation has been moved from the theme file to `packages/components/src/@types/mui.d.ts`
