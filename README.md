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
