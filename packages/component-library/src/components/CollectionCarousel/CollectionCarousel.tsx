import React from 'react';
import { Container, Box } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core';
import styled from '@material-ui/system/styled';
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
}

export const CollectionCarousel = ({
  items,
  variant,
  itemsWidth,
  itemsVariant,
  sidekickLookup
}: CollectionCarouselProps) => {
  if (!items?.length) return null;
  const itemsWithVariant = items.map((item) => ({ ...item, variant: itemsVariant ?? item?.variant }));

  const CAROUSEL_CONFIG: { [key: string]: any } = {
    'carousel-small': {
      slidesPerView: 1,
      spaceBetween: 0,
      breakpoints: {
        //windows larger than...
        640: {
          slidesPerView: 4
        }
      }
    },
    'carousel-large': {
      slidesPerView: 1,
      spaceBetween: 0,
      cssMode: true
    }
  };

  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)} variant={variant} data-testid="CollectionCarousel">
        <ContentContainer maxWidth={itemsWidth} disableGutters>
          <CarouselContainer navigation pagination={{ clickable: true }} {...CAROUSEL_CONFIG[variant]} loop>
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
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({
  display: 'flex',
  justifyContent: 'center'
}));

const ContentContainer = styled(Container, {
  name: 'CollectionCarousel',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => ({
    ...styles.contentContainer
  })
})<{ variant?: string }>(() => ({
  display: 'flex'
}));

const CarouselContainer = styled(Swiper, {
  name: 'CollectionCarousel',
  slot: 'CarouselContainer',
  overridesResolver: (_, styles) => ({
    ...styles.carouselContainer
  })
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
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
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
  height: '100%',
  width: '100%'
}));

export default CollectionCarousel;
