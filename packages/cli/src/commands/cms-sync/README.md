# Description

Syncs content from your CMS to the file system. Currently, only Contentful is supported.

# Usage

```text
Usage: cms-sync [options]

Options:
  -d, --contentDir <content directory>        Directory in which to write synced files
  -c, --cms <string>                          CMS to sync  (default: "Contentful")
  --contentful-access-token <access token>    Contentful Access Token, defaults to env variable CONTENTFUL_ACCESSTOKEN
  --contentful-space-id <space id>            Contentful Space ID, defaults to env variable CONTENTFUL_SPACE_ID
  --contentful-host <contentful host>         Contentful host, defaults to env variable CONTENTFUL_HOST
  --contentful-env <contentful environement>  Contentful environment, defaults to env variable CONTENTFUL_ENV
  -h, --help                                  display help for command
```

# Detailed documentation

By CMS:

- Contentful - Please see the documentation for [@last-rev/contentful-sync-to-fs](../../../../contentful-sync-to-fs/README.md)
