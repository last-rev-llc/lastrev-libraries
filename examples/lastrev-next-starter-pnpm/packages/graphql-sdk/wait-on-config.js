require('dotenv').config();
const URL = `${(process.env.GRAPHQL_SERVER || 'http://localhost:8888/graphql').replace(
  /^http:/,
  'http-get:'
)}?query={__schema{types{name}}}`;

const resource = `tcp:${URL?.split(':')?.pop()?.split('/')?.shift()}`;
const timeout = process.env.GRAPHQL_SERVER_TIMEOUT ? parseInt(process.env.GRAPHQL_SERVER_TIMEOUT, 10) : 0;

module.exports = {
  delay: 100,
  interval: 100,
  verbose: false,
  strictSSL: false,
  followRedirect: false,
  timeout,
  resources: [resource]
};
