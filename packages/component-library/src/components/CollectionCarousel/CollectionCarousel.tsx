import React from 'react';
import { Container, Box } from '@mui/material';
import styled from '@mui/system/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, A11y } from 'swiper/core';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';
import sidekick from '@last-rev/contentful-sidekick-util';
import { CollectionCarouselProps } from './CollectionCarousel.types';

SwiperCore.use([Navigation, Pagination, A11y]);

export const CollectionCarousel = ({
  items,
  variant,
  itemsWidth,
  itemsVariant,
  CarouselVariantProps = {},
  sidekickLookup
}: CollectionCarouselProps) => {
  if (!items?.length) return null;
  const itemsWithVariant = items.map((item) => ({ ...item, variant: itemsVariant ?? item?.variant }));

  const config = CarouselVariantProps[variant];
  console.log({ items });
  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)} variant={variant} data-testid="CollectionCarousel">
        <ContentContainer maxWidth={itemsWidth} disableGutters>
          <CarouselContainer navigation pagination={{ clickable: true }} loop {...config}>
            {itemsWithVariant.map((item, idx) => (
              <CarouselSlideRoot key={idx}>
                <CarouselSlide>
                  <CarouselContent {...item} sx={undefined} />
                </CarouselSlide>
              </CarouselSlideRoot>
            ))}
          </CarouselContainer>
        </ContentContainer>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'CollectionCarousel',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>(() => ({
  display: 'flex',
  justifyContent: 'center'
}));

const ContentContainer = styled(Container, {
  name: 'CollectionCarousel',
  slot: 'ContentContainer',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>(() => ({
  display: 'flex'
}));

const CarouselContainer = styled(Swiper, {
  name: 'CollectionCarousel',
  slot: 'CarouselContainer',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.carouselContainer]
})<{ variant?: string }>(({ theme }) => ({
  '--swiper-theme-color': theme.palette.primary.main,
  '& > .swiper-pagination-bullets span.swiper-pagination-bullet': {
    margin: '0 10px'
  },
  '& .swiper-pagination-bullet': {
    width: 10,
    height: 10
  },
  '& .swiper-button-prev, .swiper-button-next': {
    [theme.breakpoints.down('lg')]: {
      display: 'none'
    }
  }
}));

const CarouselSlideRoot = styled(SwiperSlide, {
  name: 'CollectionCarousel',
  slot: 'SlideRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.slideRoot]
})``;

const CarouselSlide = styled(Box, {
  name: 'CollectionCarousel',
  slot: 'Slide',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.slide]
})<{ variant?: string }>(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%'
}));

const CarouselContent = styled(ContentModule, {
  name: 'CollectionCarousel',
  slot: 'Content',
  overridesResolver: (_, styles) => [styles.content]
})``;

export default CollectionCarousel;
