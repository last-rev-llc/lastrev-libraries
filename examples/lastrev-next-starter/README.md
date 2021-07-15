# Usage

## Starting the graphql server

```bash
yarn gql:start
```

## Starting the graphql server in dev mode

```bash
yarn gql:dev
```

## Building the app

First, make sure that the [graphql server has been started](#starting-the-graphql-server).

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

First, make sure that the [graphql server has been started in dev mode](#starting-the-graphql-server-in-dev-mode).

```bash
yarn dev
```

# Still to figure out:

- Ability to extend the apollo context
- Utility to merge extensions in graphql-contentful-core
- Generate locale data prior to build/dev for web project (i18n & translations)
