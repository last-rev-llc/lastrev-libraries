/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const path = require('path');
const TurndownService = require('turndown');
const { richTextFromMarkdown } = require('@contentful/rich-text-from-markdown');
const { clientDelivery, environmentManagement } = require('../shared/contentful-init');
const { csvToArray } = require('../shared/input-parsers');
const {
  getContentfulIdFromString,
  createAssetObject,
  getAssetDetails,
  createAssetEntry,
  createFile
} = require('../shared/contentful-fields');
const { checkForExistingItem, getAllEntries, createAssets } = require('../shared/contentful-actions');
const { getDistinct } = require('../shared/helpers/getDistinct');
const { image403s, image404s, notResolvedImages } = require('../shared/fixtures/brokenUrls');

const BASE_FOLDER_PATH = '/Users/anthonywhitley/Documents/LASTREV/193';
// const CSV_FILE_PATH = path.join(BASE_FOLDER_PATH, 'pathmaticsBlogs_ShortVersion.csv');
// const CSV_FILE_PATH = path.join(BASE_FOLDER_PATH, 'pathmaticsBlogs_Single.csv');
const CSV_FILE_PATH = path.join(BASE_FOLDER_PATH, 'finalPathmaticsBlogs.csv');
const turndownService = new TurndownService();

// CPG Published             = 75xBaDldTdeYovVrXwQ3fM
// CPG Draft                 = 4WrJHEEoUhBVx6cUoj1iBx
// Top Advertisers Published = 3iuSeI4GNTKmvLv38bGvsJ
// Top Advertisers Draft     = 3O9facN1rWPNTqHtsnSVZR
// Gaming & Mobile Games     = 1036366507

// should have 700 images uploaded which would make the total 7669
// TODO: need to add Gaming & Mobile Games to Blog with Gaming as tag

const unprocessableImages = [...image403s, ...image404s, ...notResolvedImages];
const foundUnprocessableUrls = [];

// const createdAssets = [];
const imageCollections = [];
const mediaItems = [];
const videos = [];
const iframes = [];
const imageLinks = [];
const newAuthors = [];
const srcsetImages = [];
const links = [];

const createEntryWithId = async (environment, entryId, entryObject, contentType) => {
  let entry;
  try {
    console.log(`creating entry => ${entryId}`);
    // console.log({ environment, entryId, entryObject, contentType });
    entry = await environment.createEntryWithId(contentType, entryId, entryObject);
  } catch (error) {
    console.log(`error creating entry => ${entryId} => for ${entryObject?.fields?.slug?.['en-US']}`, error);
  }
  return entry;
};

const createEntries = async (entries) => {
  const createdEntries = [];
  const environment = await environmentManagement;
  if (!environment) {
    console.log('environment not found');
    return [];
  }

  for (let index = 0; index < entries.length; index++) {
    const currentEntry = entries[index];
    const { entry, entryId, publish, contentType } = currentEntry;

    const existingAsset = await checkForExistingItem(entryId, async () => clientDelivery.getEntry(entryId));

    if (!existingAsset) {
      const createdEntry = await createEntryWithId(environment, entryId, entry, contentType);

      if (createdEntry) {
        console.log(`created entry => ${entryId}`);

        // if (publish) {
        //   await publishItem(createdEntry, entryId);
        // }
        createdEntries.push({ entryId, asset: createdEntry });
      }
    } else {
      console.log(`existing entry => ${entryId}`);
      createdEntries.push({ asset: existingAsset, entryId });
    }
  }
  return createdEntries;
};

const query = (type) => ({
  content_type: type,
  limit: 1000
});

const getFileName = (url, title, uniqueId) => {
  if (url.includes('googleusercontent.com/')) {
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
  if (authorNeedsAdded(author, authorId)) {
    console.log(`author not added correctly => ${author}`);
  }
  return authorId;
};

const getAuthor = (authors, author) => {
  const authorId = getAuthorId(authors, author);
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

const getEmbeddedUrl = (line) => line.split('"').filter((l) => l.startsWith('http'))[0];

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

const filterAll = (line) =>
  line &&
  line !== '<div>' &&
  line !== '</div>' &&
  line !== '<div>&nbsp;</div>' &&
  line !== '<p>&nbsp;</p>' &&
  line !== '</ul>' &&
  !line.includes('<li>') &&
  !line.includes('<video ') &&
  !/^<!--.*-->$/.test(line) &&
  !/^<div.*>$/.test(line) &&
  !/^<h(1|2|3|4|5).*>&nbsp;<\/h(1|2|3|4|5)>$/.test(line) &&
  !/^<h(1|2|3|4|5)><span style=".*"><\/span><\/h(1|2|3|4|5)>$/.test(line.replace(/<!--more-->/g, ''));

const filterAllExceptLists = (line) =>
  line &&
  line !== '<div>' &&
  line !== '</div>' &&
  line !== '<div>&nbsp;</div>' &&
  line !== '<p>&nbsp;</p>' &&
  !line.includes('<video ') &&
  !/^<!--.*-->$/.test(line) &&
  !/^<div.*>$/.test(line) &&
  !/^<h(1|2|3|4|5).*>&nbsp;<\/h(1|2|3|4|5)>$/.test(line) &&
  !/^<h(1|2|3|4|5)><span style=".*"><\/span><\/h(1|2|3|4|5)>$/.test(line.replace(/<!--more-->/g, ''));

const filterOnlyLists = (line) =>
  line.includes('<ul>') ||
  line.includes('<ol>') ||
  line.includes('<li>') ||
  line.includes('</ul>') ||
  line.includes('</ol>');

const getImageUrls = (line) =>
  line
    .split('<img src="')
    .map((imagesLine) => (imagesLine.startsWith('http') ? imagesLine.split('"')[0] : null))
    .filter((imageUrl) => imageUrl);

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

const getBody = async (body, postUrl, slug, postTitle) => {
  const bodyLines = body?.split('\n');
  const imageCollectionLines = [];
  const iframeLines = [];
  const videoLines = [];
  const imageLinkLines = [];
  const filteredLines = bodyLines.filter(filterAll);
  const listStartIndex = filteredLines.findIndex((line) => line.includes('<ul>') || line.includes('<ol>'));
  // console.log('listStartIndex => ', listStartIndex);
  // console.log('filteredLines => ', filteredLines.length);
  let totalLines = filteredLines.length;
  const addedLines = [];
  const getImageBlock = async (node) => {
    if (node.type !== 'image') {
      console.log('Type not image => ', postUrl, JSON.stringify(node, null, 2));
      return null;
    }
    if (!node.url) {
      console.log('!!!!Image URL not found!!!! => ', postUrl, JSON.stringify(node, null, 2));
      return null;
    }
    // console.log('Image URL found => ', node.type, node.url);
    return getEmbeddedAssetBlock(getContentfulIdFromString(node.url));
  };
  const listBlocks = bodyLines.filter(filterOnlyLists);
  // const endOfListBlock = false;

  const getMatch = (line, regex) => (line.match(regex) || []).length;

  const filteredBody = bodyLines
    .filter(filterAllExceptLists)
    .map((line, index) => {
      const imageCount = getMatch(line, /<img /g);
      const iframeCount = getMatch(line, /<iframe /g);
      const videoCount = getMatch(line, /<source /g);
      if (line.includes('srcset="')) {
        srcsetImages.push({ postUrl, line, count: imageCount, lineNumber: index, slug, postTitle });
      }
      if (line.includes('<a ')) {
        links.push({
          postUrl,
          line,
          links: line
            .split('<a ')
            .map((l) => {
              const url = l.startsWith('href="') ? l.split('"')[1] : null;
              return url && !url.includes('info.adomic.com') ? url : null;
            })
            .filter((l) => l)
            .map((l) => {
              if (l.startsWith('/') && !l.includes('/blog')) {
                return `/pathmatics${l}`;
              }
              return l
                .replace(/https?:\/\/blog\.(adomic|pathmatics)\.com/, '/blog')
                .replace(/https?:\/\/www\.pathmatics\.com/, '');
            })
        });
      }
      if (imageCount > 1) {
        // console.log({ postUrl, line, count: imageCount, lineNumber: index, slug, postTitle });
        imageCollectionLines.push({ lineNumber: index, line, count: imageCount });
        imageCollections.push({ postUrl, line, count: imageCount, lineNumber: index, slug, postTitle });
        const imageUrls = getImageUrls(line);
        imageUrls.forEach((imageUrl, urlIndex) => {
          mediaItems.push({ imageUrl, title: postTitle, lineNumber: index, urlIndex });
        });
        return null;
      }
      if (imageCount === 1 && line.includes('<a ')) {
        imageLinkLines.push({ lineNumber: index, line, count: imageCount });
        imageLinks.push({ postUrl, line, count: imageCount, lineNumber: index, slug, postTitle });
        return null;
      }
      if (iframeCount > 0) {
        iframeLines.push({ lineNumber: index, line, count: iframeCount });
        iframes.push({ postUrl, line, count: iframeCount, lineNumber: index, slug, postTitle });
        if (line.split('</iframe>')[1] !== '</p>') {
          addedLines.push({ lineNumber: index });
          totalLines += 1;
        }
      }
      if (videoCount > 0) {
        videoLines.push({ lineNumber: index, line, count: videoCount });
        videos.push({ postUrl, line, count: videoCount, lineNumber: index, slug, postTitle });
        addedLines.push({ lineNumber: index });
      }
      return line;
    })
    .filter((line) => line)
    .join('\n');
  const markdownBody = turndownService.turndown(filteredBody);
  const rtfBody = await richTextFromMarkdown(markdownBody, getImageBlock);
  const beforeList = (lineNumber) => listStartIndex === -1 || lineNumber < listStartIndex;
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
    beforeList(lineNumber) ? lineNumber : lineNumber - listBlocks.length + (1 + addLine(lineNumber));
  imageCollectionLines.forEach((image) => {
    const collectionIndex = getStartIndex(image.lineNumber);
    // console.log('collection lineNumber => ', image.lineNumber);
    // console.log('collectionIndex => ', collectionIndex);
    rtfBody.content.splice(collectionIndex, 0, getEmbeddedEntryBlock(getCollectionId(slug, image.count))).join();
  });
  iframeLines.forEach((iframe) => {
    const iframeIndex = getStartIndex(iframe.lineNumber);
    // console.log('iframe lineNumber => ', iframe.lineNumber);
    // console.log('iframeIndex => ', iframeIndex);
    rtfBody.content.splice(iframeIndex, 0, getEmbeddedEntryBlock(getAssetId(iframe.line))).join();
  });
  videoLines.forEach((video) => {
    const videoIndex = getStartIndex(video.lineNumber);
    // console.log('video lineNumber => ', video.lineNumber);
    // console.log('videoIndex => ', videoIndex);
    rtfBody.content.splice(videoIndex, 0, getEmbeddedEntryBlock(getAssetId(video.line))).join();
  });
  imageLinkLines.forEach((link) => {
    const linkIndex = getStartIndex(link.lineNumber);
    // console.log('imageLink lineNumber => ', link.lineNumber);
    // console.log('linkIndex => ', linkIndex);
    rtfBody.content.splice(linkIndex, 0, getEmbeddedEntryBlock(getAssetId(link.line))).join();
  });
  // if (postUrl === 'https://www.pathmatics.com/blog/the-auto-industrys-fight-to-accelerate-out-of-the-pandemic') {
  // console.log('rtfBody => ', JSON.stringify(rtfBody, null, 2));
  // console.log('bodyLines => ', JSON.stringify(bodyLines, null, 2));
  // console.log('filteredBody => ', JSON.stringify(filteredLines, null, 2));
  // console.log('totalLines => ', totalLines);
  // }
  if (rtfBody.content.length !== totalLines) {
    console.log('!!!!Mismatching body lines!!!! => ', {
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
    const imageId = getContentfulIdFromString(imageUrl);

    return {
      entryId: imageId,
      url: imageUrl,
      slug,
      contentType: 'media',
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
    const entryId = getContentfulIdFromString(videoUrl);
    return {
      entryId,
      url: videoUrl,
      slug,
      contentType: 'media',
      entry: {
        fields: {
          internalTitle: {
            'en-US': `${postTitle} Video ${lineNumber}`
          },
          mediaUrl: {
            'en-US': videoUrl
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
    const width = line.split('width="')[1]?.split('"')[0];
    const height = line.split('height="')[1]?.split('"')[0];
    const entryId = getContentfulIdFromString(src);
    return {
      entryId,
      url: src,
      slug,
      contentType: 'moduleIntegration',
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
              src,
              width,
              height
            }
          }
        }
      }
    };
  });
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
      return {
        entryId: getContentfulIdFromString(url),
        url,
        slug,
        publish: status === 'PUBLISHED',
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
            featuredMedia: {
              'en-US': {
                sys: {
                  type: 'Link',
                  linkType: 'Asset',
                  id: getContentfulIdFromString(image)
                }
              }
            },
            pubDate: {
              'en-US': new Date(`${publishDate.replace(' ', 'T')}Z`)
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
    allBlogs.push(entries.items);
  }
};

const createImageAsset = (url, title, uniqueId) => {
  return createAssetObject(
    getAssetDetails(url, true),
    createAssetEntry(getTitle(url, title, uniqueId), createFile(url, getFileName(url, title, uniqueId)))
  );
};

const processImageAssets = async (blogs) => {
  // create assets for blog images
  // console.log('first blog', blogs[0]);
  const imageAssets = [];
  blogs.forEach((blog) => {
    if (blog?.image) {
      // imageAssets.push(getImage(blog?.image));
      imageAssets.push(createImageAsset(blog.image, blog.title, 'featured'));
    }
    const bodyLines = blog.body.split('\n');
    // console.log('bodyLines => ', bodyLines.length);
    let imageCount = 0;

    bodyLines.forEach((line) => {
      if (line.includes('<img ')) {
        imageCount += 1;
        const imageUrls = line
          .split('<img src="')
          .filter((l) => l.startsWith('http'))
          .map((l) => l.split('"')[0]);
        // console.log('imageUrls => ', imageUrls.length);
        if (imageUrls?.length) {
          imageUrls.forEach((imageUrl) => {
            // imageAssets.push(getImage(imageUrl, blog.title, imageCount));
            imageAssets.push(createImageAsset(imageUrl, blog.title, imageCount));
          });
        }
      }
    });
  });
  console.log('imageUrls amount to be processed => ', imageAssets.length);
  const filteredImages = imageAssets.filter(
    (image) => image && !unprocessableImages.some((unprocessableImage) => unprocessableImage === image.url)
  );
  // console.log(
  //   'images => ',
  //   JSON.stringify(
  //     filteredImages.map((image) => image.assetEntry.fields.file['en-US'].contentType),
  //     null,
  //     2
  //   )
  // );
  // console.log('images => ', JSON.stringify(filteredImages, null, 2));
  console.log('filtered image amount to be processed => ', filteredImages.length);
  // console.log('first image => ', images[0]);

  const createdAssets = await createAssets(filteredImages, environmentManagement, clientDelivery);
  console.log('createdAssets => ', createdAssets.length);
};

(async () => {
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
  // console.log('first tag => ', JSON.stringify(tags[0], null, 2));

  // Get Blogs
  await getAllEntries(clientDelivery, { content_type: 'blog', limit: 1 }, (items) => getAllBlogs(items, 200));
  const existingBlogs = allBlogs.flat();
  console.log('existingBlogs => ', existingBlogs.length);
  console.log('existingBlogs[0] => ', JSON.stringify(existingBlogs[1000]?.fields.pubDate, null, 2));

  // Get parse csv file into array of objects
  const blogs = [];
  const csvParser = csvToArray(CSV_FILE_PATH);
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
      // create all images as assets
      console.log('!!!!processImageAssets start!!!!');
      await processImageAssets(blogs);
      console.log('foundUnprocessableUrls => ', foundUnprocessableUrls.length);
      console.log('foundUnprocessableUrls => ', JSON.stringify(foundUnprocessableUrls, null, 2));
      console.log('!!!!processImageAssets end!!!!');

      console.log('!!!!processNewAuthors start!!!!');
      const createdAuthors = await createEntries(newAuthors.filter((author) => author));
      console.log('newAuthors => ', newAuthors.length);
      console.log('createdAuthors => ', createdAuthors.length);
      console.log('!!!!processNewAuthors end!!!!');

      console.log('!!!!transformBlogs start!!!!');
      const transformedBlogs = await transformBlogs(blogs, authors, tags, existingBlogs);
      // console.log('transformedBlogs => ', JSON.stringify(transformedBlogs, null, 2));
      console.log('transformedBlogs length => ', transformedBlogs.length);
      console.log('amount of images with srcsets => ', srcsetImages.length);
      // console.log('images with srcsets => ', JSON.stringify(srcsetImages, null, 2));
      console.log('amount of links => ', links.length);
      console.log('links => ', JSON.stringify(getDistinct(links.map((l) => l.links).flat()), null, 2));
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
      const createdVideos = await createEntries(filteredVideos, true);
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

      // console.log('transformedBlogs => ', JSON.stringify(transformedBlogs, null, 2));
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
      const createdBlogs = await createEntries(transformedBlogs);
      console.log('createdBlogs => ', createdBlogs.length);
      console.log('!!!!createBlogs start!!!!');
    });
})();
