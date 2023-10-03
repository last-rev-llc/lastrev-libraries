import React from 'react';

import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import type { TabsProps, TabsOwnerState } from './Tabs.types';

const Tabs = (props: TabsProps) => {
  const ownerState = { ...props };

  const { id, items, variant, sidekickLookup, introText } = props;

  const [value, setValue] = React.useState('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <ErrorBoundary>
      <Root data-testid={`Tabs-${variant}`} {...sidekick(sidekickLookup)} ownerState={ownerState}>
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

        {!!items?.length && (
          <ContentGrid ownerState={ownerState}>
            <TabsContext value={value} ownerState={ownerState}>
              <TabListWrap sx={{ borderBottom: 1, borderColor: 'divider' }} ownerState={ownerState}>
                {/* TODO: Add "orientation" to the expanding content type */}
                <TabList onChange={handleChange} orientation="horizontal" aria-label="TODO">
                  {items?.map(
                    (
                      item: any,
                      index: number // TODO: Fix type
                    ) => (
                      <Tab label={item.title} value={index.toString()} key={`${!id}-tab-${item?.id}-${index}`} />
                    )
                  )}
                </TabList>
              </TabListWrap>

              {items?.map(
                (
                  item: any,
                  index: number // TODO: Fix type
                ) => (
                  <DetailsWrap
                    value={index.toString()}
                    key={`${!id}-tab-panel-${item?.id}-${index}`}
                    ownerState={ownerState}>
                    {item.body ? (
                      <Details __typename="RichText" body={item.body} ownerState={ownerState} />
                    ) : (
                      <Details {...item.content} ownerState={ownerState} />
                    )}
                  </DetailsWrap>
                )
              )}
            </TabsContext>
          </ContentGrid>
        )}
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Tabs',
  slot: 'Root',

  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: TabsOwnerState }>``;

const ContentGrid = styled(Grid, {
  name: 'Tabs',
  slot: 'ContentGrid',
  overridesResolver: (_, styles) => [styles.contentGrid]
})<{ ownerState: TabsOwnerState }>``;

const IntroTextGrid = styled(Grid, {
  name: 'Tabs',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: TabsOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'Collection',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: TabsOwnerState }>``;

const TabsContext = styled(TabContext, {
  name: 'Tabs',
  slot: 'TabsContext',
  overridesResolver: (_, styles) => [styles.tabContext]
})<{ ownerState: TabsOwnerState }>``;

const TabListWrap = styled(Box, {
  name: 'Tabs',
  slot: 'TabListWrap',
  overridesResolver: (_, styles) => [styles.tabListWrap]
})<{ ownerState: TabsOwnerState }>``;

const DetailsWrap = styled(TabPanel, {
  name: 'Tabs',
  slot: 'DetailsWrap',
  overridesResolver: (_, styles) => [styles.detailsWrap]
})<{ ownerState: TabsOwnerState }>``;

const Details = styled(ContentModule, {
  name: 'Tabs',
  slot: 'Details',
  overridesResolver: (_, styles) => [styles.details]
})<{ ownerState: TabsOwnerState }>``;

export default Tabs;
