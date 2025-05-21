# Installation

NPM:

```bash
npm install @last-rev/cli -g
```

Yarn:

```bash
yarn global add @last-rev/cli
```

## Known Issues:

1. Some setups will erquire you to run the following command to update your Path depending on where you have yarn installed

```bash
export PATH="$(yarn global bin):$PATH"
```

# Usage

```bash
last-rev {command} {...args}
```

See below for specific command usage

# Commands

## cms-sync

### Description

Syncs content from your CMS to the file system. Currently, only Contentful is supported.

### Usage

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

### Detailed documentation

By CMS:

- Contentful - Please see the documentation for [@last-rev/contentful-sync-to-fs](../../../../contentful-sync-to-fs/README.md)

## create-app

### Description

This command will create an app from the lastrev starter.

The command will prompt you for the name of the new project, and will then authenticate you into github to access the lastrev-starter-v2 repo.

This will then do a couple things:

1. Extract the contents of the starter archive to the targeted directory
2. Rename the packages based on the provided project name
3. Create a github repo if one does not exist
4. Create the netlify sites associated with the project
5. Import content from a Contentful starter space.

### Best Practices

The best way to use this utility is to do everything all at once.

- Create an empty contentful space
- Do not use an existing github repo, the app will do that for you.
- Do not set up the netlify sites, the app will do that for you.

### Preparation

> Prerequisite, Create a New Space in Contentful for the site

1. Go to Contentful and login
2. Click on your organization in the upper left corner of the screen
3. Choose "Add a Space" to your organization and follow the instructions
   > NOTE: If this is a new customer project you can use our Last Rev organization and create a new Partner Project Space. Fill out the information and give it a launch date 6 months in the future.

> Important: If you do not do the contentful import from this CLI, you will need to create the following content items for your project to build correctly (but please try to avoid this, and use the CLI to do that instead.)

1. Site (You must add this content entry ID to your .env file) example: `DEFAULT_SITE_ID=10Gmpgoe7XdTwGmwXAyzah`
2. At least one page
3. Header (added to the Site) item

> Prerequisite, Gather the information needed to create the app.

1. The Space ID and environment of your new contentful space
2. The Space ID and environment of the space you want to import content from
3. The Team slug of the netlify account you want to creat the sites in
4. The Redis host/port/password of the redis instance you want to use (or leave these blank for now)
5. The slug of the github organization you want to create the repo in, or the org/name of the existing repo you want to use
6. The Google Tag Manager ID of the GTM you want to use (or leave it blank for now)

### Steps

4. Create the directory for the new project: `mkdir {project-name}`
5. CD into the directory: `cd {project-name}`
6. Run `last-rev create-app`. - This will create a sample `create-app.json` in the directory. The JSON represents the simplest possible configuration for the app. (see below for more configuration options)
7. Edit the `create-app.json` file to add in your app-specific configuration.
8. Run `last-rev create-app` again. Since the JSON exists, this will run the app creation and other steps according to the JSON.
9. If you have not previously connected with different third party services (Netlify, Github, Contentful), you will be walked through the process to do this.
10. At this point, all processes will run. At the end, you will see some output messages telling you information about the app.

### Running Locally

1. run `nvm install && nvm use && yarn` to install the dependencies and get the project to a running state.
2. run `yarn propagate-env && yarn build` to do an initial build of the app.
3. You are now ready to serve the built site (`yarn serve`) or run it in dev mode `yarn dev`.

Running locally: [instructions here](https://docs.google.com/document/d/1pmVpw7tpe8l1EEpNRt-97cnIy-9oivB3qhz-aKIqwZ8/edit#)

> IMPORTANT: Prior to loading the dev site in the browser, you will have to prime the redis cache by making a change to a piece of content in Contentful. Otherwise, the site will load, but you will see no content. This is due to a known issue that should be fixed in the future.

### JSON configuration

Below are the full JSON configuration options:

```javascript
{
  // Configuration for creating the app. Leave this empty if you have already
  // created the app and just want to run the other parts of the command.
  // Drop this element if you just want to run one of the other processes
  app: {
    // project name, required.
    name: string;
    // defaults to lastrev-next-starter
    starter: string;
    // Space ID of the target contentful space you will be using in this app, required.
    contentfulSpaceId: string;
    // Name of the target contentful environmnent you will be using in this app, defaults to "master".
    contentfulEnv: string;
    // Repo name of the github repo to use for this app.
    // Used for creating the repo, but if one exists already, that will be used
    // and a new one will not be created. Some steps will be skipped, however.
    // If a repo name is not provided, will default to app.name
    repoName: string;
    // The owner of the github repo. Generally should be an organization, but could be your personal account name.
    // the github repo is a combination of name and owner
    // if an owner is not provided, the current logged in user will be used.
    repoOwner: string;

    // Only needed if netlify dev site is not being created as part of this run
    // The Domaibn URL of the netlify dev site
    // Will be used to set up the contentful webhooks for the app
    devDomainUrl: string;
  };
  // A redis user configured with access to only the current space. Usually this will be created as part of the create-app process and should be omitted. But if a user has already been created, provide the info below
  redis: {
    // The redis host to use for the app. Required if providing any config for the redis section.
    host: string;
    // The redis port to use for the app. Required if providing any config for the redis section.
    port: number;
    // The redis password to use for the app. Required if providing any config for the redis section.
    password: string;
    // The redis username to use for the app. Required if providing any config for the redis section.
    username: string;
  };
  // Configuration to set up your netlify sites. Leave this empty if you have already
  // created the sites and just want to run the other parts of the command
  // If you are running this separately from the app creation process, you will need to
  // provide at least on of devSiteName/prodSiteName/storybookSiteName.
  // drop this element if you do not want to create the netlify sites.
  netlify: {
    // The slug of the netlify account to use for this app.
    // You can get this from the URL when you are on the team page:
    // https://app.netlify.com/teams/{this is the slug}/overview
    // This is required
    accountSlug: string;
    // The name of the netlify develop site to create.
    // required if app is not being created at the time of this run,
    // otherwise defaults to {app-name}-dev
    devSiteName: string;
    // The name of the netlify production site to create.
    // required if app is not being created at the time of this run,
    // otherwise defaults to {app-name}-prod
    prodSiteName: string;
    // The name of the netlify storybook site to create.
    // required if app is not being created at the time of this run,
    // otherwise defaults to {app-name}-storybook
    storybookSiteName: string;
  };
  // Configuration for importing contentful entries/models/assets/extensions
  // drop this element if you do not wish to do this as part of this run.
  contentfulImport: {
    // The ID of the Contentful space to import from. Required.
    sourceSpaceId: string;
    // The name of the Contentful environment to import from. will default to "master".
    sourceEnv: string;
    // The ID of the Contentful space to import into.
    // If you are creating an app as part of this run, leave this blank,
    // the spaceId from that config will be used.
    targetSpaceId?: string;
    // The name of the Contentful environment to import into.
    // If you are creating an app as part of this run, leave this blank,
    // the spaceId from that config will be used.
    // otherwise, will default to "master"
    targetEnv: string;
    // set this to true if you want to skip importing the contentful content types.
    // at least one of these next three fields must be false
    // defaults to false
    skipContentTypes: boolean;
    // set this to true if you want to skip importing the contentful entries.
    // defaults to false
    skipEntries: boolean;
    // set this to true if you want to skip importing the contentful assets.
    // defaults to false
    skipAssets: boolean;
    // set this to true if you want to skip importing the contentful UI Extensions.
    // defaults to false
    skipExtensions: boolean;
  };
};
```

## develop

### Description

A utility to help set up and restore development environments to use lastrev-libraries locally against a client project.

### Usage

```text
Usage: develop [options] [command]

Options:
  -h, --help           display help for command

Commands:
  configure [options]  Configure the monorepo in the current directory to run with some local lastrev libraries
  info                 Show information about the current development environment
  restore              Restore the current project to use no local lastrev libraries
  fix                  Fix the current development environment
  help [command]       display help for command

```

## reports

### description

Runs a set of reports on customer data in Contentful

### usage

```text
Usage: reports [options]

Run reports on a Contentful export

You must first have a file location of an existing contentful export, using the contentful-cli (https://www.npmjs.com/package/contentful-cli)
Run the following steps to generate the export:

contentful login (make sure that you are logged into an account with access to the space you want to export)
contentful space export --space-id {spaceId} --environment-id {envId} --export-dir {exportDir} --inlcude-drafts


Options:
  -s, --spaceId <spaceId>          Contentful space ID
  -i, --input-file <inputFile>     Input file
  -e, --environment <environment>  Contentful environment (default: "master")
  -o, --output-dir <outputDir>     Output directory (defaults to current working directory)
  -r, --reports <reports>          Reports to run, comma separated. Leave blank for all. Available reports:
                                   asset_report, content_type_ref_report, content_type_status_report,
                                   entry_ref_report, entry_ref_status_report, field_report
  -h, --help                       display help for command


```

## gen-fragments

### Description

Generates fragments from a contentful configuration.

### Usage

```text
Usage: gen-fragments [options]

Options:
  -i --input-dir <Input Directory>                            Path to a directory with contentJson files
  -o --output-dir <Output Directory>                          Path to a directory where generated files will be written
  -e --contentful-environment <Contentful Environment>        Contentful environment to use, defaults to CONTENTFUL_ENV environment variable, or "master" (default: "master")
  -t --contentful-delivery-token <Contentful Delivery Token>  Contentful delivery access token, defaults to CONTENTFUL_DELIVERY_TOKEN environment variable
  -s --contentful-space-id <Contentful Space ID>              Contentful space ID, defaults to CONTENTFUL_SPACE_ID environment variable
  -l, --link-content-type <Link Content Type ID>              The ID of the Link or Element Link content type to convert
  -h, --help                                                  display help for command
```

## sanity-import

### Description

Pulls Contentful content types from a space and environment and generates matching Sanity schema files.

### Usage

```text
Usage: sanity-import [options]

Options:
  -s, --space-id <spaceId>                Contentful space id
  -e, --environment <environment>         Contentful environment (default: "master")
  -m, --management-token <managementToken>  Contentful management token
  -p, --sanity-project-id <sanityProjectId> Sanity project id
  -d, --sanity-dataset <sanityDataset>    Sanity dataset
  -t, --sanity-token <sanityToken>        Sanity token
  -o, --output-dir <outputDir>            Output directory (default: "schemas")
  -h, --help                              display help for command
```

## gql-serve

### Description

Starts the last-rev graphql server. This will generate a default schema based on the types in your CMS (Currently, only Contentful is supported).

If an optional extensions directory is passed in, all files in that directory will be loaded and the extensions will be read in. See [below](#extension-file-format) for expected file format

### Usage

```txt
Usage: gql-serve [options]

Options:
  -c, --config <config file>                          Path to a config file
```

Example:

```bash
last-rev gql-serve -e graphql/extensions -c graphql/config
```

### Config File

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

### Server Documentation

See [@last-rev/graphql-contentful-core](../../../../graphql-contentful-core/README.md) for server documentation.

### Developing locally

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

### Developing New Commands

1. Create a new directory/folder in `/src/commands` and name it what you want the new command to be called

2. Create a new file (.ts) in the new directory/folder you created in step 1

3. Create your new command using the commander package

- Look at cms-sync.ts as a simple example

4. Add new command to `/src/index.ts` file

- Example:
  ```bash
  .command('new-command', 'Description of new command', {
    executableFile: resolve(__dirname, '../dist/new-command.js')
  })
  ```

5. Add new command's path to `rollup.config.js` file

- Example:
  ```bash
  './src/commands/new-command/new-command.ts'
  ```

6. Test command locally

- Run in dev mode
  - Example:
    ```bash
    yarn dev --scope=@last-rev/cli
    ```
- Open new terminal and run `which last-rev`
  - This will show you which last-rev library version you are using
    - If it is not your local version then export it
      - Example:
        ```bash
        export PATH=/Users/anthonywhitley/repos/lastrev-libraries/packages/cli/bin:$PATH
        ```
- You should now be able to test your new command by running `last-rev <new-command>` in the same terminal session
