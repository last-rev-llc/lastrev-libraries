import React from 'react';
import CollectionFiltered from '@last-rev/component-library/dist/components/CollectionFiltered';
import { client, parseBooleanEnvVar } from '@ias/utils';

const preview = parseBooleanEnvVar(process.env.CONTENTFUL_USE_PREVIEW);

const withFetchItems = (Wrapped: any) => (props: any) => {
  const fetchItems = async ({ filter, limit, offset }: { filter: any; limit?: number; offset?: number }) => {
    const { data } = await client.CollectionItems({ id: props.id, limit, offset, filter, preview });
    if (data?.content?.__typename == 'Collection') {
      const items = data?.content?.itemsConnection?.items;
      const options = data?.content?.itemsConnection?.pageInfo?.options;
      const allOptions = data?.content?.itemsConnection?.pageInfo?.allOptions;
      return { items, options, allOptions };
    }
    return null;
  };
  return <Wrapped fetchItems={fetchItems} loadMoreText={'VIEW MORE POSTS'} {...props} />;
};

export default withFetchItems(CollectionFiltered);
