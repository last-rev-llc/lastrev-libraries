## Contentful Migrations
Whenever you need to make changes to the contentful content models or space setup you MUST create a migration script to do this. Please do not make any changes on master in the UI. The CLI makes this very easy to do.

### Installing the CLI
Install the Contentful CLI globably so it is available for all projects
```
yarn global add contentful-cli
```

Login to the CLI. This will open a web browser and give you a Content Management Token you can use as the CONTENTFUL_MANAGEMENT_API .env variable
```
contentful login
```

To begin any new project with changes to the contentful space please create a new [environment in Contentful](https://www.contentful.com/developers/docs/concepts/multiple-environments/)

### Updating the Content Models
To make changes to the content models you can:
1. Go into the new environment in Contentful and make your changes in the UI
2. Generate a migration file for a specific content model or content type [API docs](https://github.com/contentful/contentful-cli/tree/master/docs/space/generate/migration)
```
contentful space generate migration -e [environment_name] -c [content_model_id] -f migrations/migration-filename.js
```
TODO: We want to be able to do this through a CLI script

**Things to remember**
* The migration script only generates changes to the fields. If you remove fields you will need to edit the generated script to delete the files
* If you need to migrate content entries to use the updated fields, you must write
 that in the script as well

>Please visit the [API docs](https://github.com/contentful/contentful-migration) for more information on content migration

### Run the migration
Once you have the migration script you can do the following:

* Move the migration file to the `./packages/migrations/scripts` folder and give it the file name format `JIRA-XXX-SUMMARY.js`
* Open the file `./packages/migrations/index.js`
update the following variables:
```
const CONTENTFUL_ENVIRONMENT = '';
const MIGRATION_FILE_NAME = '';
```
* Open the Terminal and run the following
```
cd ./packages/migrations
yarn migrate
```

It should then run the migration script on the environment that you specified. If everything runs correctly create a PR.
