import React from 'react';
import { Box, Container, Grid, List, ListItemButton, ListItemText, Typography } from '@material-ui/core';
import styled from '@material-ui/system/styled';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/core';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import Link from '@last-rev/component-library/dist/components/Link/Link';
import Media from '@last-rev/component-library/dist/components/Media/Media';
import Text from '@last-rev/component-library/dist/components/Text/Text';
import { MediaProps } from '@last-rev/component-library/dist/components/Media/Media.types';
import sidekick from 'lrns-utils/sidekick';

SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);

export interface QuizProps {
  __typename?: string;
  sidekickLookup?: any;
  title?: string;
  intro?: any;
  outro?: any;
  image?: MediaProps;
  settings: {
    steps?: Step[];
  };
}

type Step = {
  id: string;
  title: string;
  fields?: Field[];
};

type Field = {
  id: string;
  name: string;
  type: string;
  field: string;
  label: string;
  options: Option[];
  schema: Schema;
  placeholder: string;
};

type Schema = {
  type: string;
  value: boolean;
  strict: boolean;
};

type Option = {
  label: string;
  value?: string;
};

export interface BoxProps {
  step: Step;
}

export const Step = ({ step }: BoxProps) => {
  // Selects only one option
  const [selected, setSelected] = React.useState<{ [key: string]: boolean }>({});

  const handleListItemClick = (id: string) => {
    setSelected({
      ...selected,
      [id]: !selected[id]
    });
  };

  return (
    <Box sx={{ width: '100%' }}>
      {step.title ? (
        <Typography variant="h4" component="h4">
          {step.title}
        </Typography>
      ) : null}
      {step.fields?.map((fld) =>
        fld ? (
          <React.Fragment key={fld.id}>
            {fld.type !== 'link' ? (
              <Typography variant="h4" component="h5">
                {fld.label}
              </Typography>
            ) : (
              <Box key={fld.id} sx={{ textAlign: 'center', marginBottom: 2 }}>
                <Link variant="button-contained" text={fld.label} />
              </Box>
            )}
            {fld.options ? (
              <List
                component="ul"
                aria-label="answer options"
                sx={{
                  columns: fld.options.length > 3 ? 2 : 1,
                  marginBottom: 3
                }}>
                {fld.options?.map((opt, idx) => (
                  <ListItemButton
                    key={`${fld.id}-${idx}`}
                    id={`${fld.id}-${idx}`}
                    component="li"
                    selected={selected[`${fld.id}-${idx}`]}
                    onClick={() => handleListItemClick(`${fld.id}-${idx}`)}
                    sx={{
                      marginBottom: 2,
                      border: '2px solid #30CEC2',
                      borderRadius: 2
                    }}>
                    <ListItemText primary={opt.label} />
                  </ListItemButton>
                ))}
              </List>
            ) : null}
          </React.Fragment>
        ) : null
      )}
    </Box>
  );
};

export const Quiz = ({ sidekickLookup, title, intro, image, outro, settings }: QuizProps) => {
  return (
    <ErrorBoundary>
      <Root {...sidekick(sidekickLookup)}>
        <ContentContainer maxWidth={'lg'}>
          <Grid
            container
            spacing={5}
            wrap="nowrap"
            direction="row-reverse"
            sx={{
              position: 'relative',
              margin: '0 auto',
              transform: 'translateX(-40px)'
            }}>
            <Grid item xs={12} sm={8} sx={{ paddingBottom: 8 }}>
              {title ? (
                <Typography {...sidekick(sidekickLookup?.title)} variant="h2" component="h2" align="right">
                  {title}
                </Typography>
              ) : null}
              {intro ? <Text sidekickLookup={sidekickLookup?.intro} body={intro} align="right" /> : null}
            </Grid>
            {image ? (
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  position: 'absolute',
                  bottom: -40,
                  left: 40,
                  width: '100%',
                  height: '100%'
                }}>
                <Media {...image} {...sidekick(sidekickLookup?.image)} />
              </Grid>
            ) : null}
          </Grid>

          {settings?.steps?.length ? (
            <QuizWrap
              p={4}
              sx={{
                width: '100%',
                maxWidth: 1180,
                m: '0 auto 20px',
                backgroundColor: '#bdefeb',
                borderRadius: 20,
                color: '#444'
              }}>
              <CarouselContainer
                {...sidekick(sidekickLookup?.settings)}
                cssMode
                navigation
                pagination={{ clickable: true }}
                mousewheel
                keyboard
                loop>
                {settings?.steps.map((step, idx) => (
                  <SwiperSlide key={idx}>
                    <CarouselItem>
                      <Step step={step} />
                    </CarouselItem>
                  </SwiperSlide>
                ))}
              </CarouselContainer>
            </QuizWrap>
          ) : null}
          {outro ? (
            <Box
              p={4}
              pb={2}
              sx={{
                width: '100%',
                maxWidth: 1024,
                m: '60px auto 0',
                border: '1px solid white',
                textAlign: 'center'
              }}>
              <Text sidekickLookup={sidekickLookup?.outro} body={outro} align="center" />
            </Box>
          ) : null}
        </ContentContainer>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'Quiz',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({
  'background': 'linear-gradient(50deg, rgba(48,205,194,1) 0%, rgba(0,92,122,1) 100%)',
  '& .MuiTypography-root': {
    color: 'white'
  }
}));

const ContentContainer = styled(Container, {
  name: 'Section',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => ({
    ...styles.contentContainer,
    'paddingTop': 40,
    'paddingBottom': 60,

    '& [class*="Text-root"] p': {
      marginBottom: 20
    },
    '& code': {
      color: '#f6caff',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: '1em'
    },
    '& img': {
      objectFit: 'contain',
      width: '100%',
      height: '100%',
      maxWidth: 240,
      maxHeight: 240
    }
  })
})<{ variant?: string }>(() => ({}));

const QuizWrap = styled(Box, {
  name: 'Section',
  slot: 'QuizWrap',
  overridesResolver: (_, styles) => ({
    ...styles.quizWrap,
    'padding': '70px 25px 50px',
    '& > .swiper-container': {
      padding: '50px 25px 0'
    },
    '& .swiper-container-horizontal > .swiper-pagination-bullets': {
      bottom: 'auto',
      top: 0
    }
  })
})<{ variant?: string }>(() => ({
  '& .MuiTypography-root': {
    color: '#666'
  },
  '& .MuiTypography-h4': {
    fontWeight: 'bold'
  },
  '& .MuiListItemButton-root.Mui-selected': {
    'backgroundColor': '#f6caff',
    '&:hover': {
      backgroundColor: '#f7dafb'
    }
  }
}));

const CarouselContainer = styled(Swiper, {
  name: 'CollectionCarousel',
  slot: 'CarouselContainer',
  overridesResolver: (_, styles) => ({
    ...styles.carouselContainer
  })
})<{ variant?: string }>(({ theme }) => ({
  '--swiper-navigation-size': 20,
  '& .swiper-button-prev': {
    left: 0,
    height: 40,
    color: theme.palette.secondary.main
  },
  '& .swiper-button-next': {
    right: 0,
    color: theme.palette.secondary.main
  },
  '& > .swiper-pagination-bullets span.swiper-pagination-bullet': {
    margin: '0 10px',
    backgroundColor: 'transparent',
    border: '1px solid #005C7A'
  },
  '& > .swiper-pagination-bullets span.swiper-pagination-bullet-active': {
    backgroundColor: theme.palette.primary.main
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

export default Quiz;
