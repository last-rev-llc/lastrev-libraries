# Contentful Management Jobs
Package that contains a bunch of common Contentful content management jobs. Bulk migrations, queries, edits and updates to content entries, assets and content models whould be done using this packaage.

## Jobs
- [Bulk Upload Assets](#bulk-asset-upload)
- [YAML File Import](#yaml-contentful-import)


> Note: Please use great care in updating customers content

***Required .env Variables***
```
CONTENTFUL_SPACE_ID
CONTENTFUL_MANAGEMENT_API
```

## Jobs
### Bulk Asset Upload
The Bulk Asset Uploader will allow you to upload a batch of assets that are located your local machine.

1. Create a Folder on your machine with all of the valid assets (Img PDF Video etc), that you want to upload to Contentful
2. Update the BASE_FOLDER_PATH with the root folder location of the images you want to import
3. Open your terminal and run `npm run bulk-asset-uload`

- It will import all images including sub folders
- It will create the asset with the ID based on a hash value of the relative path of the image. You want to ensure that the image path is unique and represents how it is using in the content import 

***Required Global File Variables***
- IS_DEBUG_MODE: Onyl prints out the image local paths and if it will be uploaded or skipped
- BASE_FOLDER_PATH: The local folder to import assets from
- FOLDER_DELIMETER: Must be alphanumeric characters, dots (.) hyphens (-) or underscores (_)
- INVALID_FILE_DELIMETER: Must be alphanumeric characters, dots (.) hyphens (-) or underscores (_)


### YAML to Contentful Import
The YAML to Contentful Import is a job that allows you to specify one directory at a time, one main content type at a time. It will allow you to override fields with your own values by using functions. 

***Required Global File Variables***
- CONTENTFUL_CONTENT_TYPE_TO_IMPORT = 'accelerator'; // The main content type that is being imported
- LOCALE = 'en-US'; // The locale of the content type
- MAX_NUMBER_OF_FILES = 2;  // The maximum number of files to import at once, used for debugging purposes
- BASE_FOLDER_PATH = '/Users/bradtaylor/Desktop/yaml/accelerators'; // The local folder to import yaml files from
- ENVIRONMENT = 'yaml-test'; // make sure you update the environment;

1. Create a folder on your machine that has all of the yaml files you want to import (it will exclude directories)
2. Update all of the required global variables
3. Open the terminal and run `npm run bulk-asset-uload`
