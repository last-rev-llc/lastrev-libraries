import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESSTOKEN || '',
  environment: process.env.CONTENTFUL_ENV || 'master',
  host: process.env.CONTENTFUL_HOST || 'cdn.contentful.com',
  resolveLinks: false
});

export default client;
