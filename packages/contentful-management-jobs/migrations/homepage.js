/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createCard } = require('./createCard');
const { createBanner } = require('./createBanner');
const { createAutomationTab } = require('./createAutomationTab');

const { createQuote } = require('./createQuote');
const { createMediaEntry } = require('./createMediaEntry');
const { createLinkEntry } = require('./createLinkEntry');

const parseLogos = (logos, JOB) =>
  Promise.all(
    logos.map(async (logo) => {
      const assetId = await contentfulFieldsParsers.getContentfulIdFromString(logo.image);
      JOB.relatedEntries.push(
        await createMediaEntry(JOB, assetId, {
          assetURL: logo.image,
          title: logo.name,
          width: logo.width,
          height: logo.height
        })
      );

      const entryObject = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Entry' });
      return entryObject;
    })
  );

const homepage = {
  logos_default: {
    id: 'logos.default.list',
    type: 'CustomParser',
    customParser: parseLogos
  },
  logos_asia: {
    id: 'logos.asia.list',
    type: 'CustomParser',
    customParser: parseLogos
  },
  logos_anz: {
    id: 'logos.anz.list',
    type: 'CustomParser',
    customParser: parseLogos
  },
  automation_title: {
    id: 'automation.title',
    type: 'Symbol'
  },
  automation_subtitle: {
    id: 'automation.subtitle',
    type: 'Symbol'
  },
  automation_tabs: {
    id: 'automation.tabs',
    type: 'CustomParser',
    customParser: (tabs, JOB) =>
      Promise.all(
        tabs.map(async (tab) => {
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
            `tab-${tab.name}-${tab.link}-${tab.details}-${tab.img}`
          );

          // Create the tab
          const tabRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createAutomationTab(JOB, entryId, tab));
          // Add the reference array to add to your entry
          return tabRefObject;
        })
      )
  },
  perfomance_title: {
    id: 'perfomance.title',
    type: 'Symbol'
  },

  perfomance_columns: {
    id: 'perfomance.columns',
    type: 'CustomParser',
    customParser: (cards, JOB) =>
      Promise.all(
        cards.map(async (card) => {
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
            `card-${card.title}-${card.title_modifier}-${card?.details?.join(',')}`
          );

          // card.title = card.name; // So it has an internal title
          card.id = card.title_modifier;
          card.list = card.details;
          card.variant = 'homepage-perfomance';

          // Create the card
          const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createCard(JOB, entryId, card));
          // Add the reference array to add to your entry
          return cardRefObject;
        })
      )
  },
  experts_title: {
    id: 'experts.title',
    type: 'Symbol'
  },
  experts_subtitle: {
    id: 'experts.subtitle',
    type: 'Symbol'
  },
  experts_quote: {
    id: 'experts',
    type: 'CustomParser',
    customParser: async (experts, JOB) => {
      const quote = {
        quote: experts.quote
      };
      const entryId = await contentfulFieldsParsers.getContentfulIdFromString(`quote-${experts.quote}-${experts.logo}`);

      if (experts.logo) {
        quote.img = experts.logo;
      }
      // Create the quote
      const quoteRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

      JOB.relatedEntries.push(await createQuote(JOB, entryId, quote));
      // Add the reference array to add to your entry
      return quoteRefObject;
    }
  },
  stat_title: {
    id: 'stat.title',
    type: 'Symbol'
  },
  stat_subtitle: {
    id: 'stat.subtitle',
    type: 'Symbol'
  },
  stat_link: {
    id: 'stat',
    type: 'CustomParser',
    customParser: async (stat, JOB) => {
      if (!stat.link_href) return null;
      const linkId = await contentfulFieldsParsers.getContentfulIdFromString(
        `link-${stat.link_href}-${stat.link_text}`
      );
      const link = {
        manual_url: stat.link_href,
        text: stat.link_text
      };

      JOB.relatedEntries.push(await createLinkEntry(JOB, linkId, link));
      return contentfulFieldsParsers.getContentfulFieldValue(linkId, { type: 'Entry' });
    }
  },
  stat_size: {
    id: 'stat.size',
    type: 'Symbol'
  },
  stat_list: {
    id: 'stat.list',
    type: 'CustomParser',
    customParser: (cards, JOB) =>
      Promise.all(
        cards.map(async (card) => {
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
            `card-${card.stat}-${card.description}-${card.modifier}`
          );

          card.title = card.stat; // So it has an internal title
          card.number = card.stat;
          card.text = card.description;
          card.id = card.modifier;
          card.variant = 'homepage-stat';

          // Create the card
          const cardRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

          JOB.relatedEntries.push(await createCard(JOB, entryId, card));
          // Add the reference array to add to your entry
          return cardRefObject;
        })
      )
  },
  customers_title: {
    id: 'customers.title',
    type: 'Symbol'
  },
  customers_subtitle: {
    id: 'customers.subtitle',
    type: 'Symbol'
  },
  customers_link: {
    id: 'customers',
    type: 'CustomParser',
    customParser: async (stat, JOB) => {
      if (!stat.link_href) return null;
      const linkId = await contentfulFieldsParsers.getContentfulIdFromString(
        `link-${stat.link_href}-${stat.link_text}`
      );
      const link = {
        manual_url: stat.link_href,
        text: stat.link_text
      };

      JOB.relatedEntries.push(await createLinkEntry(JOB, linkId, link));
      return contentfulFieldsParsers.getContentfulFieldValue(linkId, { type: 'Entry' });
    }
  },
  achievements_title: {
    id: 'achievements.title',
    type: 'Symbol'
  },
  achievements_subtitle: {
    id: 'achievements.subtitle',
    type: 'Symbol'
  },
  achievements_list: {
    id: 'achievements.list',
    type: 'Symbol'
  },
  start_title: {
    id: 'start.title',
    type: 'Symbol'
  },
  banner: {
    id: 'banner',
    type: 'CustomParser',
    customParser: async (banner, JOB) => {
      const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
        `banner-${banner.text}-${banner.image}-${banner.link}`
      );

      JOB.relatedEntries.push(await createBanner(JOB, entryId, banner));
      return contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });
    }
  },
  animation_icons: {
    id: 'animation_icons',
    type: 'CustomParser',
    customParser: (icons, JOB) =>
      Promise.all(
        icons.map(async (icon) => {
          const assetId = await contentfulFieldsParsers.getContentfulIdFromString(icon.source);
          JOB.relatedEntries.push(
            await createMediaEntry(JOB, assetId, {
              assetURL: icon.source,
              title: icon.alt,
              order: icon.group
            })
          );

          const entryObject = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Entry' });
          return entryObject;
        })
      )
  }
};

module.exports = homepage;
