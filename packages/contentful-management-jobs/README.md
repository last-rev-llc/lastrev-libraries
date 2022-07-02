# Contentful Management Jobs
Package that contains a bunch of common Contentful content management jobs. Bulk migrations, queries, edits and updates to content entries, assets and content models whould be done using this packaage.

## Jobs
- [Bulk Upload Assets](#bulk-asset-upload)


> Note: Please use great care in updating customers content


### Bulk Asset Upload
The Bulk Asset Uploader will allow you to upload a batch of assets that are located your local machine.
 
***Required .env Variables***
CONTENTFUL_SPACE_ID
CONTENTFUL_MANAGEMENT_API

***Required Global File Variables***
- IS_DEBUG_MODE: Onyl prints out the image local paths and if it will be uploaded or skipped
- BASE_FOLDER_PATH: The local folder to import assets from
- FOLDER_DELIMETER: Must be alphanumeric characters, dots (.) hyphens (-) or underscores (_)
- INVALID_FILE_DELIMETER: Must be alphanumeric characters, dots (.) hyphens (-) or underscores (_)
