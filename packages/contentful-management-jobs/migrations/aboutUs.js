/* eslint-disable no-param-reassign */
const contentfulFieldsParsers = require('../shared/contentful-fields');

const { createQuote } = require('./createQuote');
const { createHero } = require('./createHero');
const { createMediaEntry } = require('./createMediaEntry');
const { createPerson } = require('./createPerson');
const { createEntry } = require('./createEntry');

const aboutUs = {
  hero: {
    id: 'hero',
    type: 'CustomParser',
    customParser: async (hero, JOB) => {
      const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
        `${hero.title}-${hero.subtitle}-${hero.image_src}-${hero.position}-${hero.background}-${hero.alt}`
      );

      // Create the quote
      const entryRef = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

      JOB.relatedEntries.push(await createHero(JOB, entryId, hero));
      // Add the reference array to add to your entry
      return entryRef;
    }
  },
  team_leaders_title: {
    id: 'team_leaders.title',
    type: 'Symbol'
  },

  team_leaders_list: {
    id: 'team_leaders.list',
    type: 'CustomParser',
    customParser: async (persons, JOB) => {
      return Promise.all(
        persons.map(async (p) => {
          const person = {
            ...p
          };
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(
            `person-${p.name}-${p.title}-${p.about}`
          );

          // Handle media reference
          if (p.image2x) {
            person.image = p.image2x;
          }

          // Create the person
          JOB.relatedEntries.push(await createPerson(JOB, entryId, person));

          // Add the reference array to add to your entry
          const personRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });
          return personRefObject;
        })
      );
    }
  },
  quote: {
    id: 'quote',
    type: 'CustomParser',
    customParser: async (quote, JOB) => {
      const entryId = await contentfulFieldsParsers.getContentfulIdFromString(`quote-${quote.text}-${quote.image2x}`);

      quote.quote = quote.text;

      if (quote.image2x) {
        quote.img = quote.image2x;
      }
      // Create the quote
      const quoteRefObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });

      JOB.relatedEntries.push(await createQuote(JOB, entryId, quote));
      // Add the reference array to add to your entry
      return quoteRefObject;
    }
  },
  investors_title: {
    id: 'investors.title',
    type: 'Symbol'
  },
  investors_list: {
    id: 'investors.list',
    type: 'CustomParser',
    customParser: (logos, JOB) =>
      Promise.all(
        logos.map(async (logo) => {
          const assetId = await contentfulFieldsParsers.getContentfulIdFromString(logo.logo2x);
          JOB.relatedEntries.push(
            await createMediaEntry(JOB, assetId, {
              assetURL: logo.logo2x,
              title: logo.title,
              width: logo.width,
              height: logo.height
            })
          );

          const entryObject = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Entry' });
          return entryObject;
        })
      )
  },
  locations_title: {
    id: 'locations.title',
    type: 'Symbol'
  },
  locations_list: {
    id: 'locations.list',
    type: 'CustomParser',
    customParser: (locations, JOB) =>
      Promise.all(
        locations.map(async (location) => {
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(JSON.stringify(location));
          JOB.relatedEntries.push(
            createEntry({
              entryId,
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
          );

          const entryObject = await contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });
          return entryObject;
        })
      )
  },
  locations_other_offices_title: {
    id: 'locations.other_offices.title',
    type: 'Symbol'
  },
  locations_other_offices_list: {
    id: 'locations.other_offices.list',
    type: 'CustomParser',
    customParser: (locations, JOB) =>
      Promise.all(
        locations.map(async (location) => {
          const entryId = await contentfulFieldsParsers.getContentfulIdFromString(JSON.stringify(location));
          JOB.relatedEntries.push(
            createEntry({
              entryId,
              contentType: 'location',
              fields: ['title', 'address_postal_code', 'address_state', 'address_city', 'address_street'],
              entry: {
                ...location,
                address_city: location?.city
              }
            })
          );
          return contentfulFieldsParsers.getContentfulFieldValue(entryId, { type: 'Entry' });
        })
      )
  }
};

module.exports = aboutUs;
