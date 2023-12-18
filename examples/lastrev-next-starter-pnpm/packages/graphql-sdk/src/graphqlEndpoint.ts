// DEPLOY_URL supplied by netlify, VERCEL_URL supplied by vercel
const deployUrl = process.env.DEPLOY_URL || process.env.VERCEL_URL;
export const graphqlEndpoint =
  process.env.CI || process.env.NEXT_PHASE === 'phase-production-build' || process.env.STAGE === 'build' || !deployUrl
    ? 'http://localhost:8888/graphql'
    : `https://${deployUrl}/api/graphql`;

export default graphqlEndpoint;
