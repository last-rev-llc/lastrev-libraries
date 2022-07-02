/* eslint-disable no-await-in-loop */
const sdk = require('contentful-management');
const fs = require('fs');
const path = require('path');

const IS_DEBUG_MODE = true;
const BASE_FOLDER_PATH = 'UPDATE PATH IN bulk-asset-upload.js'; // The local folder to import assets from
const FOLDER_DELIMETER = '_'; // Must be alphanumeric characters, dots (.) hyphens (-) or underscores (_)
const INVALID_FILE_DELIMETER = '-'; // Must be alphanumeric characters, dots (.) hyphens (-) or underscores (_)
const ENVIRONMENT = 'bulk-upload'; // make srue you update the environment;
const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CMA_ACCESS_TOKEN = process.env.CONTENTFUL_MANAGEMENT_API;

const sdkClient = sdk.createClient({
  spaceId: SPACE_ID,
  accessToken: CMA_ACCESS_TOKEN
});

const getContentType = (fileExtension) => {
  switch (fileExtension) {
    case 'jpg':
    case 'png':
    case 'jpeg':
    case 'gif':
      return `image/${fileExtension}`;
    case 'svg':
      return 'image/svg+xml';
    case 'pdf':
      return 'application/pdf';
    case 'txt':
      return 'text/plain';
    default:
      return false;
  }
};

const logError = (error, fromPath, errorPath) => {
  if (fromPath) {
    if (!IS_DEBUG_MODE) {
      fs.rename(fromPath, errorPath, () => {
        console.log(`Error: ${fromPath}`);
      });
    }
  }
  console.log(error);
};

const cleanupEntryId = (folderPath) => {
  // The resource ID restrictions for contentful are here:
  // https://www.contentful.com/developers/docs/references/content-management-api/#/introduction/resource-ids
  let entryId = folderPath.replace(BASE_FOLDER_PATH, '');
  // replace all instances if '/' with FOLDER_DELIMETER variable
  entryId = entryId.replace(/\//g, FOLDER_DELIMETER);
  // check if entyryId matches regex of /^[a-zA-Z0-9-_.]{1,64}$/
  if (!entryId.match(/^[a-zA-Z0-9-_.]{1,64}$/)) {
    // replace invalid characters with INVALID_FILE_DELIMETER
    entryId = entryId.replace(/[^a-zA-Z0-9-_.]/g, INVALID_FILE_DELIMETER);
    // truncate from begining to 64 characters
    if (entryId.length > 64) {
      entryId = entryId.substring(0, 63);
    }
  }

  // remove FOLDER_DELIMETER from beginning of entryId
  if (entryId.charAt(0) === FOLDER_DELIMETER) {
    entryId = entryId.substring(1);
  }

  return entryId;
};

const cleanUpTitle = (folderPath) => {
  let title = folderPath.replace(BASE_FOLDER_PATH, '');
  // replace all instances if '/' with FOLDER_DELIMETER variable
  title = title.replace(/\//g, FOLDER_DELIMETER);
  // truncate to 255 characters if title is greater than 255 characters
  if (title.length > 255) {
    title = title.substring(0, 254);
  }
};

const fileExtensions = [];
const uploadAssetToContentful = async (fromPath, errorPath) => {
  const fileExtension = fromPath.split('.').pop();
  const contentType = getContentType(fileExtension);

  if (contentType) {
    fileExtensions.push(contentType);
    const fileName = cleanupEntryId(fromPath);

    const title = cleanUpTitle(fromPath);

    const space = await sdkClient.getSpace(SPACE_ID);
    const env = await space.getEnvironment(ENVIRONMENT);
    const upload = await env
      .createUpload({
        file: fs.readFileSync(fromPath),
        contentType,
        fileName
      })
      .catch((error) => logError(error, fromPath, errorPath));

    let asset = await env
      .createAssetWithId(fileName, {
        fields: {
          title: {
            'en-US': title
          },
          file: {
            'en-US': {
              fileName,
              contentType,
              uploadFrom: {
                sys: {
                  type: 'Link',
                  linkType: 'Upload',
                  id: upload.sys.id
                }
              }
            }
          }
        }
      })
      .catch((error) => logError(error, fromPath, errorPath));

    asset = await asset
      .processForLocale('en-US', { processingCheckWait: 2000 })
      .catch((error) => logError(error, fromPath, errorPath));
    asset = await asset.publish().catch((error) => logError(error, fromPath, errorPath));

    return asset;
  }
  return false;
};

const getAllImagesInFolder = async (FOLDER_PATH) => {
  try {
    const files = await fs.promises.readdir(FOLDER_PATH);

    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const fromPath = path.join(FOLDER_PATH, file);

      const toPath = path.join(`${FOLDER_PATH}/completed`, file);
      const errorPath = path.join(`${FOLDER_PATH}/errors`, file);

      try {
        const stat = await fs.promises.stat(fromPath);
        // if file is not a directory else if its path is not toPath or errorPath
        if (!stat.isDirectory()) {
          console.log('Uploading: ', fromPath);
          if (!IS_DEBUG_MODE) {
            await uploadAssetToContentful(fromPath, errorPath);

            fs.rename(fromPath, toPath, () => {
              console.log(`Success: ${file}`);
            });
          }
        } else if (stat.isDirectory() && file.toString() !== 'errors' && file.toString() !== 'completed') {
          console.log('Getting images in: ', fromPath);
          if (!IS_DEBUG_MODE) {
            const DIR_FOLDER_PATH = path.join(FOLDER_PATH, file);
            getAllImagesInFolder(DIR_FOLDER_PATH);
          }
        } else {
          console.log('Skipping: ', fromPath);
        }
      } catch (err) {
        logError(err, fromPath, errorPath);
      }
    }
  } catch (error) {
    logError(error);
  }
};

(async () => {
  await getAllImagesInFolder(BASE_FOLDER_PATH);
})();
