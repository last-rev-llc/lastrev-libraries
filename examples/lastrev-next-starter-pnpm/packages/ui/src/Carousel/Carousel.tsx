import React from 'react';

// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

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

  const { background, backgroundColor, items, variant, itemsVariant, sidekickLookup, introText } = props;

  // TODO: See if this type can be pulled from Swiper
  const swiperBreakpoints: { [key: string]: { slidesPerView: number; spaceBetween: number } } = {};
  swiperBreakpoints[breakpoints.sm] = {
    slidesPerView: variant === 'onePerRow' ? 1 : 2
    // spaceBetween: 24
  };

  if (variant !== 'onePerRow') {
    swiperBreakpoints[breakpoints.md] = {
      slidesPerView: 2
      // spaceBetween: 24
    };

    if (variant !== 'twoPerRow') {
      swiperBreakpoints[breakpoints.lg] = {
        slidesPerView: 3
        // spaceBetween: 36
      };

      if (variant !== 'threePerRow') {
        swiperBreakpoints[breakpoints.xl] = {
          slidesPerView: 4
          // spaceBetween: 48
        };
      }
    }
  }

  return (
    <ErrorBoundary>
      <Root ownerState={ownerState} {...sidekick(sidekickLookup)} data-testid={`Carousel-${variant}`}>
        <CarouselBackground background={background} backgroundColor={backgroundColor} testId="Carousel-background" />
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
                // install Swiper modules
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween="24px"
                slidesPerView={1}
                breakpoints={swiperBreakpoints}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}>
                {items?.map((item, index) => (
                  <SwiperSlide key={item?.id}>
                    <Item
                      ownerState={ownerState}
                      {...item}
                      variant={itemsVariant ?? item?.variant}
                      position={index + 1}
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
