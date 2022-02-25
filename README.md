# Usage

1. Copy .env.template as .env and complete with your environment variables
2. Run: `yarn`
3. Run: `yarn build:prod`
4. Then: `yarn dev`.
   For building new components, just run:
   `yarn storybook`

## Starting the graphql server

```bash
yarn gql:start
```

## Starting the graphql server in dev mode

```bash
yarn gql:dev
```

## Building the app

First, make sure that the [graphql server has been started](#starting-the-graphql-server-in-dev-mode).

```bash
yarn build
```

## Starting the app

First, make sure that the [graphql server has been started](#starting-the-graphql-server).

This builds and exports the web project

```bash
yarn start
```

## Starting the app in dev mode

```bash
yarn dev
```

### Other

#### Adding / editing icons for `<Link />` components

`<Link />` components reference certain icons from [FontAwesome](https://fontawesome.com/).

Rather than reference the entire library, we have a slim version located here:
`/web/styles/fa-icons.css`

Append new icons as such:
```
.fa-arrow-right:before {
  content: "\f061"; }
```

### Cypress

> [Cypress](https://Cypressjs.io/) Fast, easy and reliable testing for anything that runs in a browser.


Cypress tests are included in the directory of each website package along with the fixtures for the pages that are being tested in `visit_pages.spec.js`.

The first time tests are run on the project a file called `fixtures/generated_pages.json` will be created from the output of a `next build`. This file is used to generate the fixtures for the `visit_pages` specs.

This file can then be manually update to remove pages or add new ones. Once created it wont be re-generated again.

**To run all tests:**

First you need to ensure you have a local version of the site running and it's port matches the one in your `cypress.json` file (3000).


```bash
yarn test:e2e
```

**To open the Cypress UI and work with tests:**
Go to the `packages/web` or `packages/components` folder and run:
```bash
yarn cypress:open
```

**To run Cypress tests with visual regression testing enabled**

Go to the `packages/web` or `packages/components` folder and run:
```bash
PERCY_TOKEN=aaabbbcccdddeeefff yarn test:e2e
```

This will run the Cypress tests and upload the results to Percy, allowing for easy visual regression testing.
Access the `PERCY_TOKEN` by going to the Project settings in your [Percy.io](https://percy.io/) account.


**Make sure you're using the correct PERCY_TOKEN**

### **Visit pages spec**

This test suite will load the paths listed in `cypress/fixtures/pages.json` and test the page for the following:
 - The page loads
 - The cookie banner is displayed and can be dismissed
 - Take a Percy snapshot of the page to compare against the baseline

**To add new pages to the test suite:**

Add new paths under `cypress/fixtures/pages.json` in the appropiate website package.

**To verify Visual tests:**

In order to use visual testing to verify that the page has not changed you need to:
 - Run Cypress tests with testing enabled (see above)
 - Go to percy.io
 - Ensure there's a base line build snapshot for every page
 - Check the latest build for differences
