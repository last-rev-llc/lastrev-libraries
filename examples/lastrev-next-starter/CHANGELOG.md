# @last-rev/next-starter

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