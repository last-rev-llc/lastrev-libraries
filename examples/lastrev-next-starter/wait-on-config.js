const resource = `${(process.env.GRAPHQL_SERVER || 'http://localhost:5000/graphql').replace(
  /^http:/,
  'http-get:'
)}?query={__schema{types{name}}}`;
const timeout = process.env.GRAPHQL_SERVER_TIMEOUT ? parseInt(process.env.GRAPHQL_SERVER_TIMEOUT, 10) : 300000;

module.exports = {
  delay: 5000,
  interval: 5000,
  verbose: false,
  strictSSL: false,
  followRedirect: false,
  timeout,
  resources: [resource]
};
