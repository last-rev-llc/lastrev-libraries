export const getCollectionItems = async (variables: any) => {
  try {
    const client = await import('@graphql-sdk/client').then((module) => module.client);
    const { data } = await client.CollectionItems({
      ...variables,
      preview: process.env.CONTENTFUL_USE_PREVIEW === 'true'
    });
    return data?.collectionItems as any;
  } catch (err) {
    console.log('errr', err);
  }
  return {};
};
