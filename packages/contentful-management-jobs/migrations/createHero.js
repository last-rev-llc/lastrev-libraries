const contentfulFieldsParsers = require('../shared/contentful-fields');
const { createMediaEntry } = require('./createMediaEntry');
const { createEntry } = require('./createEntry');

const createHero = async (JOB, entryId, hero) => {
  const asset = hero.image_src2x || hero.image_src;
  let image;
  if (asset) {
    const assetId = await contentfulFieldsParsers.getContentfulIdFromString(asset);
    JOB.relatedEntries.push(
      await createMediaEntry(JOB, assetId, {
        title: hero.alt,
        assetURL: asset
      })
    );
    image = await contentfulFieldsParsers.getContentfulFieldValue(assetId, { type: 'Entry' });
  }
  return createEntry({
    entryId,
    contentType: 'hero',
    fields: [
      'position',
      'pre_header',
      'reduced_paddings',
      'background',
      'background_modifier',
      'title',
      'subtitle',
      'subtitle_2',
      'image',
      'scroll',
      'request_demo_form_cta',
      'request_demo_form_id',
      'cta_demo_url',
      'learn_more_link',
      'learn_more_url',
      'learn_more_target',
      'buttons'
    ],
    entry: {
      ...hero,
      image,
      request_demo_form_cta: hero?.request_demo_form?.cta,
      request_demo_form_id: hero?.request_demo_form?.form_id
    }
  });
};
exports.createHero = createHero;
