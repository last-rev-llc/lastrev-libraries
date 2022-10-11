/* eslint-disable no-console */
const publishItem = async (item, entryId) => {
  let publishedAsset;
  try {
    console.log(`publishing item => ${entryId}`);
    publishedAsset = await item.publish();
  } catch (error) {
    console.log(`error publishing item => ${entryId} => `, error);
  }
  return publishedAsset;
};

const deleteItem = async (item, entryId) => {
  let deletedItem;
  try {
    console.log(`deleting item => ${entryId}`);
    deletedItem = await item.delete();
  } catch (error) {
    console.log(`error deleting item => ${entryId} => `, error);
  }
  return deletedItem;
};

const checkForExistingItem = async (entryId, getItem) => {
  let item;
  try {
    console.log(`checking if item exists => ${entryId}`);
    item = await getItem();
  } catch (error) {
    if (error?.name !== 'NotFound' && error?.sys?.id !== 'NotFound') {
      console.log(`error checking for existing item => ${entryId} => `, JSON.stringify(error, null, 2));
    }
  }
  return item;
};

module.exports = {
  publishItem,
  deleteItem,
  checkForExistingItem
};
