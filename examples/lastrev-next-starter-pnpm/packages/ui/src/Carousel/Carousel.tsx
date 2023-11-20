'use client';
import React from 'react';

// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Grid as SwiperGrid, Autoplay } from 'swiper/modules';
import { type SwiperOptions } from 'swiper/types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import type { CarouselProps, CarouselOwnerState } from './Carousel.types';
import Background from '../Background';

import { breakpoints } from '../ThemeRegistry/theme';

const Carousel = (props: CarouselProps) => {
  const ownerState = { ...props };

  const {
    backgroundImage,
    backgroundColor,
    isCarouselDesktop,
    isCarouselTablet,
    isCarouselMobile,
    carouselAutoPlay,
    items,
    variant,
    itemsVariant,
    sidekickLookup,
    introText,
    itemsPerRow = 3,
    numItems = props?.items?.length ?? 3
  } = props;

  const swiperBreakpoints: { [width: number]: SwiperOptions } = {};
  let spaceBetween = 24;
  let slidesPerView = Math.min(itemsPerRow, numItems);
  switch (itemsVariant) {
    case 'logo':
      spaceBetween = 80;
      break;
  }

  // Can change the slidePerView below if you don't want to show a partial for the next slide
  swiperBreakpoints['1'] = {
    grid: {
      rows: isCarouselMobile ? 1 : numItems,
      fill: 'row'
    },
    slidesPerView: 2,
    spaceBetween
  };

  swiperBreakpoints[breakpoints.sm] = {
    grid: {
      rows: isCarouselTablet ? 1 : numItems,
      fill: 'row'
    },
    slidesPerView: 3,
    spaceBetween
  };

  swiperBreakpoints[breakpoints.md] = {
    grid: {
      rows: isCarouselDesktop ? 1 : numItems,
      fill: 'row'
    },
    slidesPerView: itemsPerRow > 1 ? slidesPerView : 1,
    spaceBetween
  };

  swiperBreakpoints[breakpoints.lg] = {
    grid: {
      rows: isCarouselDesktop ? 1 : numItems,
      fill: 'row'
    },
    slidesPerView: itemsPerRow > 2 ? slidesPerView : slidesPerView,
    spaceBetween
  };

  if (itemsPerRow === 4) {
    swiperBreakpoints[breakpoints.sm] = {
      grid: {
        rows: isCarouselDesktop ? 1 : numItems,
        fill: 'row'
      },
      slidesPerView: 4,
      spaceBetween
    };

    swiperBreakpoints[breakpoints.lg] = {
      grid: {
        rows: isCarouselDesktop ? 1 : numItems,
        fill: 'row'
      },
      slidesPerView: slidesPerView,
      spaceBetween
    };
  } else if (itemsPerRow >= 5) {
    swiperBreakpoints[breakpoints.xl] = {
      grid: {
        rows: isCarouselDesktop ? 1 : numItems,
        fill: 'row'
      },
      slidesPerView: slidesPerView,
      spaceBetween
    };
  }

  return (
    <ErrorBoundary>
      <Root ownerState={ownerState} {...sidekick(sidekickLookup)} data-testid={`Carousel-${variant}`}>
        <CarouselBackground
          background={backgroundImage}
          backgroundColor={backgroundColor}
          testId="Carousel-background"
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
          <SwiperWrap ownerState={ownerState}>
            <SwiperInnerWrap ownerState={ownerState}>
              <Swiper
                rewind={true}
                breakpointsBase="container"
                cssMode={true}
                modules={[Navigation, SwiperGrid, Pagination, A11y, Autoplay]}
                spaceBetween={24}
                breakpoints={swiperBreakpoints}
                pagination={{ clickable: true }}
                navigation
                autoplay={carouselAutoPlay}
                // scrollbar={{ draggable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={() => console.log('slide change')}
              >
                {items?.map((item, index) => (
                  <SwiperSlide key={item?.id}>
                    <Item
                      backgroundColor={backgroundColor}
                      ownerState={ownerState}
                      {...item}
                      variant={itemsVariant ?? item?.variant}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </SwiperInnerWrap>
          </SwiperWrap>
        </ContentGrid>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Carousel',
  slot: 'Root',
  overridesResolver: ({ ownerState }, styles) => [styles.root, styles[`${ownerState?.variant}`]]
})<{ ownerState: CarouselOwnerState }>``;

const CarouselBackground = styled(Background, {
  name: 'Carousel',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const ContentGrid = styled(Grid, {
  name: 'Carousel',
  slot: 'ContentGrid',
  overridesResolver: (_, styles) => [styles.contentGrid]
})<{ ownerState: CarouselOwnerState }>``;

const IntroTextGrid = styled(Grid, {
  name: 'Carousel',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: CarouselOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'Carousel',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: CarouselOwnerState }>``;

const SwiperWrap = styled(Box, {
  name: 'Carousel',
  slot: 'SwiperWrap',
  overridesResolver: (_, styles) => [styles.swiperWrap]
})<{ ownerState: CarouselOwnerState }>``;

const SwiperInnerWrap = styled(Box, {
  name: 'Carousel',
  slot: 'SwiperInnerWrap',
  overridesResolver: (_, styles) => [styles.swiperInnerWrap]
})<{ ownerState: CarouselOwnerState }>``;

const Item = styled(ContentModule, {
  name: 'Carousel',
  slot: 'Item',
  overridesResolver: (_, styles) => [styles.item]
})<{ ownerState: CarouselOwnerState }>``;

export default Carousel;
