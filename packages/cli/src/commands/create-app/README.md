# Description

This command will create an app from one of last-rev's [example apps](../../../../../examples).

The command will prompt you for the name of the new project, and will then authenticate you into github to access the lastrev-libraries repo.

This will then do a couple things:

1. Extract the contents of the example archive to the targeted directory
2. rename the packages based on the provided project name
3. Use yarn to install all dependecies

At this point, you just need to add a `.env` file with your environment variables to some of the packages (each package will have a README detailing the required env variables) and you should be ready to start building the project.

# usage

Options:
-e --example <example> Name of the last-rev example to use (default: "lastrev-next-starter")
-d --directory <directory> Directory in which to extract the project (default: ".")
-h, --help display help for command
