import React from 'react';
import { Container, Box } from '@mui/material';
import { Breakpoint } from '@mui/material';
import styled from '@mui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
import { MediaProps } from '../Media';
import { CardProps } from '../Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import ContentModule from '../ContentModule';
import sidekick from '../../utils/sidekick';
SwiperCore.use([Navigation, Pagination]);

export interface CollectionCarouselProps {
  items?: CardProps[];
  background?: MediaProps;
  variant: string;
  itemsVariant?: string;
  itemsWidth?: false | Breakpoint | undefined;
  theme: any;
  sidekickLookup: string;
  CarouselVariantProps?: { [key: string]: Swiper };
}

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

  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)} variant={variant} data-testid="CollectionCarousel">
        <ContentContainer maxWidth={itemsWidth} disableGutters>
          <CarouselContainer navigation pagination={{ clickable: true }} loop {...config}>
            {itemsWithVariant.map((item, idx) => (
              <SwiperSlide key={idx}>
                <CarouselItem>
                  <ContentModule {...item} />
                </CarouselItem>
              </SwiperSlide>
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
  overridesResolver: (_, styles) => [styles.contentContainer]
})<{ variant?: string }>(() => ({
  display: 'flex'
}));

const CarouselContainer = styled(Swiper, {
  name: 'CollectionCarousel',
  slot: 'CarouselContainer',
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

const CarouselItem = styled(Box, {
  name: 'CollectionCarousel',
  slot: 'CarouselItem',
  overridesResolver: (_, styles) => [styles.carouselItem]
})<{ variant?: string }>(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%'
}));

export default CollectionCarousel;