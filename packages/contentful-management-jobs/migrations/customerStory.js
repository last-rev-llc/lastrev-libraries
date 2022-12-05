const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createCard } = require('./createCard');
const { createQuote } = require('./createQuote');
const { createMediaEntry } = require('./createMediaEntry');

const customerStory = {
  slug: {
    id: 'slug',
    type: 'Symbol'
  },
  logo: {
    id: 'logo_path',
    type: 'CustomParser',
    customParser: async (assetURL, JOB, { parsedYamlFile }) => {
      const assetId = await contentfulFieldsParsers.getContentfulIdFromString(assetURL);

      JOB.relatedEntries.push(
        await createMediaEntry(JOB, assetId, {
          assetURL: assetURL,
          height: parsedYamlFile.logo?.height,
          width: parsedYamlFile.logo?.width
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
        `quote-${quoteYaml.author}-${quoteYaml.text}`
      );

      // console.log('card.logo2x: ', quoteYaml.avatar2x);
      if (quote.avatar2x) {
        quote.img = quote.avatar2x;
        // quote.img = {
        //   id: await contentfulFieldsParsers.getContentfulIdFromString(quoteYaml.avatar2x),
        //   assetURL: quoteYaml.avatar2x
        // };
      }

      // Create the quote
      const quoteRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

      JOB.relatedEntries.push(await createQuote(JOB, entryId, quote));
      // Add the reference array to add to your entry
      return quoteRefObject;
    }
  },
  info_description: {
    id: 'info.description',
    type: 'Text'
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
              assetURL: stat.icon
            }
          };

          card.variant = 'info-statistic';

          // Create the card
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(`${stat.text}-${stat.icon}`);
          const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createCard(JOB, entryId, card));
          // Add the reference array to add to your entry
          statisticsArray.push(cardRefObject);
        }
        // console.log('infoStatistic', statisticsArray);
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
            ...stat
          };

          if (stat.icon) {
            card.asset = {
              id: await contentfulFieldsParsers.getContentfulIdFromString(`${stat.icon}`),
              assetURL: stat.icon
            };
          }
          card.variant = 'challenge-statitic';

          // Create the card
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(`${stat.text}-${stat.icon}`);
          const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createCard(JOB, entryId, card));
          // Add the reference array to add to your entry
          statisticsArray.push(cardRefObject);
        }
        // console.log('infoStatistic', statisticsArray);
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
            `${card.title}+${card.img}+${card.link}`
          );

          // console.log('card.logo2x: ', card.logo2x);
          if (card.img2) {
            card.asset = {
              id: await contentfulFieldsParsers.getContentfulIdFromString(card.img2),
              assetURL: card.img2
            };
          }

          card.link = {
            id: await contentfulFieldsParsers.getContentfulIdFromString(card.link),
            manual_url: card.link
          };

          card.variant = 'related-content';

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

module.exports = customerStory;
