/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const path = require('path');
const TurndownService = require('turndown');
const { richTextFromMarkdown } = require('@contentful/rich-text-from-markdown');
const { clientDelivery } = require('../shared/contentful-init');
const { csvToArray, arrayToCsv } = require('../shared/input-parsers');
const {
  getContentfulIdFromString,
  createAssetObject,
  getAssetDetails,
  createAssetEntry,
  createFile
} = require('../shared/contentful-fields');
const { getAllEntries, createAssets, createEntries } = require('../shared/contentful-actions');
const { getDistinct } = require('../shared/helpers/getDistinct');
const { image403s, image404s, notResolvedImages } = require('../shared/fixtures/brokenUrls');

const onlyProcessAssets = false;
const onlyProcessEntries = false;

const BASE_FOLDER_PATH = '/Users/anthonywhitley/Documents/LASTREV/193';
const CSV_EMBEDDED_IMAGES_FILE_PATH = path.join(BASE_FOLDER_PATH, 'embeddedImages.csv');
const CSV_UNPROCESSABLE_FILE_PATH = path.join(BASE_FOLDER_PATH, 'unprocessable.csv');
const CSV_UPLOADED_VIDEOS_FILE_PATH = path.join(BASE_FOLDER_PATH, 'uploadedVideos.csv');
// const CSV_FILE_PATH = path.join(BASE_FOLDER_PATH, 'pathmaticsBlogs_ShortVersion.csv');
// const CSV_FILE_PATH = path.join(BASE_FOLDER_PATH, 'pathmaticsBlogs_ShortVersion_100.csv');
// const CSV_FILE_PATH = path.join(BASE_FOLDER_PATH, 'pathmaticsBlogs_ShortVersion_200.csv');
// const CSV_FILE_PATH = path.join(BASE_FOLDER_PATH, 'pathmaticsBlogs_ShortVersion_300.csv');
// const CSV_FILE_PATH = path.join(BASE_FOLDER_PATH, 'pathmaticsBlogs_ShortVersion_400.csv');
// const CSV_FILE_PATH = path.join(BASE_FOLDER_PATH, 'pathmaticsBlogs_ShortVersion_500.csv');
// const CSV_FILE_PATH = path.join(BASE_FOLDER_PATH, 'pathmaticsBlogs_ShortVersion_600.csv');
// const CSV_FILE_PATH = path.join(BASE_FOLDER_PATH, 'pathmaticsBlogs_ShortVersion_700.csv');
// const CSV_FILE_PATH = path.join(BASE_FOLDER_PATH, 'pathmaticsBlogs_Single.csv');
// const CSV_FILE_PATH = path.join(BASE_FOLDER_PATH, 'pathmaticsBlogs_outliers.csv');
const CSV_FILE_PATH = path.join(BASE_FOLDER_PATH, 'finalPathmaticsBlogs.csv');
const turndownService = new TurndownService();

const unprocessableImages = [...image403s, ...image404s, ...notResolvedImages];

const imageCollections = [];
const mediaItems = [];
const videos = [];
const iframes = [];
const imageLinks = [];
const newAuthors = [];
const srcsetImages = [];
const embeddedImages = [];
const links = [];
const changedLinks = [];
const blogsWithBrokenAssets = [];

const query = (type) => ({
  content_type: type,
  limit: 1000
});

const getFileName = (url, title, uniqueId) => {
  if (url.includes('googleusercontent.com/') || url.includes('video.tv.adobe.com/')) {
    return `${title}-${uniqueId}.jpg`;
  }
  return (url && url.split('/').pop()?.replace(/%20/g, '-')) || 'Missing url';
};

const getAuthorEntry = (author) => {
  const authorId = getContentfulIdFromString(author);
  return {
    entryId: authorId,
    contentType: 'person',
    entry: {
      fields: {
        name: {
          'en-US': author
        }
      }
    }
  };
};

const authorNeedsAdded = (author, authorId) => author?.trim() && !authorId;

const findNewAuthor = (author, authorId) => {
  if (authorNeedsAdded(author, authorId)) {
    console.log(`author not found => ${author}`);
    newAuthors.push(getAuthorEntry(author));
  }
};

const getAuthorId = (authors, author) => {
  const authorId = authors.filter((person) => person.fields.name?.trim() === author?.trim())[0]?.sys?.id;
  return authorId;
};

const getAuthor = (authors, author) => {
  const authorId = getAuthorId(authors, author);
  if (authorNeedsAdded(author, authorId)) {
    console.log(`author not added correctly => ${author}`);
  }
  return authorId
    ? {
        sys: {
          type: 'Link',
          linkType: 'Entry',
          id: authorId
        }
      }
    : null;
};

const getTags = (tagsList, tags) => {
  if (!tags) return null;
  return tags
    .filter((tag) => tag)
    .map((tag) => {
      const tagId = tagsList.filter((tagEntry) => tagEntry.fields.title?.trim() === tag?.trim())[0]?.sys?.id;
      if (!tagId) {
        console.log(`tag not found => ${tag}`);
      }
      return tagId
        ? {
            sys: {
              type: 'Link',
              linkType: 'Entry',
              id: tagId
            }
          }
        : null;
    })
    .filter((tag) => tag);
};

const getEmbeddedAssetBlock = (id) => ({
  nodeType: 'embedded-asset-block',
  content: [],
  data: {
    target: {
      sys: {
        type: 'Link',
        linkType: 'Asset',
        id
      }
    }
  }
});

const getEmbeddedEntryBlock = (id) => ({
  nodeType: 'embedded-entry-block',
  content: [],
  data: {
    target: {
      sys: {
        type: 'Link',
        linkType: 'Entry',
        id
      }
    }
  }
});

const getCollectionId = (slug, imageCount) => getContentfulIdFromString(`${slug}-collection-${imageCount}`);

const getAssetId = (line) => getContentfulIdFromString(line.split('src="')[1].split('"')[0]);

const getSecureAssetId = (line) => {
  const src = line.split('src="')[1].split('"')[0];
  const secureSrc = src.replace('http:', 'https:');
  return getContentfulIdFromString(secureSrc);
};

const isCommentLine = (line) => /^<!--.*-->$/.test(line);

const isDivLine = (line) => /^<div.*>$/.test(line);

const isEmptyHeadingLine = (line) => /^<h(1|2|3|4|5).*>&nbsp;<\/h(1|2|3|4|5)>$/.test(line);

const isHeadingWithEmptySpanLine = (line) => /^<h(1|2|3|4|5)><span style=".*"><\/span><\/h(1|2|3|4|5)>$/.test(line);

const onlyHasLineBreaks = (line) => /^<p>((?:<br>)+?)<\/p>$/.test(line);

const filterAll = (line) =>
  line &&
  line !== '<div>' &&
  line !== '</div>' &&
  line !== '<div>&nbsp;</div>' &&
  line !== '<p>&nbsp;</p>' &&
  line !== '</ul>' &&
  !line.includes('<li>') &&
  !line.includes('<video ') &&
  !onlyHasLineBreaks(line) &&
  !isCommentLine(line) &&
  !isDivLine(line) &&
  !isEmptyHeadingLine(line) &&
  !isHeadingWithEmptySpanLine(line.replace(/<!--more-->/g, ''));

const filterAllExceptLists = (line) =>
  line &&
  line !== '<div>' &&
  line !== '</div>' &&
  line !== '<div>&nbsp;</div>' &&
  line !== '<p>&nbsp;</p>' &&
  !line.includes('<video ') &&
  !isCommentLine(line) &&
  !isDivLine(line) &&
  !isEmptyHeadingLine(line) &&
  !isHeadingWithEmptySpanLine(line.replace(/<!--more-->/g, ''));

const filterOnlyLists = (line) =>
  line.includes('<ul>') ||
  line.includes('<ol>') ||
  line.includes('<li>') ||
  line.includes('</ul>') ||
  line.includes('</ol>');

const replaceAllExceptText = (line) =>
  line
    ?.replace(/&nbsp;/g, '')
    .replace(/<a.*?>/g, '')
    .replace(/<\/a>/g, '')
    .replace(/<span.*?>/g, '')
    .replace(/<\/span>/g, '')
    .replace(/<img.*?>/g, '')
    .replace(/<br>/g, '')
    .trim();

const cleanUrl = (url) => {
  let cleanedUrl = url;
  if (url.startsWith('//')) {
    cleanedUrl = `https:${url}`;
  }
  if (url.endsWith('png?width=945&amp;quality=low')) {
    cleanedUrl = url.replace('png?width=945&amp;quality=low', 'png');
  }
  if (url.endsWith('?autoplay=true')) {
    cleanedUrl = url.replace('?autoplay=true', '');
  }
  return cleanedUrl.replace(/&amp;/g, '&');
};

const getImageUrls = (line) =>
  line
    .split('src="')
    .map((imagesLine) =>
      imagesLine.startsWith('http') || imagesLine.startsWith('//') ? imagesLine.split('"')[0] : null
    )
    .filter((imageUrl) => imageUrl)
    .map((imageUrl) => cleanUrl(imageUrl));

const cleanContent = (content) => {
  const assetNodes = [];
  const cleanedContent = content.map((node, nodeIndex) => {
    const { content: nodeContent } = node;
    if (nodeContent.length === 1) {
      return nodeContent[0].nodeType === 'embedded-asset-block' ? nodeContent[0] : node;
    }
    const filteredNodeContent = nodeContent.filter((contentNode, index) => {
      if (contentNode.nodeType === 'embedded-asset-block') {
        assetNodes.push({ contentNode, index: nodeIndex + (index > 0 ? 1 : 0) });
      }
      return contentNode.nodeType !== 'embedded-asset-block';
    });
    node.content = filteredNodeContent;
    return node;
  });
  assetNodes.forEach((assetNode) => {
    cleanedContent.splice(assetNode.index, 0, assetNode.contentNode);
  });
  return cleanedContent;
};

const getImageSrcs = (line) => line.match(/src="[^"]+"/g)?.map((src) => src.slice(5, -1)) || [];

const getLinkHrefs = (line) => line.match(/href="[^"]+"/g)?.map((href) => href.slice(6, -1)) || [];

const getImageWidths = (line) => [...line.matchAll(/<img[^>]+width="(\d+)"[^>]+>/g)].map((match) => match[1]);

const getImageHeights = (line) => [...line.matchAll(/<img[^>]+height="(\d+)"[^>]+>/g)].map((match) => match[1]);

const getMatch = (line, regex) => line.match(regex) || [];

const getMatches = (line, regex) => getMatch(line, regex).length;

// Replaces all instances of 'href="http://' with 'href="https://' in the given line.
// This function is used to update the URLs in 'a' tags to use a secure connection.
const makeLineHaveSecureUrls = (line) => line.replace(/href="http:\/\/([^"]+)"/g, 'href="https://$1"');

const addPathmaticsToLink = (line) => line.replace(/href="\/(?!blog\/)([^"]+)"/g, 'href="/pathmatics/$2"');

const addBlogPathToLink = (line) =>
  line.replace(/href="https:\/\/blog\.(adomic|pathmatics)\.com\/([^"]+)"/g, 'href="/blog/$2"');

const removePathmaticsPath = (line) => line.replace(/href="https:\/\/www\.pathmatics\.com\/([^"]+)"/g, 'href="/$1"');

const cleanLinksInLine = (line) => {
  return removePathmaticsPath(addBlogPathToLink(addPathmaticsToLink(makeLineHaveSecureUrls(line))));
};

const getListStartIndex = (filteredLines) =>
  filteredLines.findIndex((line) => line.includes('<ul>') || line.includes('<ol>'));

const beforeList = (lineNumber, listStartIndex) => listStartIndex === -1 || lineNumber < listStartIndex;

const getBody = async (body, postUrl, slug, postTitle) => {
  const bodyLines = body?.split('\n');
  const imageCollectionLines = [];
  const iframeLines = [];
  const videoLines = [];
  const imageLinkLines = [];
  const filteredLines = bodyLines.filter(filterAll);
  const listStartIndex = getListStartIndex(filteredLines);
  let totalLines = filteredLines.length;
  const addedLines = [];
  const getImageBlock = async (node) => {
    if (node.type !== 'image') {
      if (node.type === 'break') {
        return {
          nodeType: 'text',
          value: '\n',
          marks: [],
          data: {}
        };
      }
      console.log('Type not image or break => ', { postUrl, type: node.type });
      return null;
    }
    if (!node.url) {
      console.log('!!!!Image URL not found!!!! => ', postUrl, JSON.stringify(node, null, 2));
      return null;
    }
    const imageUrl = cleanUrl(node.url);
    const processable = !unprocessableImages.some((unprocessableImage) => unprocessableImage === imageUrl);
    if (!processable) {
      console.log('!!!!Found unprocessable image!!!! => ', {
        postId: getContentfulIdFromString(postUrl),
        postUrl,
        imageUrl,
        unprocessable: !processable
      });
      blogsWithBrokenAssets.push({
        postId: getContentfulIdFromString(postUrl),
        postTitle,
        assetUrl: imageUrl
      });
      totalLines -= 1;
    }
    return processable ? getEmbeddedAssetBlock(getContentfulIdFromString(imageUrl)) : null;
  };
  const listBlocks = bodyLines.filter(filterOnlyLists);

  const getImageData = (line) => {
    return getImageSrcs(line).map((imageSrc, index) => ({
      assetId: getContentfulIdFromString(cleanUrl(imageSrc)),
      src: cleanUrl(imageSrc),
      width: getImageWidths(line)[index],
      height: getImageHeights(line)[index]
    }));
  };

  const removeEmbeddedImages = (line, lineNumber) => {
    const imageSrcs = getImageSrcs(line);
    let editedLine = line;
    const testLine = line.match(/^<p>(.*?)<img.*?>(.*?)<\/p>$/);
    const textBefore = replaceAllExceptText(testLine?.[1]);
    const textAfter = replaceAllExceptText(testLine?.[2]);
    if (
      line.includes('<p>') &&
      line.includes('<img') &&
      ((textBefore && textBefore !== '.') || (textAfter && textAfter !== '.'))
    ) {
      embeddedImages.push({
        postId: getContentfulIdFromString(postUrl),
        postUrl,
        line,
        count: imageSrcs.length,
        lineNumber,
        slug,
        postTitle,
        imageData: getImageData(line)
      });
      editedLine = line.replace(/<img.*?>/g, '');
    }
    return editedLine;
  };

  const findSrcSets = (line, count, lineNumber) => {
    if (line.includes('srcset="')) {
      srcsetImages.push({ postUrl, line, count, lineNumber, slug, postTitle });
    }
  };

  const getAllLinks = (line) => {
    links.push({
      postUrl,
      line,
      links: getLinkHrefs(line)
    });
  };

  const cleanLinks = (originalLine, editedLine) => {
    if (editedLine.includes('<a ')) {
      editedLine = cleanLinksInLine(editedLine);
      if (getLinkHrefs(originalLine).some((link, linkIndex) => link !== getLinkHrefs(editedLine)[linkIndex])) {
        changedLinks.push({
          postUrl,
          postId: getContentfulIdFromString(postUrl),
          linkBefore: getLinkHrefs(originalLine),
          linkAfter: getLinkHrefs(editedLine)
        });
      }
      getAllLinks(editedLine);
    }
    return editedLine;
  };

  const captureImageCollections = (line, count, lineNumber) => {
    imageCollectionLines.push({ lineNumber, line, count });
    imageCollections.push({ postUrl, line, count, lineNumber, slug, postTitle });
    const imageUrls = getImageUrls(line);
    imageUrls.forEach((imageUrl, urlIndex) => {
      mediaItems.push({ imageUrl, title: postTitle, lineNumber, urlIndex });
    });
  };

  const captureImageLinks = (line, count, lineNumber) => {
    imageLinkLines.push({ lineNumber, line, count });
    imageLinks.push({ postUrl, line, count, lineNumber, slug, postTitle });
  };

  const captureIframes = (line, count, lineNumber) => {
    if (count > 0) {
      iframeLines.push({ lineNumber, line, count });
      iframes.push({ postUrl, line, count, lineNumber, slug, postTitle });
      if (line.split('</iframe>')[1] !== '</p>') {
        addedLines.push({ lineNumber });
        totalLines += 1;
      }
    }
  };

  const captureVideos = (line, count, lineNumber) => {
    if (count > 0) {
      videoLines.push({ lineNumber, line, count });
      videos.push({ postUrl, line, count, lineNumber, slug, postTitle });
      addedLines.push({ lineNumber });
    }
  };

  const filteredBody = bodyLines
    .filter(filterAllExceptLists)
    // .filter((line) => {
    //   const editedLine = removeEmbeddedImages(line);
    //   const initialImageCount = getMatches(editedLine, /<img /g);
    //   const imageUrls = getImageUrls(editedLine);
    //   const finalImageCount = imageUrls.filter((imageUrl) => !unprocessableImages.includes(imageUrl)).length;
    //   const removeLine = initialImageCount > 0 && finalImageCount === 0;
    //   return !removeLine;
    // })
    .map((line, index) => {
      let editedLine = removeEmbeddedImages(line, index);
      let imageCount = getMatches(editedLine, /<img /g);
      const iframeCount = getMatches(editedLine, /<iframe |<script.*?src=/g);
      const videoCount = getMatches(editedLine, /<source /g);
      findSrcSets(editedLine, imageCount, index);
      editedLine = cleanLinks(line, editedLine);
      const imageUrls = getImageUrls(editedLine);
      imageCount = imageUrls.filter((imageUrl) => !unprocessableImages.includes(imageUrl)).length;
      if (imageCount > 1) {
        captureImageCollections(editedLine, imageCount, index);
        return null;
      }
      if (imageCount === 1 && editedLine.includes('<a ')) {
        captureImageLinks(editedLine, imageCount, index);
        return null;
      }
      captureIframes(editedLine, iframeCount, index);
      captureVideos(editedLine, videoCount, index);
      return editedLine;
    })
    .filter((line) => line)
    .join('\n');

  const markdownBody = turndownService.turndown(filteredBody);
  const rtfBody = await richTextFromMarkdown(markdownBody, getImageBlock);

  const addLine = (lineNumber) => {
    let count = 0;
    addedLines.forEach((line) => {
      if (line.lineNumber >= lineNumber) {
        count += 1;
      }
    });
    return count;
  };

  const getStartIndex = (lineNumber) =>
    beforeList(lineNumber, listStartIndex) ? lineNumber : lineNumber - listBlocks.length + (1 + addLine(lineNumber));

  imageCollectionLines.forEach((image) => {
    const collectionIndex = getStartIndex(image.lineNumber);
    rtfBody.content.splice(collectionIndex, 0, getEmbeddedEntryBlock(getCollectionId(slug, image.count))).join();
  });
  iframeLines.forEach((iframe) => {
    const iframeIndex = getStartIndex(iframe.lineNumber);
    rtfBody.content.splice(iframeIndex, 0, getEmbeddedEntryBlock(getSecureAssetId(iframe.line))).join();
  });
  videoLines.forEach((video) => {
    const videoIndex = getStartIndex(video.lineNumber);
    rtfBody.content.splice(videoIndex, 0, getEmbeddedEntryBlock(getSecureAssetId(video.line))).join();
  });
  imageLinkLines.forEach((link) => {
    const linkIndex = getStartIndex(link.lineNumber);
    rtfBody.content.splice(linkIndex, 0, getEmbeddedEntryBlock(getAssetId(link.line))).join();
  });
  // if (postUrl === 'https://www.pathmatics.com/blog/2020-vision-digital-marketing-predictions-for-the-year-ahead') {
  //   console.log('rtfBody => ', JSON.stringify(rtfBody, null, 2));
  //   console.log('bodyLines => ', JSON.stringify(bodyLines, null, 2));
  //   console.log('filteredBody => ', JSON.stringify(filteredLines, null, 2));
  //   console.log('totalLines => ', totalLines);
  // }
  if (rtfBody.content.length !== totalLines) {
    console.log('!!!!Mismatching body lines!!!! => ', {
      postId: getContentfulIdFromString(postUrl),
      postUrl,
      rtfLines: rtfBody.content.length,
      originalLines: bodyLines.length,
      filteredLines: filteredLines.length,
      totalLines
    });
  }

  rtfBody.content = cleanContent(rtfBody.content);

  return rtfBody;
};

const transformMediaItems = (items) => {
  return items.map((item) => {
    const { imageUrl, title, lineNumber, urlIndex } = item;
    const imageId = getContentfulIdFromString(imageUrl);
    return {
      entryId: imageId,
      url: imageUrl,
      contentType: 'media',
      publish: true,
      entry: {
        fields: {
          internalTitle: {
            'en-US': getFileName(imageUrl, title, `${lineNumber}-${urlIndex}`)
          },
          media: {
            'en-US': {
              sys: {
                type: 'Link',
                linkType: 'Asset',
                id: imageId
              }
            }
          }
        }
      }
    };
  });
};

const getMediaItems = (imageUrls) => {
  return imageUrls.map((imageUrl) => {
    // const secureUrl = imageUrl.replace('http:', 'https:');
    const imageId = getContentfulIdFromString(imageUrl);
    return {
      sys: {
        type: 'Link',
        linkType: 'Entry',
        id: imageId
      }
    };
  });
};

const getCollectionVariant = (count) => {
  let variant = 'image-grid';
  if (count % 3 === 0) {
    variant = 'three-per-row';
  } else if (count % 2 === 0) {
    variant = '2x2-image-grid';
  }
  return variant;
};

const transformImageCollections = () => {
  return imageCollections.map((imageCollection) => {
    const { postUrl, line, count, lineNumber, slug, postTitle } = imageCollection;
    const imageUrls = getImageUrls(line);
    if (imageUrls.length !== count) {
      console.log('!!!!Mismatching image count!!!! => ', {
        postUrl,
        imageUrls,
        count,
        lineNumber
      });
    }

    return {
      entryId: getCollectionId(slug, count),
      url: postUrl,
      slug,
      contentType: 'collection',
      publish: true,
      entry: {
        fields: {
          internalTitle: {
            'en-US': `${postTitle} Collection ${lineNumber}`
          },
          items: {
            'en-US': getMediaItems(imageUrls)
          },
          variant: {
            'en-US': getCollectionVariant(count)
          }
        }
      }
    };
  });
};

const transformImageLinks = () => {
  return imageLinks.map((imageCollection) => {
    const { postUrl, line, count, lineNumber, slug, postTitle } = imageCollection;
    const imageUrls = getImageUrls(line);
    const linkUrl = line.split('href="')[1].split('"')[0];
    if (imageUrls.length !== count || imageUrls.length !== 1) {
      console.log('!!!!Mismatching image link count!!!! => ', {
        postUrl,
        imageUrls,
        count,
        lineNumber
      });
    }
    const imageUrl = imageUrls[0];
    // const secureUrl = imageUrl.replace('http:', 'https:');
    const imageId = getContentfulIdFromString(imageUrl);

    return {
      entryId: imageId,
      url: imageUrl,
      slug,
      contentType: 'media',
      publish: true,
      entry: {
        fields: {
          internalTitle: {
            'en-US': getFileName(imageUrl, postTitle, lineNumber)
          },
          media: {
            'en-US': {
              sys: {
                type: 'Link',
                linkType: 'Asset',
                id: imageId
              }
            }
          },
          clickableImageUrl: {
            'en-US': linkUrl
          }
        }
      }
    };
  });
};

const transformVideos = () => {
  return videos.map((video) => {
    const { line, lineNumber, slug, postTitle } = video;
    const videoUrl = line.split('src="')[1]?.split('"')[0];
    const secureUrl = videoUrl.replace('http:', 'https:');
    const entryId = getContentfulIdFromString(secureUrl);
    return {
      entryId,
      url: secureUrl,
      slug,
      contentType: 'media',
      publish: true,
      entry: {
        fields: {
          internalTitle: {
            'en-US': `${postTitle} Video ${lineNumber}`
          },
          mediaUrl: {
            'en-US': secureUrl
          }
        }
      }
    };
  });
};

const transformIFrames = () => {
  return iframes.map((iframe) => {
    const { line, lineNumber, slug, postTitle } = iframe;
    const src = line.split('src="')[1]?.split('"')[0];
    const secureSrc = src.replace('http:', 'https:');
    const width = line.split('width="')[1]?.split('"')[0];
    const height = line.split('height="')[1]?.split('"')[0];
    const entryId = getContentfulIdFromString(secureSrc);
    return {
      entryId,
      url: secureSrc,
      slug,
      contentType: 'moduleIntegration',
      publish: true,
      entry: {
        fields: {
          internalTitle: {
            'en-US': `${postTitle} iframe ${lineNumber}`
          },
          variant: {
            'en-US': 'iframe'
          },
          settings: {
            'en-US': {
              src: secureSrc,
              width,
              height
            }
          }
        }
      }
    };
  });
};

const fixDateTime = (_, date, hour, min, sec) => {
  if (hour.length === 1) {
    hour = `0${hour}`;
  }
  return `${date}T${hour}:${min}:${sec}Z`;
};

const transformBlogs = async (blogs, authors, tagsList, existingBlogs) => {
  return Promise.all(
    blogs.map(async (blog) => {
      const { title, seoTitle, url, author, tags, description, publishDate, body, image, status, archived } = blog;
      const slug = url?.split('/').pop();
      const blogExists = existingBlogs.some(
        (existingBlog) => existingBlog?.fields?.slug?.toLowerCase() === slug?.toLowerCase()
      );
      if (blogExists) {
        console.log('existing blog => ', title);
        return null;
      }
      const featuredMedia = !unprocessableImages.includes(image)
        ? {
            'en-US': {
              sys: {
                type: 'Link',
                linkType: 'Asset',
                id: getContentfulIdFromString(cleanUrl(image))
              }
            }
          }
        : null;
      const pubDate = publishDate.replace(/(\d{4}-\d{2}-\d{2}) (\d{1,2}):(\d{2}):(\d{2})/, fixDateTime);
      console.log('publishDate => ', publishDate);
      console.log('pubDate => ', pubDate);
      return {
        entryId: getContentfulIdFromString(url),
        url,
        slug,
        // publish: status === 'PUBLISHED',
        archived: archived === 'TRUE',
        contentType: 'blog',
        entry: {
          fields: {
            title: {
              'en-US': title
            },
            slug: {
              'en-US': slug
            },
            includedLocales: {
              'en-US': ['en-US']
            },
            featuredMedia,
            pubDate: {
              'en-US': new Date(pubDate)
            },
            summary: {
              'en-US': description
            },
            author: {
              'en-US': getAuthor(authors, author)
            },
            body: {
              'en-US': await getBody(body, url, slug, title)
            },
            category: {
              'en-US': [
                {
                  sys: {
                    type: 'Link',
                    linkType: 'Entry',
                    id: '6MOpY7SVhE04hBNOOqbpVo'
                  }
                }
              ]
            },
            tags: {
              'en-US': getTags(tagsList, tags?.split(','))
            },
            seo: {
              'en-US': {
                title: {
                  name: 'title',
                  value: seoTitle
                },
                description: {
                  name: 'description',
                  value: description
                },
                robots: {
                  name: 'robots',
                  value: 'index, follow'
                }
              }
            }
          }
        }
      };
    })
  );
};

const getTitle = (imageUrl, blogTitle, imageNumber) => {
  if (imageUrl?.split('.')?.pop()?.startsWith('com/')) {
    return `${blogTitle?.replace(/\s/g, '-')}-image-${imageNumber}`;
  }
  return imageUrl?.split('/').pop().split('.')[0] || imageUrl?.split('/').pop();
};

const blogQuery = (skip) => ({
  content_type: 'blog',
  limit: 200,
  skip,
  order: '-sys.createdAt'
});

const allBlogs = [];

const getAllBlogs = async (result, limit) => {
  for (let skip = 0; skip < result.total; skip += limit) {
    console.log(`processed blogs ${skip} to ${skip + limit}`);
    const entries = await getAllEntries(clientDelivery, blogQuery(skip));
    allBlogs.push(entries?.items || []);
  }
};

const createMediaAsset = (blogId, url, title, uniqueId) => {
  const file = createFile(url, getFileName(url, title, uniqueId));
  return file
    ? createAssetObject(getAssetDetails(url, true, blogId), createAssetEntry(getTitle(url, title, uniqueId), file))
    : null;
};

const getVideoData = (line) => {
  const src = line.split('<source src="')[1]?.split('"')[0];
  const width = line.split('width="')[1]?.split('"')[0];
  const height = line.split('height="')[1]?.split('"')[0];
  return {
    assetId: getContentfulIdFromString(src),
    src,
    width,
    height
  };
};

const processImageAssets = async (blogs) => {
  // create assets for blog images
  const imageAssets = [];
  const videoAssets = [];
  const uploadedVideos = [];
  blogs.forEach((blog) => {
    const blogId = getContentfulIdFromString(blog.url);
    if (blog?.image) {
      const mediaAsset = createMediaAsset(blogId, cleanUrl(blog.image), blog.title, 'featured');
      if (mediaAsset) {
        imageAssets.push(mediaAsset);
      }
    }
    const bodyLines = blog.body.split('\n');
    let imageCount = 0;
    let videoCount = 0;

    bodyLines.forEach((line, lineIndex) => {
      if (line.includes('<img ')) {
        const imageUrls = line
          .split('src="')
          .filter((l) => l.startsWith('http') || l.startsWith('//'))
          .map((l) => l.split('"')[0]);
        if (imageUrls?.length) {
          imageUrls
            .map((imageUrl) => cleanUrl(imageUrl))
            .forEach((imageUrl) => {
              imageCount += 1;
              if (!blogId) {
                console.log('about to push => ', { blogId, imageUrl, title: blog.title, imageCount });
              }
              const mediaAsset = createMediaAsset(blogId, imageUrl, blog.title, imageCount);
              if (mediaAsset) {
                imageAssets.push(mediaAsset);
              }
            });
        }
      }
      if (line.includes('<source ')) {
        const videoUrls = line
          .split('<source src="')
          .filter((l) => l.startsWith('http'))
          .map((l) => l.split('"')[0]);
        const cleanedVideoUrls = videoUrls.map((videoUrl) => cleanUrl(videoUrl));
        if (cleanedVideoUrls?.length) {
          cleanedVideoUrls.forEach((videoUrl) => {
            videoCount += 1;
            const mediaAsset = createMediaAsset(blogId, videoUrl, blog.title, videoCount);
            if (mediaAsset) {
              videoAssets.push(mediaAsset);
              uploadedVideos.push({
                postId: blogId,
                postUrl: blog.url,
                line,
                count: 1,
                lineNumber: lineIndex,
                slug: blog.url?.split('/').pop(),
                postTitle: blog.title,
                imageData: getVideoData(line)
              });
            }
          });
        }
      }
    });
  });

  const filterOutUnprocessables = (item) => {
    const processable = item && !unprocessableImages.some((unprocessableImage) => unprocessableImage === item.url);
    if (!processable) {
      blogsWithBrokenAssets.push({ blogId: item.linkingId, imageUrl: item.url, blogTitle: item.title });
    }
    return processable;
  };
  console.log('imageUrls amount to be processed => ', imageAssets.length);
  const filteredImages = imageAssets.filter(filterOutUnprocessables);
  const filteredVideos = videoAssets.filter(filterOutUnprocessables);
  console.log('filtered image amount to be processed => ', filteredImages.length);
  console.log('filtered video amount to be processed => ', filteredVideos.length);

  const createdAssets = await createAssets(filteredImages);
  console.log('createdAssets => ', createdAssets.length);

  const createdVideoAssets = await createAssets(filteredVideos);
  console.log('createdVideoAssets => ', createdVideoAssets.length);
  arrayToCsv(uploadedVideos, CSV_UPLOADED_VIDEOS_FILE_PATH, [
    'postId',
    'postUrl',
    'line',
    'count',
    'lineNumber',
    'slug',
    'postTitle',
    'videoData'
  ]);
};

(async () => {
  const startTime = new Date().getTime();
  // Get Authors
  const authors = (await getAllEntries(clientDelivery, query('person')))?.items;
  console.log('authors => ', authors.length);

  // Get Tags
  const tags = (await getAllEntries(clientDelivery, query('tag')))?.items
    .filter((item) => item.sys.id !== '4WrJHEEoUhBVx6cUoj1iBx' && item.sys.id !== '3O9facN1rWPNTqHtsnSVZR')
    .map((item) => {
      if (item.fields.title === 'Tik Tok') {
        item.fields.title = 'TikTok';
      }
      return item;
    });
  console.log('tags => ', tags.length);

  // Get Blogs
  await getAllEntries(clientDelivery, { content_type: 'blog', limit: 1 }, (items) => getAllBlogs(items, 200));
  const existingBlogs = allBlogs.flat();
  console.log('existingBlogs => ', existingBlogs.length);

  // Get parse csv file into array of objects
  const blogs = [];
  const csvParser = csvToArray(CSV_FILE_PATH);
  const runProcess = async (items) => {
    // create all images as assets
    if (!onlyProcessEntries) {
      console.log('!!!!processImageAssets start!!!!');
      const assetStartTime = new Date().getTime();
      await processImageAssets(items);
      const assetEndTime = new Date().getTime();
      const assetDuration = (assetEndTime - assetStartTime) / 1000;
      console.log('assetDuration => ', `${assetDuration} seconds or ${assetDuration / 60} minutes`);
      console.log('!!!!processImageAssets end!!!!');
    }

    if (!onlyProcessAssets) {
      console.log('!!!!processNewAuthors start!!!!');
      const createdAuthors = await createEntries(newAuthors.filter((author) => author));
      console.log('newAuthors => ', newAuthors.length);
      console.log('createdAuthors => ', createdAuthors.length);
      console.log('!!!!processNewAuthors end!!!!');

      console.log('!!!!transformBlogs start!!!!');
      const transformedBlogs = await transformBlogs(items, authors, tags, existingBlogs);
      console.log('transformedBlogs length => ', transformedBlogs.length);
      console.log('amount of images with srcsets => ', srcsetImages.length);
      console.log('amount of paragraphs with images => ', embeddedImages.length);
      const listOfBlogIdsWithEmbeddedImages = getDistinct(embeddedImages.map((image) => image.postId));
      arrayToCsv(embeddedImages, CSV_EMBEDDED_IMAGES_FILE_PATH, [
        'postId',
        'postUrl',
        'line',
        'count',
        'lineNumber',
        'slug',
        'postTitle',
        'imageData'
      ]);
      console.log('listOfBlogIdsWithEmbeddedImages => ', listOfBlogIdsWithEmbeddedImages.length);
      console.log('amount of links => ', links.length);
      console.log('!!!!transformBlogs end!!!!');

      console.log('!!!!MediaItems start!!!!');
      const transformedMediaItems = transformMediaItems(mediaItems);
      const filteredMediaItems = transformedMediaItems.filter((item) => item);
      const createdMediaItems = await createEntries(filteredMediaItems);
      console.log('mediaItems => ', mediaItems.length);
      console.log('transformedMediaItems => ', transformedMediaItems.length);
      console.log('filteredMediaItems => ', filteredMediaItems.length);
      console.log('createdMediaItems => ', createdMediaItems.length);
      console.log('!!!!MediaItems end!!!!');

      console.log('!!!!ImageLinks start!!!!');
      const transformedImageLinks = transformImageLinks(mediaItems);
      const filteredImageLinks = transformedImageLinks.filter((link) => link);
      const createdImageLinks = await createEntries(filteredImageLinks);
      console.log('imageLinks => ', imageLinks.length);
      console.log('transformedImageLinks => ', transformedImageLinks.length);
      console.log('filteredImageLinks => ', filteredImageLinks.length);
      console.log('createdImageLinks => ', createdImageLinks.length);
      console.log('!!!!ImageLinks end!!!!');

      console.log('!!!!ImageCollections start!!!!');
      const transformedCollections = transformImageCollections(imageCollections);
      const filteredCollections = transformedCollections.filter((collection) => collection);
      const createdImageCollections = await createEntries(filteredCollections);
      console.log('imageCollections => ', imageCollections.length);
      console.log('transformedCollections => ', transformedCollections.length);
      console.log('filteredCollections => ', filteredCollections.length);
      console.log('createdImageCollections => ', createdImageCollections.length);
      console.log('!!!!ImageCollections end!!!!');

      console.log('!!!!Videos start!!!!');
      const transformedVideos = transformVideos();
      const filteredVideos = transformedVideos.filter((video) => video);
      const createdVideos = await createEntries(filteredVideos);
      console.log('videos => ', videos.length);
      console.log('transformedVideos => ', transformedVideos.length);
      console.log('filteredVideos => ', filteredVideos.length);
      console.log('createdVideos => ', createdVideos.length);
      console.log('!!!!Videos end!!!!');

      console.log('!!!!IFrames start!!!!');
      const transformedIFrames = transformIFrames(iframes);
      const filteredIFrames = transformedIFrames.filter((iframe) => iframe);
      const createdIFrames = await createEntries(filteredIFrames);
      console.log('iframes => ', iframes.length);
      console.log('transformedIFrames => ', transformedIFrames.length);
      console.log('filteredIFrames => ', filteredIFrames.length);
      console.log('createdIFrames => ', createdIFrames.length);
      console.log('!!!!IFrames end!!!!');

      console.log('transformedBlogs length => ', transformedBlogs.length);

      console.log('mediaItems => ', mediaItems.length);
      console.log('transformedMediaItems => ', transformedMediaItems.length);
      console.log('filteredMediaItems => ', filteredMediaItems.length);
      console.log('createdMediaItems => ', createdMediaItems.length);

      console.log('imageLinks => ', imageLinks.length);
      console.log('transformedImageLinks => ', transformedImageLinks.length);
      console.log('filteredImageLinks => ', filteredImageLinks.length);
      console.log('createdImageLinks => ', createdImageLinks.length);

      console.log('imageCollections => ', imageCollections.length);
      console.log('transformedCollections => ', transformedCollections.length);
      console.log('filteredCollections => ', filteredCollections.length);
      console.log('createdImageCollections => ', createdImageCollections.length);

      console.log('videos => ', videos.length);
      console.log('transformedVideos => ', transformedVideos.length);
      console.log('filteredVideos => ', filteredVideos.length);
      console.log('createdVideos => ', createdVideos.length);

      console.log('iframes => ', iframes.length);
      console.log('transformedIFrames => ', transformedIFrames.length);
      console.log('filteredIFrames => ', filteredIFrames.length);
      console.log('createdIFrames => ', createdIFrames.length);

      console.log('!!!!createBlogs start!!!!');
      const createdBlogs = await createEntries(transformedBlogs.filter((blog) => blog));
      console.log('createdBlogs => ', createdBlogs.length);
      console.log('!!!!createBlogs start!!!!');
    }

    arrayToCsv(blogsWithBrokenAssets, CSV_UNPROCESSABLE_FILE_PATH, ['postTitle', 'postId', 'assetUrl']);

    const endTime = new Date().getTime();
    const duration = (endTime - startTime) / 1000;
    console.log('duration => ', `${duration} seconds or ${duration / 60} minutes`);
  };

  csvParser
    .on('data', (row) => {
      findNewAuthor(row.author, getAuthorId(authors, row.author));
      blogs.push(row);
    })
    .on('error', (error) => {
      console.log(error.message);
    })
    .on('end', async () => {
      console.log('blogs length => ', blogs.length);
      await runProcess(blogs);
    });
})();
