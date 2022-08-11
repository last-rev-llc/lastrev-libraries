import { getSdk } from '@lrns/graphql-sdk';
import { GraphQLClient } from 'graphql-request';

const URL =
  process.env.STAGE === 'build' || !process.env.DEPLOY_URL
    ? 'http://localhost:5000/graphql'
    : `${process.env.DEPLOY_URL}/api/graphql`;
console.log('graphql URL', URL);
const sdk = getSdk(new GraphQLClient(URL));

export default sdk;
