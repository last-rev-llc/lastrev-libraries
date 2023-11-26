import React from 'react';
import { Container, Dot, DotLine } from './styled';

const CalculatorStepper = ({ steps, active }) => {
  return (
    <Container>
      {steps.map((step, index) => (
        <>
          <Dot visited={index <= active}>{step}</Dot>
          {index !== steps.length - 1 && <DotLine isActive={active >= index} step={index} />}
        </>
      ))}
    </Container>
  );
};

export default CalculatorStepper;
