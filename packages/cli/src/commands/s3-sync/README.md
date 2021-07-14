# Description

Syncs content from S3 to the file system. Currently, only Contentful structure is supported.

# Usage

```text
Usage: s3-sync [options]

Options:
  -d, --contentDir <content directory>           Directory in which to write synced files
  -a, --api-key <LastRev API Key>                LastRev API Key
  -c, --cms <string>                             CMS to sync  (default: "Contentful")
  -u --api-url <api URL>                         URL of LastRev API to generate credentials from
  -p --preview                                   Sync preview content?, defaults to false (default: false)
  -e --contentful-env <contentful environement>  Contentful environment, defaults to env variable CONTENTFUL_ENV or "master" (default: "master")
  -h, --help                                     display help for command
```

# Detailed documentation

By CMS:

- Contentful - Please see the documentation for [@last-rev/contentful-s3-sync](../../../../contentful-s3-sync/README.md)
