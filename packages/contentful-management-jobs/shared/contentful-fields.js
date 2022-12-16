/* eslint-disable no-console */
/* eslint-disable no-return-assign */
/* eslint-disable radix */
const MurmurHash3 = require('imurmurhash');
const TurndownService = require('turndown');
const { richTextFromMarkdown } = require('@contentful/rich-text-from-markdown');

const turndownService = new TurndownService({
  headingStyle: 'atx'
});

const getSpaceFieldTypeLookup = async (contentfulEnvironment) => {
  const contentTypes = await contentfulEnvironment.getContentTypes();
  // Loop through the values in contentful and return a new array with only the data we need
  // Could these be combined into one loop?
  return (contentTypeLookup = contentTypes.items
    .map((contentType) => {
      return {
        id: contentType.sys.id,
        fields: contentType.fields.map((field) => {
          return {
            id: field.id,
            type: field.type
          };
        })
      };
    })
    .reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {}));
};

const getContentfulFieldValue = async (value, fieldType, JOB, yamlObj) => {
  // console.log('getContentfulFieldValue fieldType: ', fieldType);
  // console.log('getContentfulFieldValue value: ', value);
  if (value) {
    switch (fieldType.type) {
      case 'Array':
        if (value?.length > 0 && typeof value[0] !== 'object') {
          return value;
        } else {
          console.log('field', { fieldType, value });
          return value?.split(',');
        }
      case 'Object':
        return value;
      case 'Link':
        return value;
      case 'Symbol':
        return Array.isArray(value) ? value : value.toString();
      case 'Integer':
        return parseInt(value);
      case 'Number':
        return parseFloat(value);
      case 'Boolean':
        return value === 'true';
      case 'Date':
        return value;
      case 'Text':
        return value;
      case 'RichText':
        // You need to convert to markdown before using the Rich Text Parser
        const markdownText = turndownService.turndown(value);
        // console.log('markdownText: ', markdownText);
        const richtext = await richTextFromMarkdown(markdownText);
        // console.log('richtext: ', richtext);
        return richtext;
      case 'Location':
        return value;
      case 'Asset':
        return {
          sys: {
            type: 'Link',
            linkType: 'Asset',
            id: value
          }
        };
      case 'Entry':
        return {
          sys: {
            type: 'Link',
            linkType: 'Entry',
            id: value
          }
        };
      case 'CustomParser':
        const parsedValue = await fieldType.customParser(value, JOB, yamlObj);
        return parsedValue;
      default:
        return value;
    }
  }
  return value;
};

const getAssetType = (fileExtension) => {
  switch (fileExtension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    case 'mp4':
      return 'video/mp4';
    case 'mov':
      return 'video/quicktime';
    case 'pdf':
      return 'application/pdf';
    case 'psd':
      return 'image/vnd.adobe.photoshop';
    case 'eps':
      return 'application/postscript';
    default:
      console.log('Warning: Unknown file extension: ', fileExtension);
      return 'image/jpeg';
  }
};

const getMediaObject = (media) => {
  let mediaObject = {};
  if (media) {
    mediaObject = media.length ? media[0] : media;
  }
  return mediaObject;
};

const cleanupId = (entryId) => {
  // check if entyryId matches regex of /^[a-zA-Z0-9-_.]{1,64}$/
  let cleanedId = entryId;
  if (!entryId.match(/^[a-zA-Z0-9-_.]{1,64}$/)) {
    // replace invalid characters with -
    cleanedId = entryId.replace(/[^a-zA-Z0-9-_.]/g, '-');
    // truncate from begining to 64 characters
    if (entryId.length > 64) {
      cleanedId = entryId.substring(0, 63);
    }
  }
  return cleanedId;
};

const getFileExtension = (url) => url?.split('.').pop();

const createFile = (url, fileName) => {
  return {
    contentType: getAssetType(getFileExtension(url)),
    fileName,
    upload: url
  };
};

const isVideo = (url) => {
  const fileExtension = getFileExtension(url);
  return fileExtension === 'mp4' || fileExtension === 'mov';
};

const getContentfulIdFromString = (string) => {
  const id = MurmurHash3(string).result().toString();
  if (!id) console.log('Warning ID is empty for string: ', string);
  return id;
};

const getAssetDetails = (url, publish, linkingId) => ({
  entryId: getContentfulIdFromString(url),
  url,
  publish,
  linkingId
});

const createAssetObject = ({ entryId, url, publish, linkingId }, assetEntry, videoStillImage) => ({
  linkingId,
  publish,
  entryId,
  url,
  assetEntry,
  videoStillImage
});

const createAssetEntry = (title, file) => ({
  fields: {
    title: {
      'en-US': title
    },
    file: {
      'en-US': file
    }
  }
});

const getVideoStillImage = ({ url, entryId, publish }, entry, title) => {
  let videoStillImage;

  if (isVideo(url)) {
    console.log(`video => ${entryId} for ${url}`);
    const stillImageUrl = url.split('.');
    // remove the file extension
    stillImageUrl.pop();
    // add the still image extension
    stillImageUrl.push('jpg');
    // join the array back into a string
    const imageUrl = stillImageUrl.join('.');

    videoStillImage = createAssetObject(
      getAssetDetails(entryId, imageUrl, publish, entry.sys.id),
      createAssetEntry(`${title} - Video Still Image`, 'jpg', imageUrl)
    );
  }
  return videoStillImage;
};

module.exports = {
  getSpaceFieldTypeLookup,
  getContentfulFieldValue,
  getContentfulIdFromString,
  getAssetType,
  cleanupId,
  getMediaObject,
  isVideo,
  createFile,
  getAssetDetails,
  createAssetObject,
  createAssetEntry,
  getVideoStillImage,
  getFileExtension
};
