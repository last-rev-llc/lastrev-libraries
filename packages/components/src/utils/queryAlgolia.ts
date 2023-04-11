import axios from 'axios';

export const queryAlgolia = (query: String) => {
  const url = '/api/algolia-top-result-url';

  return axios
    .post(
      url,
      JSON.stringify({
        indexName: 'articles',
        query,
        filters: 'locale:en-US'
      }),
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }
    )
    .catch((e) => {
      console.log('error', e);
      return e;
    });
};
