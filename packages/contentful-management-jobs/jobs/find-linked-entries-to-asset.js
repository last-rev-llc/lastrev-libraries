/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const { clientDelivery } = require('../shared/contentful-init');

const getLinkedEntries = async (id) => {
  let links;
  try {
    console.log(`getting linked entries for ${id}`);
    links = await clientDelivery.getEntries({ links_to_asset: id });
  } catch (error) {
    console.log(`error getting linked entries for ${id} => `, error);
  }
  if (links?.items?.length) {
    console.log(`linked entries for ${id} were found`);
  } else {
    console.log(`no linked entries for ${id} were found`);
  }
  return links?.items || [];
};

(async () => {
  const linkedItems = await getLinkedEntries('75ENpjF2gGS8HWSslI5jcj');
  console.log('linkedItems length => ', linkedItems?.length);
  console.log(
    'linkedItems ids => ',
    JSON.stringify(
      linkedItems.map((item) => item?.sys?.id),
      null,
      2
    )
  );
})();
