# Overview

This library syncs content from s3 to the local filesystem. Can be called directly from code as a library, or as a CLI.

# Requirements

This cli requires the [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) to be installed and the binary available on the path of your current environment.

In a Netlify build, you must make sure to install the AWS CLI prior to running this command using a script such as the one below:

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip -q awscliv2.zip
mkdir aws-home
./aws/install -i ~/aws-home -b /opt/buildhome/.binrc/bin
```

# Usage

## CLI

```bash
npm install -g @last-rev/cli

last-rev s3-sync -d graphql/content
```

See [Docs](../cli/src/commands/s3-sync/README.md) for details on the parameters.

## Library

```Javascript
import sync from '@last-rev/contentful-s3-sync'

async function () {
  await sync({
    rootDir: './graphql/content', // Root directory to sync content to
    space: process.env.CONTENTFUL_SPACE_ID, // Contentful space ID
    environment: process.env.CONTENTFUL_ENV || 'master', // Contentful environment
    isPreview: true
  });
};
```

# Output

The library outputs all content to the passed in `rootDir` location in the following structure:

- Entries: `{space_id}/{environment}/{preview_or_production}/entries/{entry_id}.json`
- Assets: `{space_id}/{environment}/{preview_or_production}/assets/{asset_id}.json`
- Content Types: `{space_id}/{environment}/{preview_or_production}/content_types.json`
- ContentType/Slug ID lookup: `{space_id}/{environment}/{preview_or_production}/content_type_slug_lookup.json`
- Entry IDs by Content type lookup: `{space_id}/{environment}/{preview_or_production}/entry_ids_by_content_type_lookup.json`

The `content_type_slug_lookup.json` will be a JSON file with key value mappings of `${contentTypeId}:${slug}` to content id:

```json
{
  "pageGeneral:home": "8cvbh39fn12333",
  "pageGeneral:about": "00v83bnnju3r999g",
  "pageRecipe:burger": "00gjh3000fjf877f"
}
```

The `entry_ids_by_content_type_lookup.json` will be a JSON file with key value mappings of `contentTypeId` to content id:

```json
{
  "pageGeneral": ["8cvbh39fn12333", "gbv983nf89hdffg"],
  "pageRecipe": ["00gjh3000fjf877f", "vv92bnrff7823gf"]
}
```
