import React from 'react';

import { styled } from '@mui/material/styles';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import { TabsProps } from './Tabs.types';

export const Tabs = ({
  id,
  items,
  itemsWidth,
  variant,
  itemsVariant,
  sidekickLookup,
  introText,
  ...props
}: TabsProps) => {
  const [value, setValue] = React.useState('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <ErrorBoundary>
      <Root
        variant={variant}
        itemsVariant={itemsVariant}
        data-testid={`Tabs-${variant}`}
        {...props}
        {...sidekick(sidekickLookup)}>
        {introText && (
          <IntroTextWrapper>
            <IntroText {...sidekick(sidekickLookup, 'introText')} {...introText} variant="introText" />
          </IntroTextWrapper>
        )}
        <ContentContainer>
          {!!items?.length && (
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
              </Box>

              {items?.map(
                (
                  item: any,
                  index: number // TODO: Fix type
                ) => (
                  <TabPanel value={index.toString()} key={`${!id}-tab-panel-${item?.id}-${index}`}>
                    <Item {...item} variant={itemsVariant ?? item?.variant} />
                  </TabPanel>
                )
              )}
            </TabContext>
          )}
        </ContentContainer>
      </Root>
    </ErrorBoundary>
  );
};

const shouldForwardProp = (prop: string) => prop !== 'variant' && prop !== 'itemsVariant';

const Root = styled(Box, {
  name: 'Tabs',
  slot: 'Root',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string; itemsVariant?: string }>``;

const ContentContainer = styled(Container, {
  name: 'Tabs',
  slot: 'ContentContainer',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>``;

const IntroTextWrapper = styled(Box, {
  name: 'Tabs',
  slot: 'IntroTextWrapper',
  overridesResolver: (_, styles) => [styles.introTextWrapper]
})(() => ({}));

const IntroText = styled(ContentModule, {
  name: 'Tabs',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})(() => ({}));

const Item = styled(ContentModule, {
  name: 'Tabs',
  slot: 'Item',
  overridesResolver: (_, styles) => [styles.item]
})<{ variant?: string }>``;

export default Tabs;
