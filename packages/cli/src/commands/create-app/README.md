# Description

This command will create an app from one of last-rev's [example apps](../../../../../examples).

The command will prompt you for the name of the new project, and will then authenticate you into github to access the lastrev-libraries repo.

This will then do a couple things:

1. Extract the contents of the example archive to the targeted directory
2. rename the packages based on the provided project name
3. Use yarn to install all dependecies

At this point, you just need to add a `.env` file with your environment variables to some of the packages (each package will have a README detailing the required env variables) and you should be ready to start building the project.

# usage

> Prerequisite, Install the Last Rev CLI

```sh
npm install @last-rev/cli
```

> If you are using Contentful, create the new space first.

## Steps

1. Choose the actions you'd like to perform. All options are selected by default.
2. (Only the first time) Login to Contentful and copy the API key.
3. Select the Contentful Space and Environment you'd like to use for the NEW site.
4. Enter in your redis host information, if you don't have this currently, enter in any value for now.
5. Select the Contentful Space and Environment you'd like to copy from. ( Example: Last Rev Framework Starter )
6. Choose the Contentful items you'd like to export to the new space. ( Entries, Assets, Content Models )
7. Select the starter that you'd like to base your project off of.
8. Authorize Github
9. Choose the local directory you want the repo stored in. Default is current directory.
10. Name your project and choose if you want to create a new repository.
11. Authorize Netlify and choose where you would like to create the new site.
12. Choose to install the dependancies to run locally

```sh
last-rev create-app

```

```text
Options:
-e --example <example> Name of the last-rev example to use (default: "lastrev-next-starter")
-d --directory <directory> Directory in which to extract the project (default: ".")
-h, --help display help for command
```
