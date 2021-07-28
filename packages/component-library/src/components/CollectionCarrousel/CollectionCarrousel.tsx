import React from 'react';
import { Container, Box, Button, Typography } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import styled from '@material-ui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
import { MediaProps } from '../Media';
import { CardProps } from '../Card';
import Section from '../Section';

export interface CollectionCarrouselProps {
  items?: CardProps[];
  background?: MediaProps;
  variant?: string;
  itemsVariant?: string;
  theme: any;
  contentWidth?: false | Breakpoint | undefined;
}

function getSteps() {
  return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
}

export const CollectionCarrousel = ({
  items,
  contentWidth,
  background,
  variant,
  itemsVariant
}: CollectionCarrouselProps) => {
  console.log('CollectionCarrousel', { items, contentWidth, background, variant });
  if (!items?.length) return null;
  const itemsWithVariant = items.map((item) => ({ ...item, variant: itemsVariant ?? item?.variant }));
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (n: number) => {
    setActiveStep(n);
    console.log('im here')
  };

  return (
    <ErrorBoundary>
      <Root variant={variant}>
        <ContentContainer maxWidth={contentWidth}>
          <Section
            contents={itemsWithVariant}
            background={background}
            variant={`carrouselCollectionCarrousel-${variant}`}
            styles={{ root: { py: 2 } }}
          />
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepButton onClick={() => {handleStep(index)}} />
              </Step>
            ))}
          </Stepper>
          <div>
          {activeStep > 0 ? (
              <ArrowBackIosIcon onClick={handleBack} />
            ) : (
              <ArrowBackIosIcon
                color="primary"
                onClick={() => {
                  handleStep(steps.length-1);
                }}
              />
            )}
            {activeStep < steps.length - 1? (
            <ArrowForwardIosIcon color="primary" onClick={handleNext} />
            ) : (
              <ArrowForwardIosIcon
              color="primary"
              onClick={() => {
                handleStep(0);
              }}
            /> 
            )}
          </div>
        </ContentContainer>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'CollectionCarrousel',
  slot: 'Root',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({}));

const ContentContainer = styled(Container, {
  name: 'CollectionCarrousel',
  slot: 'ContentContainer',
  overridesResolver: (_, styles) => ({
    ...styles.contentContainer
  })
})<{ variant?: string }>(() => ({}));

export default CollectionCarrousel;
