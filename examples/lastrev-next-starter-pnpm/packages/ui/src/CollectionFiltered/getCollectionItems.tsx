export const getCollectionItems = async (id: string, limit: number, offset: number, filter: {}) => {
  try {
    const client = await import('@graphql-sdk/client').then((module) => module.client);
    const { data } = await client.CollectionItems({
      id,
      limit,
      offset,
      filter,
      preview: process.env.CONTENTFUL_USE_PREVIEW === 'true'
    });
    return (data?.content as any)?.itemsConnection;
  } catch (err) {
    console.log('errr', err);
  }
  return {};
};
