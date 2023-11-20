import React from 'react';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import type { CollectionProps, CollectionOwnerState } from './Collection.types';
import Background from '../Background';
import { Pagination, PaginationItem } from '@mui/material';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import CollectionFilters from '../CollectionFilters';

const Collection = (props: CollectionProps) => {
  const ownerState = { ...props };
  const router = useRouter();
  const {
    backgroundImage,
    backgroundColor,
    items,
    variant,
    itemsVariant,
    sidekickLookup,
    introText,
    actions,

    settings,
    showFilters,
    pageInfo,
    searchParams,
    setFilter
  } = props;
  const pathname = usePathname();

  const getURL = (params: { page?: number }) => {
    // Add new search params
    // return the final url taking into account the current path
    const newSearchParams = new URLSearchParams(searchParams);
    if (params.page) {
      newSearchParams.set('page', params.page.toString());
    }
    return `${pathname}?${newSearchParams.toString()}`;
  };

  // Parse filter from search params

  // Create filter with values that are filter, not pagination

  return (
    <ErrorBoundary>
      <Root ownerState={ownerState} {...sidekick(sidekickLookup)} data-testid={`Collection-${variant}`}>
        <CollectionBackground
          background={backgroundImage}
          backgroundColor={backgroundColor}
          testId="Collection-background"
        />

        {introText && (
          <IntroTextGrid ownerState={ownerState}>
            <IntroText
              ownerState={ownerState}
              {...sidekick(sidekickLookup, 'introText')}
              {...introText}
              variant="introText"
            />
          </IntroTextGrid>
        )}

        <ContentGrid ownerState={ownerState}>
          {showFilters ? <CollectionFilters {...pageInfo} filters={settings?.filters} setFilter={setFilter} /> : null}
          {!!items?.length && (
            <ItemsGrid ownerState={ownerState} id="items">
              {items?.map((item, index) => (
                <Item
                  // ownerState={ownerState}
                  key={item?.id}
                  {...item}
                  variant={itemsVariant ?? (item as any)?.variant}
                  position={index + 1}
                />
              ))}
            </ItemsGrid>
          )}
          {showFilters && pageInfo?.total ? (
            <CollectionPagination
              page={pageInfo?.page}
              count={Math.ceil(pageInfo?.total / pageInfo?.limit)}
              renderItem={(item) => (
                <CollectionPaginationItem
                  component={Link}
                  href={item.page === 1 ? getURL({}) : getURL({ page: item.page! })}
                  {...item}
                />
              )}
            />
          ) : null}
          {!!actions?.length && (
            <ActionsWrap {...sidekick(sidekickLookup, 'actions')} data-testid="Hero-actions" ownerState={ownerState}>
              {actions.map((action) => (
                <Action ownerState={ownerState} key={action?.id} {...action} />
              ))}
            </ActionsWrap>
          )}
        </ContentGrid>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Collection',
  slot: 'Root',
  overridesResolver: ({ ownerState }, styles) => [styles.root, styles[`${ownerState?.variant}`]]
})<{ ownerState: CollectionOwnerState }>``;

const CollectionBackground = styled(Background, {
  name: 'Collection',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;
const CollectionPagination = styled(Pagination, {
  name: 'Collection',
  slot: 'Pagination',
  overridesResolver: (_, styles) => [styles.pagination]
})<{}>``;
const CollectionPaginationItem = styled(PaginationItem, {
  name: 'Collection',
  slot: 'PaginationItem',
  overridesResolver: (_, styles) => [styles.paginationItem]
})<{}>``;

const ContentGrid = styled(Grid, {
  name: 'Collection',
  slot: 'ContentGrid',
  overridesResolver: (_, styles) => [styles.contentGrid]
})<{ ownerState: CollectionOwnerState }>``;

const IntroTextGrid = styled(Grid, {
  name: 'Collection',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: CollectionOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'Collection',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: CollectionOwnerState }>``;

const ItemsGrid = styled(Box, {
  name: 'Collection',
  slot: 'ItemsGrid',
  overridesResolver: (_, styles) => [styles.itemsGrid, styles.itemsContainerOnePerRow]
})<{ ownerState: CollectionOwnerState }>``;

const Item = styled(ContentModule, {
  name: 'Collection',
  slot: 'Item',
  overridesResolver: (_, styles) => [styles.item]
})<{ ownerState: CollectionOwnerState }>``;

const ActionsWrap = styled(Box, {
  name: 'Collection',
  slot: 'ActionsWrap',
  overridesResolver: (_, styles) => [styles.actionsWrap]
})<{ ownerState: CollectionOwnerState }>``;

const Action = styled(ContentModule, {
  name: 'Collection',
  slot: 'Action',
  overridesResolver: (_, styles) => [styles.action]
})<{ ownerState: CollectionOwnerState }>``;

export default Collection;
