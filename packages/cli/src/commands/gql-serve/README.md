# Description

Starts the last-rev graphql server. This will generate a default schema based on the types in your CMS (Currently, only Contentful is supported).

If an optional extensions directory is passed in, all files in that directory will be loaded and the extensions will be read in. See [below](#extension-file-format) for expected file format

# Usage

```txt
Usage: gql-serve [options]

Options:
  -p, --port <port>                           Port to run the server on (default: 5000)
  -c, --cms <string>                          CMS to use for schema generation (default: "Contentful")
  -n, --hostname <hostname>                   Host to run the server on
  -e --extensions-dir <extensions directory>  Path to a directory containing extensions
  -d --content-dir <content directory>        Path to a directory containing synced CMS data
  -h, --help                                  display help for command
```

Example:

```bash
last-rev gql-serve -e graphql/extensions -d graphql/content
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
nodemon -x '../lastrev-libraries/packages/cli/bin/last-rev gql-serve -e graphql/extensions -d graphql/fs' -w ../lastrev-libraries/packages
```

4. Any time a change is made in the monorepo, the server will restart automatically. If you want to also restart when the extensions directory changes, you can either just type `rs` in the terminal running nodemon, or add the directory to the nodemon watch argument
