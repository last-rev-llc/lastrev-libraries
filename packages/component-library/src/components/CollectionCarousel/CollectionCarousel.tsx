import React from 'react';
import { Container, Box } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core';
import styled from '@material-ui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
import { MediaProps } from '../Media';
import { CardProps } from '../Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import SwiperCore, { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/core';
import ContentModule from '../ContentModule';
SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);

export interface CollectionCarouselProps {
  items?: CardProps[];
  background?: MediaProps;
  variant?: string;
  itemsVariant?: string;
  theme: any;
  contentWidth?: false | Breakpoint | undefined;
}

export const CollectionCarousel = ({
  items,
  contentWidth,
  background,
  variant,
  itemsVariant
}: CollectionCarouselProps) => {
  console.log('CollectionCarousel', { items, contentWidth, background, variant });
  if (!items?.length) return null;
  const itemsWithVariant = items.map((item) => ({ ...item, variant: itemsVariant ?? item?.variant }));
  return (
    <ErrorBoundary>
      <Root variant={variant}>
        <ContentContainer maxWidth={contentWidth}>
          <CarouselContainer cssMode navigation pagination={{ clickable: true }} mousewheel keyboard loop>
            {items.map((item, idx) => (
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
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({}));

const ContentContainer = styled(Container, {
  name: 'CollectionCarousel',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => ({
    ...styles.contentContainer
  })
})<{ variant?: string }>(() => ({}));

const CarouselContainer = styled(Swiper, {
  name: 'CollectionCarousel',
  slot: 'CarouselContainer',
  overridesResolver: (_, styles) => ({
    ...styles.carouselContainer
  })
})<{ variant?: string }>(({ theme }) => ({
  '--swiper-navigation-size': 20,
  '& .swiper-button-prev': {
    height: 40,
    color: theme.palette.primary.main
  },
  '& .swiper-button-next': {
    color: theme.palette.primary.main
  },
  '& .swiper-pagination-bullet-active': {
    backgroundColor: theme.palette.primary.main
  },
  '& > .swiper-pagination-bullets span.swiper-pagination-bullet': {
    margin: '0 10px'
  },
  '& .swiper-pagination-bullet': {
    width: 14,
    height: 14
  }
}));

const CarouselItem = styled(Box, {
  name: 'CollectionCarousel',
  slot: 'CarouselItem',
  overridesResolver: (_, styles) => ({
    ...styles.carouselItem
  })
})<{ variant?: string }>(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
}));

export default CollectionCarousel;
