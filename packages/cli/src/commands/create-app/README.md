# Description

This command will create an app from one of last-rev's [example apps](../../../../../examples).

The command will prompt you for the name of the new project, and will then authenticate you into github to access the lastrev-libraries repo.

This will then do a couple things:

1. Extract the contents of the example archive to the targeted directory
2. rename the packages based on the provided project name
3. Use yarn to install all dependecies


# usage

> Prerequisite, Install the Last Rev CLI

```sh
npm install @last-rev/cli
```

> If you are using Contentful, create the new space first and then run the following command.

```sh
last-rev create-app

```
> Prerequisite, Create a New Space in Contentful for the site
1. Go to Contentful and login
2. Click on your organization in the upper left corner of the screen
3. Choose "Add a Space" to your organization and follow the instructions
> NOTE: If this is a new customer project you can use our Last Rev organization and create a new Partner Project Space. Fill out the information and give it a launch date 6 months in the future.

> Important: If you do not copy the content from the starter space, you will need to ccreate the following content items for your project to build correctly
1. Site (You must add this content entry ID to your .env file) example: `DEFAULT_SITE_ID=10Gmpgoe7XdTwGmwXAyzah`
2. At least one page
3. Header (added to the Site) item

## Steps

1. Choose the actions you'd like to perform. All options are selected by default.
2. (Only the first time) Login to Contentful and copy the API key.
3. Select the Contentful Space and Environment you'd like to use for the NEW site.
4. Enter in your redis host information, if you don't have this currently, enter in any value for now.
  * Username: redis
  * Password: lastrev
  * Port: 12345
6. Select the Contentful Space and Environment you'd like to copy from. ( Example: Last Rev Framework Starter )
7. Choose the Contentful items you'd like to export to the new space. ( Entries, Assets, Content Models )
8. Select the starter that you'd like to base your project off of. (Right now we only have one)
9. Authorize Github
10. Choose the local directory you want the repo stored in. Default is current directory.
11. Name your project and choose if you want to create a new repository.
12. Authorize Netlify and choose where you would like to create the new site.
13. Choose to install the dependancies to run locally

Now your project should be local and ready to go! 

Running Locally
To start running the project locally please follow the [instructions here](https://docs.google.com/document/d/1pmVpw7tpe8l1EEpNRt-97cnIy-9oivB3qhz-aKIqwZ8/edit#)

There are a few known issues at the moment:
1. In order to run yarn and install dependencies you will need to make sure you are running the correct version of node. `nvm use` will automatically switch to the correct version if you have it installed. To install a new version of node you can use `nvm install 16.14.0` or you can use the LTS version `nvm install --lts`
2. Search and replace through all your files and replace all instances of @lrns with @<name of your project>
3. The DOMAIN env variable is not set using the CLI. Please add it to your .env file with your package name `DOMAIN=<your package name>`
⋅⋅* `yarn propagate:env` to copy all of the variables to each package
4. After installing all dependencies run `yarn build` in your terminal to build all of the dist folders

```text
Options:
-e --example <example> Name of the last-rev example to use (default: "lastrev-next-starter")
-d --directory <directory> Directory in which to extract the project (default: ".")
-h, --help display help for command
```
