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
  -h, --help                                  display help for command
```

Example:

```bash
last-rev gql-serve -e graphql/extensions
```

# Server Documentation

See [@last-rev/graphql-contentful-core](../../../../graphql-contentful-core/README.md) for server documentation.
