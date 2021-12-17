import React from 'react';
import { Box, Button, Grid, MobileStepper, Typography } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import styled from '@mui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
import Card, { CardProps } from '../Card';
import Text, { RichText } from '../Text';

export interface CarouselProps {
  __typename?: string;
  variant?: any;
  title: string;
  body?: RichText;
  items?: CardProps[];
  itemsVariant?: string;
  theme: any;
}

export interface CardOverrides {}

export const Carousel = ({ variant, title, body, items, theme }: CarouselProps) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <ErrorBoundary>
      <CarouselRoot variant={variant} data-testid="Carousel">
        {title ? (
          <Typography variant="h3" component="h3" data-testid="Carousel-title">
            {title}
          </Typography>
        ) : null}
        {body ? <Text body={body} data-testid="Carousel-body" /> : null}
        <Grid container spacing={2} alignItems="center" data-testid="Carousel-items">
          {items?.map((item, idx) => {
            return (
              <Grid
                item
                style={{
                  display: activeStep === idx ? 'block' : 'none',
                  margin: '0 auto'
                }}
              >
                <Card {...item} />
              </Grid>
            );
          })}
        </Grid>
        <MobileStepper
          steps={items?.length ?? 0}
          position="static"
          variant="dots"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext} disabled={items && activeStep === items?.length - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        />
      </CarouselRoot>
    </ErrorBoundary>
  );
};

const CarouselRoot = styled(Box, {
  name: 'Carousel',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>(() => ({
  textAlign: 'center'
}));

export default Carousel;
