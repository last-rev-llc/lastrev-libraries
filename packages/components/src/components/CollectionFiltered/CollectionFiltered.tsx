import React from 'react';
export type {
  CollectionFilteredProps,
  CollectionFilteredClassKey,
  CollectionFilteredClasses
} from '@last-rev/component-library/dist/components/CollectionFiltered';
import CollectionFiltered from '@last-rev/component-library/dist/components/CollectionFiltered';

import { useLocalizationContext } from '../LocalizationContext';

const preview = !!process.env.CONTENTFUL_USE_PREVIEW;

const withFetchItems = (Wrapped: any) => (props: any) => {
  const localization = useLocalizationContext();

  const fetchItems = async ({ filter, limit, offset }: { filter: any; limit?: number; offset?: number }) => {
    const client = await import('@ias/utils').then((module) => module.client);
    const { data } = await client.CollectionItems({ id: props.id, limit, offset, filter, preview });
    if (data?.content?.__typename == 'Collection') {
      const items = data?.content?.itemsConnection?.items;
      const options = data?.content?.itemsConnection?.pageInfo?.options;
      const allOptions = data?.content?.itemsConnection?.pageInfo?.allOptions;
      return { items, options, allOptions };
    }
    return null;
  };
  return (
    <Wrapped
      fetchItems={fetchItems}
      loadMoreText={localization['collections.viewMore.label']?.shortTextValue ?? 'VIEW MORE POSTS'}
      {...props}
    />
  );
};

export default withFetchItems(CollectionFiltered);
