# Contenful Libraries

This repo holds all the code for our LastRev Libraries to be used for client projects.

It is built using [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) and [Lerna](https://lerna.js.org/).

## Installation

```bash
$ git clone git@github.com:last-rev-llc/lastrev-libraries.git
$ cd lastrev-libraries
$ nvm use
$ yarn
```

## Commands

To run in dev mode

```bash
$ yarn dev
```

To run only a specific package and its dependencies in dev mode

```bash
$ yarn dev --scope {packagename}
```

To build in production mode

```bash
$ yarn build
```

To run tests

```bash
$ yarn test
```

To run tests in watch mode

```bash
$ yarn test:watch
```

## Using Changesets

This monorepo uses [changesets](https://github.com/atlassian/changesets) to manage versioning and publishing of the different modules and apps. Please read up on changesets and follow the guidelines below:

- When making a change worth noting (something that should show up in changelogs), run `yarn changeset`. This will ask you for the type of bump (patch/minor/major) and which packages it applies to. This is helpful since the person making the change generally knows whether it is a breaking change, a functional change or a simple fix. These changesets are additive, and will also take into account dependencies.
- It is generally a good idea to include a changeset with all pull requests.
- When a change is merged into `main`, the [release github action](.github/workflows/release.yml) is triggered.

## Branching and Publishing

We use github actions and changesets (see above) to automatically publish changes that are committed to main.

For new features, it is best to create a feature branch, and once everything is tested thoroughly and ready for production, to merge it into `main`.

### Publishing public modules to NPM

When changes are merged into main, public modules that have changesets associated with them will be version bumped and a PR created. when that PR is merged, public modules that have had a version bump will be published to NPM.
