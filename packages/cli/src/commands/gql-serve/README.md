# Description

Starts the last-rev graphql server. This will generate a default schema based on the types in your CMS (Currently, only Contentful is supported).

If an optional extensions directory is passed in, all files in that directory will be loaded and the extensions will be read in. See [below](#extension-file-format) for expected file format

# Usage

```txt
Usage: gql-serve [options]

Options:
  -c, --config <config file>                          Path to a config file
```

Example:

```bash
last-rev gql-serve -e graphql/extensions -c graphql/config
```

# Config File

The config file should be a javascript file exporting the following values:

```Javascript
{
  // optional parsed extensions
  extensions: {
    typeDefs, // am optional string or documentnode with defined typeDefs
    resolvers, // an optional resolvers object
    mappers, // an optional mappers object
    typeMappings, // an optional typeMappings object
    pathsConfigs, // an optional paths config object
  },
  // optional directory pointing to individual files containing extensions
  // will only be read if "extensions" is not defined
  // path should be relative to the config file
  extensionsDir,
  // optional cms to use. Currently only "Contentful" supported
  // defaults to "Contentful"
  cms,
  // optional port. Defaults to 5000
  port,
  // optional hostname. Server will be started on localhost if not provided
  host,
  // reqiured: the directory where content JSON files are located
  // path should be relative to the config
  contentDir
}
```

# Server Documentation

See [@last-rev/graphql-contentful-core](../../../../graphql-contentful-core/README.md) for server documentation.

# Developing locally

1. Install nodemon globally, if not installed already

```bash
npm install -g nodemon
```

2. Compile the code in watch mode

```bash
yarn dev
```

2. In a separate terminal window, navigate to the root of the project you want to run the server in

```bash
cd dev/my-other-project
```

3. Using nodemon, run the server, using the relative path of the `last-rev` bin file, and point it to watch the packages directory of the monorepo

```bash
nodemon -x '../lastrev-libraries/packages/cli/bin/last-rev gql-serve -c graphql/config' -w ../lastrev-libraries/packages
```

4. Any time a change is made in the monorepo, the server will restart automatically. If you want to also restart when the extensions directory changes, you can either just type `rs` in the terminal running nodemon, or add the directory to the nodemon watch argument
