# Last Rev NextJS Starter

1. Copy .env.template as .env and complete with your environment variables
2. Run: `yarn`
3. Run: `yarn build`
4. Then: `yarn dev`.
   For building new components, just run:
   `yarn storybook`
 
Frameworks Used

- [React](https://reactjs.org/)
- [NextJS](https://nextjs.org/)
- [MaterialUI](https://mui.com/)
- [GraphQL](https://graphql.org/)
- [Cypress.io](https://www.cypress.io/)
- [Percy.io](https://percy.io/)
- [Contentful](https://www.contentful.com/)
- [Netlify](https://www.netlify.com/)

## Local Development

### First Time Setup

1. Clone this repo
2. Ensure that you have the correct version of node installed. We use [`nvm`](https://github.com/nvm-sh/nvm) to mange different versions of node. If you have that installed you can simply type:

```bash
nvm use
```

3. Install the dependencies

```bash
yarn install
```

4. Copy the `.env.sample` file located at the root and add the required variables to a file named `.env` See below for information on each variable
5. Do a full build

```bash
yarn build
```

### Running the site locally

1. Start the dev server that starts the GraphQL server and the local version of NextJS

```bash
yarn dev
```

2. Go to [http://localhost:3000/](http://localhost:3000/) to see the site
   > NOTE: The server will use port 3001 if 3000 is already in use

### Storybook Development

If you are just doing front-end development, you may only need to start up storybook for quicker development. This allows you to create new mocks and variations, without having to add the content to Contentful.

1. Ensure you have followed the same instructions for first time setup.
2. Run this command to start storybook

```bash
yarn storybook
```

3. Go to [http://localhost:6006/](http://localhost:6006/)

### GraphQL Playground

You can open the GraphQL playground where you can run queries on the data layer to see what data is being dsiplayed for a page.

1. Ensure you have followed the same instructions for first time setup.
2. Start the GraphQL server (if not already started using `yarn dev`)

```bash
yarn gql:dev # Runs the GraphQL server by itself
```

3. You can go to [http://localhost:5000/graphql](http://localhost:5000/graphql)

### Getting the data for a Page query

> Note: This is a manual process right now and we are looking to improve how you can run queries. Since Fragments are located in multiple files, you will need to copy out all fragments for your query to work correctly.

1. Open the query file you want to run located at `/packages/graphql-sdk/src/queries/Page.query.ts`
2. Copy the query out of the file. Example:

```javascript
query Page($path: String!, $locale: String, $preview: Boolean, $site: String) {
  page(path: $path, locale: $locale, preview: $preview, site: $site) {
      id
      ...Content_Base
      ...Page_Base
    }
}
```

3. Click `Query Variables` in the bottom left of the page
4. Add the following JSON

```json
{
  "path": "/some/relative/path/to/page",
  "locale": "en-US",
  "preview": true,
  "site": "SITENAME"
}
```

6. Add all required fragments below the query. You can get these values by going into each of the query files. Example:

```javascript
query Page($path: String!, $locale: String, $preview: Boolean, $site: String) {
  page(path: $path, locale: $locale, preview: $preview, site: $site) {
      id
      ...Content_Base
      ...Page_Base
    }
}

fragment Content_Base on Content {
   id
   __typename
   sidekickLookup
}

fragment Page_Base on Page {
   seo
   slug
   header {
      __typename
      ...Header_Base
      navigationItems {
         ...Collection_Base
      }
   }
   footer {
      ...Section_Base
   }

   hero {
      ...Hero_Base
   }

   contents {
      ...Content_Page_Base
   }
}

// Add ALL fragments reference from the query or any other fragments below
```

### Making Changes in Contentful

If you make any changes in Contentful you will need to sync the content with your local machine.

1. Open a new terminal (if running `yarn dev` already)

```bash
yarn symc:cms
```

## Packages Overview

> ### `/packages/components`
>
> The components package is the location of all of the components used on the website. We keep the components in its own package so that your component library can live byitself and be packaged up and used in websites. Each component has a standard folder stucture that continas all of the required files for development [Learn More](packages/components)

> ### `/packages/contentful-migration`
>
> Whenever you need to make changes to the contentful content models or space setup, it is best practice to create a migration script to do this. [Learn More](packages/contentful-migration)

> ### `/packages/functions`
>
> The functions package is the location of all serverless functions that your application used. Serverless functions are used when you want to create API end points for your front end components to get secure data. [Learn More](packages/functions)

> ### `/packages/graphql-extensions`
>
> The graphql-extensions package allows you to create a GraphQL schema that is based on the content models in Contentful. Most people will be able to use the generated schema without too many modifications. But if you want to add custom fields or resolver behavior, you can do so through extensions. [Learn More](packages/graphql-extensions)

> ### `/packages/graphql-runner`
>
> The graphql-runner package is the communication layer between Contentful and our GraphQL instance. You should not have to change anything in this package. [Learn More](packages/graphql-runner)

> ### `/packages/graphql-sdk`
>
> The graphql-sdk package is the location for all GraphQL queries and Fragments for the data layer. [Learn More](packages/graphql-sdk)

> ### `/packages/utils`
>
> The utils package is used for global shared functions that should be shared across packages [Learn More](packages/utils)

> ### `/packages/web`
>
> The web package is the NextJS setup of the website. [Learn More](packages/web)

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

# Automated Tests

## **Github Required Secrets**

## For the automated E2E test to run succesfully in Github Actions you need to add the following secrets to your project (some may be already avaiable as organization secrets):

| Secret                    | Description                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| CONTENTFUL_DELIVERY_TOKEN | Delivery token from Contentful (ask your admin for this value)                                |
| NETLIFY_SITE_ID           | Netlify site id from Netlify (ask your admin for this value)                                  |
| CYPRESS_PROJECT_ID        | Cypress project id, get it from the [project settings](https://dashboard.cypress.io/)         |
| CYPRESS_RECORD_KEY        | Cypress project record key, get it from the [project settings](https://dashboard.cypress.io/) |
| PERCY_TOKEN               | Percy token, get it from the [project settings](https://percy.io/)                            |

Cypress tests are included in the directory of each website package along with the fixtures for the pages that are being tested in `visit_pages.spec.js`.

The first time tests are run on the project a file called `fixtures/generated_pages.json` will be created from the output of a `next build`. This file is used to generate the fixtures for the `visit_pages` specs.

This file can then be manually update to remove pages or add new ones. Once created it wont be re-generated again.

> [Cypress](https://Cypressjs.io/) Fast, easy and reliable testing for anything that runs in a browser.

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

## Environment Variables

| Variable                        | Description                                                                                                                                                                                                                 |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CONTENTFUL_DELIVERY_TOKEN       | Delivery token from Contentful (ask your admin for this value)                                                                                                                                                              |
| CONTENTFUL_ENV                  | The Contentful environment you want to use. Usually set to master, but can be any environment (make sure the environment is allowed for your API key in the Contentful dashboard)                                           |
| CONTENTFUL_PREVIEW_TOKEN        | Preview token from Contentful (ask your admin for this value)                                                                                                                                                               |
| CONTENTFUL_SPACE_ID             | The ID of the Contentful space. This value depends on the client’s contentful set up, you can grab this from the Contentful URL (e.g. https://app.contentful.com/spaces/{CONTENTFUL_SPACE_ID}/settings/space)               |
| CONTENTFUL_USE_PREVIEW          | This can be true or false. If you set it to true, it means that the framework is going to pull draft and published content. If you set it to false, the framework is only going to pull published content (aka production). |
| GRAPHQL_SERVER_URL              | This is the URL that the GraphQL client is going to use to connect to the server. For your local environment it should be http://localhost:5000/graphql, for Netlify it should be /.netlify/functions/graphql.              |
| LOG_LEVEL                       | Log level for the different processes, usually debug for the local environment.                                                                                                                                             |
| NEXT_PUBLIC_CONTENTFUL_ENV      | Same as CONTENTFUL_ENV, this is the public environment variable used for Sidekick                                                                                                                                           |
| NEXT_PUBLIC_CONTENTFUL_SPACE_ID | Same as CONTENTFUL_SPACE_ID, this is the public environment variable used for Sidekick                                                                                                                                      |
| REDIS_HOST                      | Host for the Redis instance, this is used for the preview functionality.                                                                                                                                                    |
| REDIS_PASSWORD                  | Password for the Redis instance, this is used for the preview functionality.                                                                                                                                                |
| REDIS_PORT                      | Port for the Redis instance, this is used for the preview functionality.                                                                                                                                                    |
| SITE                            | The framework is enabled to process multiple sites using the same project. Set this variable to the site you want to build.                                                                                                 |
| SITE                            | The framework is enabled to process multiple sites using the same project. Set this variable to the site you want to build.                                                                                                 |
| DEFAULT_SITE_ID                 | This is the content ID of the `Site` content entry. Use this when you only have one Site                                                                                                                                    |
| SITE_SETTINGS                   | ID of the site settings content (in Contentful)                                                                                                                                                                             |
| DOMAIN                          | Base domain of the web app, this is to be able to build the sitemap.                                                                                                                                                        |
