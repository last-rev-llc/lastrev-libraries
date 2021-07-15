# Description

Syncs content from S3 to the file system. Currently, only Contentful structure is supported.

# Usage

```text
Usage: cms-sync-s3 [options]

Options:
  -d, --contentDir <content directory>           Directory in which to write synced files
  -a, --api-key <LastRev API Key>                LastRev API Key, defaults to env variable LAST_REV_API_KEY
  -c, --cms <string>                             CMS to sync  (default: "Contentful")
  -u --api-url <api URL>                         URL of LastRev API to generate credentials from
  -p --preview                                   Sync preview content?, defaults to env variable LAST_REV_SYNC_PREVIEW or false
  -e --contentful-env <contentful environement>  Contentful environment, defaults to env variable CONTENTFUL_ENV or "master" (default: "master")
  -h, --help                                     display help for command
```

# Detailed documentation

By CMS:

- Contentful - Please see the documentation for [@last-rev/contentful-s3-sync](../../../../contentful-s3-sync/README.md)
