Summary:
This script is responsible for configuring the application based on environment variables and external services such as Contentful, Algolia, and Redis. It creates an instance of LastRevAppConfig, a configuration class, and exports it for use throughout the application.

Import statements:
1. dotenv: Loads environment variables from a .env file into process.env.
2. LastRevAppConfig: Imports the LastRevAppConfig class from the '@last-rev/app-config' package.
3. graphql-extensions: Imports the graphql-extensions module.
4. path: Imports the resolve function from the path module.

Script Summary:
The script begins by loading environment variables using dotenv and defining utility functions for parsing and validating environment variables. It then creates an instance of LastRevAppConfig with various configuration options based on the environment variables.

Internal Functions:
1. testForEnvVar(name): Checks if the specified environment variable exists and returns its value. Throws an error if the variable is not found.
2. parseNumberEnvVar(value): Parses a string value to an integer if it is a valid number, otherwise returns undefined.
3. parseBooleanEnvVar(value): Parses a string value to a boolean based on specific true values, otherwise returns false.

External Functions:
None

Interaction Summary:
This file interacts with the rest of the application by providing a centralized configuration for various services such as Contentful, Algolia, Redis, and GraphQL. Other parts of the application can import this configuration and use it to connect to these services.

Developer Questions:
1. How are environment variables loaded and validated in this script?
2. What are the configuration options available for Contentful, Algolia, Redis, and GraphQL?
3. How can other parts of the application access and use this configuration?
4. What happens if a required environment variable is missing or invalid?
5. How are boolean and numeric environment variables parsed and validated?