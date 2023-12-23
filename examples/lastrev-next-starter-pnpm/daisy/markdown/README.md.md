TransparentDark and TransparentLight
Quick Supplemental Body on Block?
Icons for links?

# TODO

[x] Implement 404 for non generated pages
[x] Deploy to Vercel
[x] Deploy Storybook to Vercel
[x] Implement Sitemap
[x] Implement Robots
[x] Implement CSP policies
[x] Implement GraphQL preview endpoint
[x] Implement Preview
[x] Implement Content Redirect
[ ] Create Grid documentation and working with Block, Collection
[ ] Implement Test pipeline
[ ] Implement E2E pipeline
[ ] Implement Chromatic pipeline
[] Implement path resolution for href
[] Implement Custom 404
[] Implement theme on Storybook
[] Implement Analytics
[] Implement Contentful Sidekick
[] Implement Live Editor and other UIEs
[] Implement Theme api endpoint
[] Implement \_error page
[] Implement Algolia
[] Implement path v2 resolution
[] Implement Localization

## Components

[] Block
[] Hero
[] Link
[] Text
[] Media
[] Page

# LastRev starter

This is an official Starter by LastRev with multiple meta-frameworks all working in harmony and sharing packages.

This example also shows how to use [Workspace Configurations](https://turbo.build/repo/docs/core-concepts/monorepos/configuring-workspaces).

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e kitchen-sink
```

## What's inside?

This repo includes the following packages and apps:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `ui`: a complete React UI library for displaying content
- `scripts`: Jest and ESLint configurations
- `tsconfig`: tsconfig.json's used throughout the monorepo

Each package and app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This LastRev has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting

## Local Development Guide
This guide details how to set up the LastRev starter project for local development, including environment configuration and running the application.

### Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (version specified in the package.json file)
- pnpm (preferred package manager)
- Contentful CLI (for interacting with your Contentful space)

### Local Development
To run the LastRev starter project on your local machine, follow these steps:
- Clone the repository to your local machine.
- Navigate to the root directory of the project.
- Install dependencies by running `pnpm i`.
- Copy the env.sample file and set up your environment variables (more information in the Environment Variables section below).
- Run the development server with the command `pnpm dev`
- The application should now be running on http://localhost:3000.

### Environment Variables
Local setup requires certain environment variables to be set for proper functioning. Below is a table detailing each environment variable and its purpose:

| Variable                            | Description                                                                 | Default Value              | Scope         |
|-------------------------------------|-----------------------------------------------------------------------------|----------------------------|---------------|
| SITE                                | Used to filter out and pick the right site when multiple sites are running under one Contentful space | STARTER_ANYTHING          | Server        |
| DOMAIN                              | Domain where the app is running; needs to match the URL where it's hosted   | http://localhost:3000      | Server        |
| CONTENTFUL_SPACE_ID                 | The ID of your Contentful space                                             |                            | Server        |
| CONTENTFUL_ENV                      | The Contentful environment you wish to run against                          |                            | Server        |
| NEXT_CONTENTFUL_SPACE_ID            | The ID of your Contentful space                                             |                            | Client        |
| NEXT_CONTENTFUL_ENV                 | The Contentful environment you wish to run against                          |                            | Client        |
| CONTENTFUL_USE_PREVIEW              | Set to true to pull draft content as well as published content; when false, only pulls published content | true                     | Server        |
| CONTENTFUL_PREVIEW_TOKEN            | The Contentful preview token for preview content                            |                            | Server        |
| CONTENTFUL_DELIVERY_TOKEN           | The Contentful delivery token for published content                         |                            | Server        |
| GRAPHQL_SERVER_URL                  | The URL of the GraphQL server when running locally                          | http://localhost:8888/graphql | Server   |
| REDIS_HOST                          | Hostname for the Redis server                                               |                            | Server        |
| REDIS_PASSWORD                      | Password for the Redis server                                               |                            | Server        |
| LOG_LEVEL                           | Defines the level of logging output                                         | debug                      | Server        |
| NEXT_PUBLIC_GTM_ID                  | Google Tag Manager ID for adding analytics                                  |                            | Public/Client |
| ALGOLIA_APPLICATION_ID              | Application ID for Algolia integration                                      |                            | Server        |
| ALGOLIA_SEARCH_API_KEY              | Search-only API key for Algolia integration                                 |                            | Server        |
| NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY  | Search-only API key for Algolia, accessible on the client-side              |                            | Public/Client |


These variables should be set in your .env.local file in the root directory for local development. You can use the provided env.sample file as a template.

### Scripts
Here is an explanation of the available yarn commands from the package.json scripts sections:

| Command              | Description                                            |
|----------------------|--------------------------------------------------------|
| `pnpm start`         | Runs the build version of the app.                     |
| `pnpm build`         | Creates a production build.                            |
| `pnpm dev`           | Starts the application in development mode with hot reloading. |
| `pnpm clean`         | Clears the build cache.                                |
| `pnpm format`        | Formats the code using Prettier.                       |
| `pnpm lint`          | Lints the project using ESLint.                        |
| `pnpm test`          | Runs the test suite across the project.                |
| `pnpm storybook`     | Starts the Storybook for developing UI components in isolation. |
| `pnpm build-storybook` | Builds the static Storybook files.                    |
| `pnpm chromatic`     | Runs Chromatic for visual testing.                     |
