import { getServer } from './server';

// This is just for developmnent purposes. Consumers should run this using the @last-rev/graphql-cli package
getServer()
  .then((server) => server.listen(process.env.PORT || 5000).then(({ url }) => console.log(`Server ready at ${url}. `)))
  .catch((err) => console.log(err));
