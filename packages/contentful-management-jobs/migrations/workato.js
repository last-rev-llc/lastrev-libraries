/* eslint-disable no-await-in-loop */
/* eslint-disable camelcase */
const contentfulFieldsParsers = require('../shared/contentful-fields');

const removeEmpty = (obj) => {
  Object.keys(obj).forEach((key) => (obj[key]['en-US'] == null || obj[key]['en-US'] == undefined) && delete obj[key]);
  return obj;
};

const createMediaEntry = async (JOB, assetId, { asset_url, height, width }) => {
  // We use the same ID for the asset and the media entry.
  return {
    entryId: assetId,
    contentType: 'media',
    contentfulFields: removeEmpty({
      asset_url: {
        'en-US': asset_url
      },
      asset: {
        'en-US': await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Asset' })
      },
      height: {
        'en-US': height
      },
      width: {
        'en-US': width
      }
    })
  };
};

const createLinkEntry = (JOB, entryId, { manual_url, text }) => {
  return {
    entryId,
    contentType: 'link',
    contentfulFields: removeEmpty({
      manual_url: {
        'en-US': manual_url
      },
      text: {
        'en-US': text
      }
    })
  };
};

const createCard = async (JOB, entryId, { title, name, text, list, category, asset, link, variant, content }) => {
  let mediaRefObj;
  let linkRefObj;

  if (asset) {
    JOB.relatedEntries.push(await createMediaEntry(JOB, asset.id, asset));
    mediaRefObj = await contentfulFieldsParsers.getContentfulFieldValue(asset.id, { type: 'Entry' });
  }

  if (link) {
    JOB.relatedEntries.push(await createLinkEntry(JOB, link.id, link));
    linkRefObj = await contentfulFieldsParsers.getContentfulFieldValue(link.id, { type: 'Entry' });
  }

  // Create the card

  // function that retunrs an objects without empty keys

  return {
    entryId,
    contentType: 'card',
    contentfulFields: removeEmpty({
      title: {
        'en-US': title
      },
      name: {
        'en-US': name
      },
      text: {
        'en-US': text
      },
      list: {
        'en-US': list
      },
      category: {
        'en-US': category
      },

      link: {
        'en-US': linkRefObj
      },
      img: {
        'en-US': mediaRefObj
      },
      variant: {
        'en-US': variant
      },
      content: {
        'en-US': content
      }
    })
  };
};

const createEditionTabApp = async (JOB, entryId, { internalTitle, name, apps }) => {
  try {
    const appsRelArray = [];
    for (let index = 0; index < apps.length; index++) {
      const app = apps[index];
      const internalTitle = `Edition App Flow Logo - ${app.name}`;
      const entryId = await contentfulFieldsParsers.getContentfulIdFromString(internalTitle);
      JOB.relatedEntries.push(
        await createEditionTabApp(JOB, entryId, {
          internalTitle,
          name: app.name,
          apps: []
        })
      );

      const relTabObj = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });
      // console.log('relTabObj: ', relTabObj);

      appsRelArray.push(relTabObj);
    }
  } catch (err) {
    console.log('err: ', err);
  }
  return {
    entryId: entryId,
    contentType: 'editionTabApp',
    contentfulFields: {
      internalTitle: {
        'en-US': internalTitle
      },
      name: {
        'en-US': name
      },
      apps: {
        'en-US': []
      }
    }
  };
};

const createEditionTab = async (JOB, entryId, { internalTitle, name, title, text, apps_flow }) => {
  const appsRelArray = [];
  for (let index = 0; index < apps_flow.length; index++) {
    const app = apps_flow[index];
    const internalTitle = `Edition App Flow - ${app.name}`;
    const entryId = await contentfulFieldsParsers.getContentfulIdFromString(internalTitle);

    JOB.relatedEntries.push(
      await createEditionTabApp(JOB, entryId, {
        internalTitle,
        name: app.name,
        apps: []
      })
    );

    const relTabObj = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });
    // console.log('relTabObj: ', relTabObj);

    appsRelArray.push(relTabObj);
  }

  return {
    entryId: entryId,
    contentType: 'editionTab',
    contentfulFields: {
      internalTitle: {
        'en-US': internalTitle
      },
      name: {
        'en-US': name
      },
      title: {
        'en-US': title
      },
      text: {
        'en-US': text
      },
      apps_flow: {
        'en-US': []
      }
    }
  };
};

const createQuote = async (JOB, entryId, { quote, author, name, position, company, img, iframe }) => {
  const assetId = await contentfulFieldsParsers.getContentfulIdFromString(img);
  const imgRefObj = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Entry' });
  JOB.relatedEntries.push(
    await createMediaEntry(JOB, assetId, {
      asset_url: img
    })
  );

  return {
    entryId,
    contentType: 'quote',
    contentfulFields: {
      quote: {
        'en-US': quote
      },
      author: {
        'en-US': author
      },
      name: {
        'en-US': name
      },
      position: {
        'en-US': position
      },
      company: {
        'en-US': company
      },
      img: {
        'en-US': imgRefObj
      },
      iframe: {
        'en-US': iframe
      }
    }
  };
};

const accelerators = {
  // Accelerators https://preview.contentful.com/spaces/khy5qy7zbpmq/environments/yaml-test/entries/17SMWU8LKtTnB6j2Do7lkn?access_token=ufBVTLIcMVUxgGcMA7EXrNWerJPPbmrEK9Eg-zHDceA
  chart: {
    id: 'chart2x',
    type: 'CustomParser',
    customParser: async (value, JOB) => {
      // console.log('============== chart CustomParser', value);
      const assetId = await contentfulFieldsParsers.getContentfulIdFromString(value);
      // console.log('assetId: ', assetId);
      JOB.relatedEntries.push(
        await createMediaEntry(JOB, assetId, {
          asset_url: value
        })
      );

      const entryObject = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Entry' });
      // console.log('entryObject: ', entryObject);
      return entryObject;
    }
  },
  about_rich_text: {
    id: 'about',
    type: 'CustomParser',
    customParser: async (value) => {
      // console.log('============== about_rich_text CustomParser', value);
      return await contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'RichText' });
    }
  },
  related_content_title: {
    id: 'related_content.title',
    type: 'CustomParser',
    customParser: async (value) => {
      return await contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'Symbol' });
    }
  },
  related_content_list: {
    id: 'related_content.list',
    type: 'CustomParser',
    customParser: async (array, JOB) => {
      const relatedArray = [];
      if (array && array.length > 0) {
        for (let index = 0; index < array.length; index++) {
          const card = array[index];
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(`${card.title}+${card.link}`);

          card.asset = {
            id: await contentfulFieldsParsers.getContentfulIdFromString(`${card.img2}`),
            asset_url: card.img2
          };
          card.link = {
            id: await contentfulFieldsParsers.getContentfulIdFromString(`link-${card.link}`),
            manual_url: card.link,
            text: 'View More'
          };

          // Create the card
          const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createCard(JOB, entryId, card));
          // Add the reference array to add to your entry
          relatedArray.push(cardRefObject);
        }
      }
      return relatedArray;
    }
  }
};

const customerStory = {
  logo: {
    id: 'logo_path',
    type: 'CustomParser',
    customParser: async (assetUrl, JOB, ogYaml) => {
      const assetId = await contentfulFieldsParsers.getContentfulIdFromString(assetUrl);
      JOB.relatedEntries.push(
        await createMediaEntry(JOB, assetId, {
          asset_url: assetUrl,
          height: ogYaml.height,
          width: ogYaml.width
        })
      );

      const entryObject = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Entry' });
      // console.log('entryObject: ', entryObject);
      return entryObject;
    }
  },
  quote: {
    id: 'quote',
    type: 'CustomParser',
    customParser: async (quoteYaml, JOB) => {
      const quote = {
        ...quoteYaml,
        author: quoteYaml.author,
        position: quoteYaml.position,
        quote: quoteYaml.text
      };
      const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
        `card-${quoteYaml.author}-${quoteYaml.text}`
      );

      // console.log('card.logo2x: ', card.logo2x);

      if (quote.img) {
        quote.img = {
          id: await contentfulFieldsParsers.getContentfulIdFromString(quoteYaml.avatar2x),
          asset_url: quoteYaml.avatar2x
        };
      }

      // Create the card
      const quoteRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

      JOB.relatedEntries.push(await createCard(JOB, entryId, quote));
      // Add the reference array to add to your entry
      return quoteRefObject;
    }
  },
  info_description: {
    id: 'info.description',
    type: 'Symbol'
  },
  info_statistic: {
    id: 'info.statistic',
    type: 'CustomParser',
    customParser: async (statistics, JOB) => {
      const statisticsArray = [];
      if (statistics && statistics.length > 0) {
        for (let i = 0; i < statistics.length; i++) {
          const stat = statistics[i];
          const card = {
            ...stat,
            asset: {
              id: await contentfulFieldsParsers.getContentfulIdFromString(`${stat.icon}`),
              asset_url: stat.icon
            }
          };

          card.variant = 'statistic';

          // Create the card
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(`${stat.title}-${stat.icon}`);
          const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createCard(JOB, entryId, card));
          // Add the reference array to add to your entry
          statisticsArray.push(cardRefObject);
        }
        console.log('infoStatistic', statisticsArray);
        return statisticsArray;
      }
    }
  },
  challenges_title: {
    id: 'challenges.title',
    type: 'Symbol'
  },
  challenges_statistic: {
    id: 'challenges.statistic',
    type: 'CustomParser',
    customParser: async (statistics, JOB) => {
      const statisticsArray = [];
      if (statistics && statistics.length > 0) {
        for (let i = 0; i < statistics.length; i++) {
          const stat = statistics[i];
          const card = {
            ...stat,
            asset: {
              id: await contentfulFieldsParsers.getContentfulIdFromString(`${stat.icon}`),
              asset_url: stat.icon
            }
          };

          card.variant = 'statitic';

          // Create the card
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(`${stat.title}-${stat.icon}`);
          const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createCard(JOB, entryId, card));
          // Add the reference array to add to your entry
          statisticsArray.push(cardRefObject);
        }
        console.log('infoStatistic', statisticsArray);
        return statisticsArray;
      }
    }
  },
  challenges_content_rich_text: {
    id: 'challenges.content',
    type: 'CustomParser',
    customParser: (value) => contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'RichText' })
  },
  solution_title: {
    id: 'solution.title',
    type: 'Symbol'
  },
  solution_statistic: {
    id: 'solution.statistic',
    type: 'Symbol'
  },
  solution_content_rich_text: {
    id: 'solution.content',
    type: 'CustomParser',
    customParser: (value) => contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'RichText' })
  },
  results_title: {
    id: 'results.title',
    type: 'Symbol'
  },
  results_statistic: {
    id: 'results.statistic',
    type: 'Symbol'
  },
  results_content_rich_text: {
    id: 'results.content',
    type: 'CustomParser',
    customParser: (value) => contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'RichText' })
  },
  related_content_title: {
    id: 'related_content.title',
    type: 'Symbol'
  },
  related_content_list: {
    id: 'related_content.list',
    type: 'CustomParser',
    customParser: async (list, JOB) => {
      const relatedArray = [];
      if (list && list.length > 0) {
        for (let index = 0; index < list.length; index++) {
          const card = list[index];
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
            `${card.title}+${card.icon}+${card.link}`
          );

          // console.log('card.logo2x: ', card.logo2x);

          if (card.img2) {
            card.asset = {
              id: await contentfulFieldsParsers.getContentfulIdFromString(card.img2),
              asset_url: card.img2
            };
          }

          card.link = {
            id: await contentfulFieldsParsers.getContentfulIdFromString(card.link),
            manual_url: card.link
          };

          card.variant = 'partner-logo';

          // Create the card
          const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createCard(JOB, entryId, card));
          // Add the reference array to add to your entry
          relatedArray.push(cardRefObject);
        }
        return relatedArray;
      }
    }
  }
};

const pageEdition = {
  image: {
    id: 'image',
    type: 'CustomParser',
    customParser: async (value, JOB) => {
      // console.log('============== image CustomParser', value);
      const assetId = await contentfulFieldsParsers.getContentfulIdFromString(value);
      // console.log('assetId: ', assetId);
      const assetRefObj = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Asset' });

      return assetRefObj;
    }
  },
  steps_title: {
    id: 'steps.title',
    type: 'CustomParser',
    customParser: async (value, JOB) => {
      return await contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'Symbol' });
    }
  },
  steps_list: {
    id: 'steps.list',
    type: 'CustomParser',
    customParser: async (array, JOB) => {
      // Return an array of the 'title' fields
      const stepsArray = array.map((step) => {
        return step.title;
      });
      return stepsArray;
    }
  },
  tabs: {
    id: 'tabs',
    type: 'CustomParser',
    customParser: async (array, JOB, yamlObj) => {
      // console.log('yamlObj: ', yamlObj);
      const tabsRelArray = [];
      if (array && array.length > 0) {
        for (let index = 0; index < array.length; index++) {
          const tab = array[index];
          const internalTitle = `Edition - ${yamlObj.parsedYamlFile.title} - ${tab.name}`;
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(internalTitle);
          JOB.relatedEntries.push(
            await createEditionTab(JOB, entryId, {
              internalTitle,
              name: tab.name,
              title: tab.functions[0].title,
              text: tab.functions[0].text,
              apps_flow: tab.functions[0].apps_flow
            })
          );

          const relTabObj = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });
          // console.log('relTabObj: ', relTabObj);

          tabsRelArray.push(relTabObj);
        }

        // console.log('tabsArray: ', tabsRelArray);
        return tabsRelArray;
      }
    }
  },
  calloutsList: null
};

const partner = {
  button_title: {
    id: 'button_title',
    type: 'CustomParser',
    customParser: async (value) => {
      const parsedValue = await contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'Symbol' });
      return parsedValue;
    }
  },
  button_login_title: {
    id: 'button.login.title',
    type: 'CustomParser',
    customParser: async (value) => {
      const parsedValue = await contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'Symbol' });
      return parsedValue;
    }
  },
  img: {
    id: 'image',
    type: 'CustomParser',
    customParser: async (value, JOB) => {
      const assetId = await contentfulFieldsParsers.getContentfulIdFromString(value);
      JOB.relatedEntries.push(
        await createMediaEntry(JOB, assetId, {
          asset_url: value
        })
      );

      const entryObject = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Entry' });
      // console.log('entryObject: ', entryObject);
      return entryObject;
    }
  },
  perks_asset: {
    id: 'perks.asset2x',
    type: 'CustomParser',
    customParser: async (value, JOB) => {
      const assetId = await contentfulFieldsParsers.getContentfulIdFromString(value);
      JOB.relatedEntries.push(
        await createMediaEntry(JOB, assetId, {
          asset_url: value
        })
      );

      const entryObject = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Entry' });
      // console.log('entryObject: ', entryObject);
      return entryObject;
    }
  },
  perks_list: {
    id: 'perks.list',
    type: 'CustomParser',
    customParser: async (value) => {
      const perksList = await contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'Array' });
      return perksList;
    }
  },
  perks_title: {
    id: 'perks.title',
    type: 'CustomParser',
    customParser: async (value) => {
      const perksTitle = await contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'Symbol' });
      return perksTitle;
    }
  },
  perks_content: {
    id: 'perks.content',
    type: 'CustomParser',
    customParser: async (value) => {
      const perksContent = await contentfulFieldsParsers.getContentfulFieldValue(value, { type: 'Symbol' });
      return perksContent;
    }
  },
  quote: {
    id: 'quote',
    type: 'CustomParser',
    customParser: async (value, JOB) => {
      const quote = value[0];
      const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
        `Quote - ${quote.author} - ${quote.position}`
      );
      const relQuoteObj = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });
      JOB.relatedEntries.push(await createQuote(JOB, entryId, quote));
      return [relQuoteObj];
    }
  },
  logo_list_list: {
    id: 'logo_list.list',
    type: 'CustomParser',
    customParser: async (array, JOB) => {
      const relatedArray = [];
      for (let index = 0; index < array.length; index++) {
        const card = array[index];
        const entryId = await contentfulFieldsParsers.getContentfulIdFromString(`card-${card.url}`);

        // console.log('card.logo2x: ', card.logo2x);

        if (card.logo2x) {
          card.asset = {
            id: await contentfulFieldsParsers.getContentfulIdFromString(card.logo2x),
            asset_url: card.logo2x
          };
        }

        card.link = {
          id: await contentfulFieldsParsers.getContentfulIdFromString(card.url),
          manual_url: card.url,
          text: card.name
        };

        card.title = card.name; // So it has an internal title

        card.variant = 'partner-logo';

        // Create the card
        const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

        JOB.relatedEntries.push(await createCard(JOB, entryId, card));
        // Add the reference array to add to your entry
        relatedArray.push(cardRefObject);
      }
      return relatedArray;
    }
  },
  sdk_asset: null
};

module.exports = {
  accelerators,
  customerStory,
  pageEdition,
  partner
};
