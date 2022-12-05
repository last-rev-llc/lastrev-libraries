/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createHero } = require('./createHero');

const { createEntryReference } = require('./createEntryReference');
const { createMediaReference } = require('./createMediaReference');

const career = {
  hero: {
    id: 'hero',
    type: 'CustomParser',
    customParser: async (hero, JOB) => {
      const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
        `${hero.title}-${hero.subtitle}-${hero.image_src}-${hero.position}-${hero.background}-${hero.alt}`
      );

      const entryRef = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

      JOB.relatedEntries.push(await createHero(JOB, entryId, hero));
      // Add the reference array to add to your entry
      return entryRef;
    }
  },
  principles_title: {
    id: 'principles.title',
    type: 'Symbol'
  },
  principles_subtitle: {
    id: 'principles.subtitle',
    type: 'Symbol'
  },
  principles_tabs: {
    id: 'principles.tabs',
    type: 'CustomParser',
    customParser: async (tabs, JOB) =>
      Promise.all(
        tabs.map(async (tab) =>
          createEntryReference(JOB, {
            contentType: 'tab',
            fields: ['name', 'title', 'details', 'img'],
            entry: {
              ...tab,
              title: tab?.details_title,
              img: await createMediaReference(JOB, { assetURL: tab.img })
            }
          })
        )
      )
  },
  benefits_title: {
    id: 'benefits.title',
    type: 'Symbol'
  },
  benefits_subtitle: {
    id: 'benefits.subtitle',
    type: 'Symbol'
  },
  benefits_list: {
    id: 'benefits.list',
    type: 'CustomParser',
    customParser: async (list, JOB) =>
      Promise.all(
        list.map(async (card) =>
          createEntryReference(JOB, {
            contentType: 'card',
            fields: ['id', 'title', 'text', 'img', 'list'],
            entry: {
              ...card,
              id: card?.title_modifier,
              img: await createMediaReference(JOB, { assetURL: card.icon }),
              list: card?.bullet_list
            }
          })
        )
      )
  },

  jobs_title: {
    id: 'jobs.title',
    type: 'Symbol'
  },
  jobs_subtitle: {
    id: 'jobs.subtitle',
    type: 'Symbol'
  },

  team_title: {
    id: 'team.title',
    type: 'Symbol'
  },
  team_slider: {
    id: 'team.slider',
    type: 'CustomParser',
    customParser: async (quotes, JOB) =>
      Promise.all(
        quotes.map(async (quote) =>
          createEntryReference(JOB, {
            contentType: 'quote',
            fields: ['author', 'position', 'quote', 'img'],
            entry: {
              ...quote,
              img: await createMediaReference(JOB, { assetURL: quote.photo })
            }
          })
        )
      )
  },
  locations_title: {
    id: 'locations.title',
    type: 'Symbol'
  },
  locations_list: {
    id: 'locations.list',
    type: 'CustomParser',
    customParser: async (locations, JOB) =>
      Promise.all(
        locations.map(async (location) =>
          createEntryReference(JOB, {
            contentType: 'location',
            fields: ['title', 'address_postal_code', 'address_state', 'address_city', 'address_street'],
            entry: {
              ...location,
              address_postal_code: location?.address?.postal_code,
              address_state: location?.address?.state,
              address_city: location?.address?.city,
              address_street: location?.address?.street
            }
          })
        )
      )
  },
  locations_other_offices_title: {
    id: 'locations.other_offices.title',
    type: 'Symbol'
  },
  locations_other_offices_list: {
    id: 'locations.other_offices.list',
    type: 'CustomParser',
    customParser: async (locations, JOB) =>
      Promise.all(
        locations.map(async (location) =>
          createEntryReference(JOB, {
            contentType: 'location',
            fields: ['address_city'],
            entry: {
              address_city: location?.city
            }
          })
        )
      )
  },
  quote_tabs: {
    id: 'quote_tabs',
    type: 'CustomParser',
    customParser: async (quotes, JOB) =>
      Promise.all(
        quotes.map(async (quote) =>
          createEntryReference(JOB, {
            contentType: 'quote',
            fields: ['author', 'position', 'location', 'quote', 'img'],
            entry: {
              ...quote,
              author: quote.name,
              img: await createMediaReference(JOB, { assetURL: quote.person_default2x })
            }
          })
        )
      )
  }
};

module.exports = career;
