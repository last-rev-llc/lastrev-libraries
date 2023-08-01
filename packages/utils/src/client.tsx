import { getSdk } from '@ias/graphql-sdk';
import { GraphQLClient } from 'graphql-request';

// DEPLOY_URL
const URL =
  process.env.NEXT_PHASE === 'phase-production-build'
    ? 'http://localhost:5000/graphql'
    : process.env.DEPLOY_URL
    ? `${process.env.DEPLOY_URL}/api/graphql`
    : 'http://localhost:3000/api/graphql';
console.log(`URL => ${URL}`);
const sdk = getSdk(new GraphQLClient(URL));

export default sdk;
