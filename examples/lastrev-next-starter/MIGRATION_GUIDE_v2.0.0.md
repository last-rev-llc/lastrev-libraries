# prereqs

- First thing you want to do is to run the migration script located in the main [README.md file](/../README.md)
- When running the cli upgrade command, you may find issues with specific files.

  - i.e `error: could not build fake ancestor` - This issue is due to a patch file not being present in some projects

  - When prompted to verify the patch file again, check the patch file generated and remove any files that have issues before continuing, ie:
    - oneliners (todo: update with correct name)
      ```
      .../src/components/Page/Page.stories.tsx      |    44 +
      ```
    - diff file patches (todo: update with correct name)
      ```
      diff --git a/examples/lastrev-next-starter/packages/components/src/components/Page/Page.stories.tsx b/examples/lastrev-next-starter/packages/components/src/components/Page/Page.stories.tsx
      new file mode 100644
      index 0000000..b646db7
      --- /dev/null
      +++ b/examples/lastrev-next-starter/packages/components/src/components/Page/Page.stories.tsx
      @@ -0,0 +1,44 @@
      +import React from 'react';
      ```

# Global Changes

- Replace all instances of `@lrns` to be the main package name i.e `@lrns -> @custom-website` (make sure to ignore this file)
- Go through all of the changes in the patch
  - If you get a message "file was deleted by us and modified by them" Always keep the deleted file and take a note to review it later to di into if it can be deleted or not
- Ensure that all changes to the .env.template are merged into the project as this is the latest list of available env variables
- All package.json should be the exact same across all projects\* so accept all changes and ensure that the scripts are using customer packages and not @lrns
  - Some customers could have a unique script or package to them, merge those changes in as well on a per customer basis if the script is still needed.
- pnpm.lock accept all incoming changes (you will rerun this later to rebuild this file)
  - Except for graphql-extensions/pnpm.lock file, which needs to be deleted
- package.lock can be deleted if it is in the merge
- run-tests.yml should be the exact same across all customer and should always take the incoming change in
- If you come across a file that was removed from the starter i.e Blog make sure you choose "keep our version"
- Sometimes you may get a file not found, when that happens click on the + button for the file in the source control explorer in VSCode to add it to staging, and you will be promoted with "Merge with Conflicts" and choose yes
- nextjs.config: Ensure here we are not removing any needed env variables and that all custom variables are preserved for the customer
- `packages/web/pages`
  - `app.tsx` You will need to ensure that all of the values in the app.tsx file for `contentMapping` are moved to the actual `packages/components/contentMapping.tsx` file and ensure that all imports are still being used and referenced correctly
  - `document.tsx` Thsi will be a merge of the customer code and our code
  - `[[...slug]].tsx` - Move any page imports in this file to the contentMapping.tsx file
  - Esnure tany customer specific code is preserved for all files

# Components

- Every component should be updated to export the correct props and types.
  - i.e CollectionFiltered needs to be updated to include the `export type {...}`
  - This also applies for any other LRCL "wrapped" or custom components
- For every custom components, a new `Component.types.ts` will need to be created for correct integration with the theme. See [adding new components to the types](#migrating-themes)

- Anything in the /packages/components folder is considered customer code and should be gone through individually. Most will keep the current customers code, but there are times when you will want the new code. Use carefully
- mocks should keep current changes in most cases
- stories will be keep current changes in most cases
- index files will need to be updated with the new imports
- If a component was "exported" ensure that the imports are matching the updated paths.
- All createXXXVariant.ts files will need to be migrated to the new Component.theme.tsx file (but not right now)
  - For the first run through you will want to keep the current customer values. (You do not need to update the theme for this to work correctly)
    -TIP: Get the current project running correctly with the current theme file structure, then after you have verified everything works, then migrate the theme files to help reduce the amount of changes being introduced and needed to be debugged.

# GraphQL

- packages/graphql-extensions/src/index.ts may be different for every client. Some will not be using our "default" extensions and will need a bit of migration
  - For projects not using the `graphql-contentful-extensions` we will want to add them before the custom extensions
  - Update the import statement to use `import Card as LRCard` for all extensions coming from the @last-rev/graphql-contentful-extensions
  - Merge the changes and ensure that any custom extensions are sill being used, and then add all of the Last Rev extensions to the `extensions` array before the custom extensions
  - When adding new extensions from the upgrade make sure to only keep the integrations being used and not the ones that are not being used. (i.e Algolia)
- Fragments are the largst area of chage. For now, bring all your changes back by accepting current changes to fragements and queries, not incoming changes so you have the files to go through manually

# Migrating Themes

## Adding new components types for theme integration

Every component that you create will need to be added to the MUI overrides to ensure a nice developer experience supported by Typescript.
The files you will need to have in your components are: - `components/src/components/Example/Example.types.ts` - Make sure this file exports the following: - `ExampleProps` - `ExampleClasses` - `ExampleClassKey` - (Follow the example here for the contents of this file)[https://github.com/last-rev-llc/lastrev-libraries/blob/2af1939d0314911012d7dc6d92fcc0027772fab0/examples/lastrev-next-starter/packages/components/src/components/Quote/Quote.types.ts#L1]

Then you need to add them to the theme types in: - `components/src/@types/components.d.ts` - `components/src/@types/overrides.d.ts` - `components/src/@types/props.d.ts`

For a full example of the file structure please refer to the code in the [@last-rev/component-library/Quote](https://github.com/last-rev-llc/lastrev-libraries/blob/2af1939d0314911012d7dc6d92fcc0027772fab0/examples/lastrev-next-starter/packages/components/src/components/Quote/Quote.types.ts#L1)

## Migrating the style overrides

    - Copy the `styleOverrides` from the `theme/index.ts` file to the correct `
    - Update `baseTheme` to using a function callback for each slot to use `theme`
        - `root: ({ theme }) => ({ ... })`
    - Update any type errors that are now visible!

- Common issues:
  - `@lrns/web:dev: Module not found: Can't resolve '../components/GoogleFormIntegration/GoogleFormIntegration.theme'`

## Migrating the variants

Some components may have `createComponentVariants` file being used. This variants file will need to be migrated to the new theme file structure as well.

- Copy the return object of each variant into the new `createVariants` function inside `Component.theme.ts` file.
- If you're using the `theme` make sure to rename `_theme` in the arguments of this function.

# Migrating Fragments

- When migrating the fragments you need to make sure you're maintaining all the fields that are currently in use.
- For every content type that is present in the PreviewQuery.ts, PageQuery.ts and ContentTypes.ts you will need to migrate the fields to the new fragment files.
- It's recommended to open the current query/fragment file side by side with the new content fragments and review one by one as you migrate them over.
- i.e Person:
  - Open Page.query.ts and look for base fragment on Person -> `fragment PersonFragment on Person { ... }`
  - Open or create the new fragment file at `components/Person/Person.fragment.graphql`
  - Verify the fields of the new fragment meet all the requirements from the old fragment
  - It's ok and encouraged if the new fragment has more fields, just make sure that the mininmum requirements are met.
  - Delete the fragment from the old query file
- Repeat this process until every fragment is migrated.
- After migrating all the files, run `pnpm gql:dev` from the root of the project to verify that everything is working correctly.
- Review the output of the GQL code generation for errors and fix them (also use apollo vscode extension to see and fix gql errors)
- Common issues:
  - `Error: Field is not present in type`
    - Solution: This issue is due to the fragments including more fields than what's available in the current content models. Review the fragments for fields that are not present and remove them.
  - `Error: Not all fragments have an unique name: <fragment_name>, <fragment_name>, <fragment_name>`
    - Solution: Make sure you only have a single place where you define the fragment `<fragmentName> on <typeName> { ... }`
  - `Error: Cannot spread fragment <fragment_name> within itself`
    - Solution: Make sure you don't spread the fragment within itself by duplicating the current fragment and removing the conflicting references. Then update the nested fragment to use the new fragment name.
      - Identify the fields being required by this usage of the fragment
      - Create a new fragment that includes the required fields with a unique name following the pattern
        - `<type_name>_<parent_type_name>Fragment on <type_name> { ...<type_name>_FieldsFragment ... }`
      - Update the fragment usage to the new fragment
      - Verify the error goes away

# Verifying everything works as expected

- Make sure the `pnpm build` commands runs correctly without any error messages
- Make sure the `pnpm dev` commands runs and you can access the website locally
- Run `pnpm start` and then run the `PERCY_TOKEN=xxx pnpm test:e2e` to generate a Percy report
- Check the Percy report for any visual issues that may be present.
- When everything looks good, create a PR and add the label `qa-ready` this will run the CI E2E tests and make sure everything is working as expected.

# Common issues

- `Path of Typescript compiler option 'outDir' must be located inside Rollup 'dir' option.` - Solution: Make sure every tsconfig.json has `"outDir": "dist"`
- `Module '"@last-rev/component-library/dist/components/Example/Example"' has no exported member 'ExampleProps'. Did you mean to use 'import ExampleProps from "@last-rev/component-library/dist/components/Example/Example"' instead?` - Solution: Simplify imports to remove the last segment from the path:
  - `import { ExampleProps } from "@last-rev/component-library/dist/components/Example/Example"`
  - `import { ExampleProps } from "@last-rev/component-library/dist/components/Example"`
- `Import 'RichText' not found.` - Solution: Make sure your `components/src/components/Text` file correctly re-exports all types
  - i.e `export type { TextProps, TextClassKey, TextClasses } from '@last-rev/component-library/dist/components/Text';`
- `**ERROR** Failed to apply patch for package <package_name> at path node_modules/<package_name>`
  - Solution:
    - check patch file to see what changes were made
      - should be under error message as `Info: Patch file: patches/<patch_file_name>`
    - check file(s) in node_modules to see if changes were made correctly
      - If changes are not made correctly
        - Make changes in file(s) and save
        - Run `pnpm patch-package <package_name>`

# Schema generation

- Run `pnpm propagate:env` to update the packages `.env` file
- Run `pnpm sync:cms` to sync the content from the CMS to the local file system
- Run `pnpm gql:dev` to get the grapqhl server running, generate the schema and the sdk.
- Check the `schema.graphql` to see the new changes
- Check the logs to see if there are any errors during either the SDK, schema generation or extensions building.

## Common errors
