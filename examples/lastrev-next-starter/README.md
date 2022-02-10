# Usage

1. Copy .env.template as .env and complete with your environment variables
2. Run: `yarn`
3. Then: `yarn dev`.
   For building new components, just run:
   `yarn storybook` (you don't need to use this repo yet)

## Starting the graphql server

```bash
yarn gql:start
```

## Starting the graphql server in dev mode

```bash
yarn gql:dev
```

## Building the app

Ensure you have the appropiate environment variables set.

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
