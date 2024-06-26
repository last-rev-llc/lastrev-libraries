import axios from 'axios';

const algoliaUpdater = async (webhookUrl: string) => {
  const result = await axios.post(webhookUrl, {});
  if (result.status === 200) {
    return result.data;
  }
  if (result.status === 202) {
    return 'Accepted';
  }
  throw new Error(`${result.status} Error updating Algolia indices ${result.statusText}`);
};

const args = process.argv.slice(2);
const url = args.length === 1 && args[0];

if (!url) {
  console.error('You must provide the URL as an argument');
  process.exit(1);
}

algoliaUpdater(url)
  .then(() => {
    console.info('Algolia indices updated');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err.message || err);
    process.exit(1);
  });
