# Contenful Libraries

This repo holds all the code for our LastRev Libraries to be used for client projects.

It is built using [Yarn workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) and [Lerna](https://lerna.js.org/).

[![Run tests](https://github.com/last-rev-llc/lastrev-libraries/actions/workflows/run-tests.yml/badge.svg)](https://github.com/last-rev-llc/lastrev-libraries/actions/workflows/run-tests.yml)

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

## Updating existing projects

_Make sure to check the changelog and migration guide before starting this process: [starter changelog](examples/lastrev-next-starter/CHANGELOG.md)_

The update script is available to update projects created from the Last Rev Next Starter to the latest version.
The current script has been added as a CLI command: `last-rev framework-update`

This command takes 2 required options (SOURCE_COMMIT, TARGET_COMMIT), and 1 optional (PROJECT_DIRECTORY)

- `-s` for `SOURCE_COMMIT`: This is the commit hash, or branch name, of the current version of the project that is being updated (e.g. `v1`).
  - Check the earliest commit where an update to the frmework happended. Either the initiali commit or a past update. Then cross-reference that with the history of the starter project.
- `-t` for `TARGET_COMMIT`: This is the commit hash, or branch name, of the target version that you want to update to (e.g. `main`).
- `-d` for `PROJECT_DIRECTORY`: This is the directory of the project that is being updated.
  - this is an optional parameter
  - default is current working directory
  - ** `<project_directory`> must be an absolute path to the project directory.**

To run the command you need to run the following command:

```bash
 last-rev framework-update -s <source_commit> -t <target_commit> -d <project_directory>
```

The process will update the project to the target version and create a commit with all the changes from the project.

### Solving conflicts when updating

During the update process the following steps are taken:

- A diff is created between the source and target commits on the starter project
- The diff is applied to the project directory
- The project is checked for conflicts
- If there are conflicts, the user is prompted to resolve them through the code editor
- After resolving the conflicts, the project is checked for conflicts again and if successful a commit is created with the changes

Even if there are no conflicts the user needs to manually review the changed files to ensure that all changes look good.

_For more details about migrating and breaking changes take a look at the [starter changelog](examples/lastrev-next-starter/CHANGELOG.md)_
