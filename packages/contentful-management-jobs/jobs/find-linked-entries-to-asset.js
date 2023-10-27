/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-await-in-loop */
const { environmentManagement, clientDelivery } = require('../shared/contentful-init');

const getLinkedEntries = async (id) => {
  const environment = await environmentManagement;
  let links;
  try {
    console.log(`getting linked entries for ${id}`);
    links = await environment.getEntries({ links_to_entry: id });
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
  const linkedItems = await getLinkedEntries('42iJUCQShnK5UhXGPXfaef');
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
