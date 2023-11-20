import React from 'react';

// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Grid as SwiperGrid } from 'swiper/modules';
import { type SwiperOptions } from 'swiper/types';

import { styled } from '@mui/material/styles';

import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import Grid from '../Grid';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import type { CarouselDynamicProps, CarouselDynamicOwnerState } from './CarouselDynamic.types';
import Background from '../Background';

import { breakpoints } from '../ThemeRegistry/theme';

const CarouselDynamic = (props: CarouselDynamicProps) => {
  const ownerState: CarouselDynamicOwnerState = { ...props };
  const [jsEnabled, setJsEnabled] = React.useState<boolean>(false);

  const refSwiperWrap = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    setJsEnabled(true);
  }, []);

  const {
    backgroundImage,
    backgroundColor,
    isCarouselDynamicDesktop,
    isCarouselDynamicTablet,
    isCarouselDynamicMobile,
    items,
    variant,
    itemsVariant,
    itemsAspectRatio,
    sidekickLookup,
    introText,
    itemsPerRow = 3,
    numItems = props?.items?.length ?? 3
  } = props;

  const swiperBreakpoints: { [width: number]: SwiperOptions } = {};

  // Can change the slidePerView below if you don't want to show a partial for the next slide
  swiperBreakpoints['1'] = {
    grid: {
      rows: isCarouselDynamicMobile ? 1 : numItems,
      fill: 'row'
    },
    slidesPerView: 1.25,
    spaceBetween: 16
  };

  swiperBreakpoints[breakpoints.sm] = {
    grid: {
      rows: isCarouselDynamicTablet ? 1 : numItems,
      fill: 'row'
    },
    slidesPerView: 1.25,
    spaceBetween: 16
  };

  swiperBreakpoints[breakpoints.md] = {
    grid: {
      rows: isCarouselDynamicDesktop ? 1 : numItems,
      fill: 'row'
    },
    slidesPerView: itemsPerRow > 1 ? 2.5 : 1,
    spaceBetween: 12
  };

  swiperBreakpoints[breakpoints.lg] = {
    grid: {
      rows: isCarouselDynamicDesktop ? 1 : numItems,
      fill: 'row'
    },
    slidesPerView: itemsPerRow > 2 ? 3.5 : 2.5,
    spaceBetween: 16
  };

  if (itemsPerRow === 4) {
    swiperBreakpoints[breakpoints.sm] = {
      grid: {
        rows: isCarouselDynamicDesktop ? 1 : numItems,
        fill: 'row'
      },
      slidesPerView: 2.5,
      spaceBetween: 20
    };

    swiperBreakpoints[breakpoints.lg] = {
      grid: {
        rows: isCarouselDynamicDesktop ? 1 : numItems,
        fill: 'row'
      },
      slidesPerView: 4.5,
      spaceBetween: 20
    };
  } else if (itemsPerRow >= 5) {
    swiperBreakpoints[breakpoints.xl] = {
      grid: {
        rows: isCarouselDynamicDesktop ? 1 : numItems,
        fill: 'row'
      },
      slidesPerView: 5.5,
      spaceBetween: 20
    };
  }

  return (
    <ErrorBoundary>
      <Root ownerState={ownerState} {...sidekick(sidekickLookup)} data-testid={`CarouselDynamic-${variant}`}>
        <CarouselDynamicBackground
          background={backgroundImage}
          backgroundColor={backgroundColor}
          testId="CarouselDynamic-background"
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
          <SwiperWrap ownerState={ownerState} ref={refSwiperWrap} className={jsEnabled ? '' : 'no-js'}>
            <SwiperInnerWrap ownerState={ownerState}>
              <Swiper
                rewind={true}
                breakpointsBase="container"
                cssMode={true}
                className="swiper-horizontal swiper-css-mode"
                modules={[Navigation, SwiperGrid, Pagination, A11y]}
                spaceBetween={24}
                breakpoints={swiperBreakpoints}
                navigation
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
              >
                {items?.map((item, index) => (
                  <SwiperSlide key={item?.id}>
                    <Item
                      backgroundColor={backgroundColor}
                      ownerState={ownerState}
                      {...item}
                      variant={itemsVariant ?? item?.variant}
                      aspectRatio={itemsAspectRatio ?? item?.aspectRatio}
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
  name: 'CarouselDynamic',
  slot: 'Root',
  overridesResolver: ({ ownerState }, styles) => [styles.root, styles[`${ownerState?.variant}`]]
})<{ ownerState: CarouselDynamicOwnerState }>``;

const CarouselDynamicBackground = styled(Background, {
  name: 'CarouselDynamic',
  slot: 'Background',
  overridesResolver: (_, styles) => [styles.background]
})<{}>``;

const ContentGrid = styled(Grid, {
  name: 'CarouselDynamic',
  slot: 'ContentGrid',
  overridesResolver: (_, styles) => [styles.contentGrid]
})<{ ownerState: CarouselDynamicOwnerState }>``;

const IntroTextGrid = styled(Grid, {
  name: 'CarouselDynamic',
  slot: 'IntroTextGrid',
  overridesResolver: (_, styles) => [styles.introTextGrid]
})<{ ownerState: CarouselDynamicOwnerState }>``;

const IntroText = styled(ContentModule, {
  name: 'CarouselDynamic',
  slot: 'IntroText',
  overridesResolver: (_, styles) => [styles.introText]
})<{ ownerState: CarouselDynamicOwnerState }>``;

const SwiperWrap = styled(Box, {
  name: 'CarouselDynamic',
  slot: 'SwiperWrap',
  overridesResolver: (props, styles) => [styles.swiperWrap]
})<{ ownerState: CarouselDynamicOwnerState }>``;

const SwiperInnerWrap = styled(Box, {
  name: 'CarouselDynamic',
  slot: 'SwiperInnerWrap',
  overridesResolver: (_, styles) => [styles.swiperInnerWrap]
})<{ ownerState: CarouselDynamicOwnerState }>``;

const Item = styled(ContentModule, {
  name: 'CarouselDynamic',
  slot: 'Item',
  overridesResolver: (_, styles) => [styles.item]
})<{ ownerState: CarouselDynamicOwnerState }>``;

export default CarouselDynamic;
