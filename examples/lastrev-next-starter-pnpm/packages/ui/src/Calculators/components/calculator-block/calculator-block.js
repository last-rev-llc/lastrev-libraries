import React from 'react';
import Button from '../button';
import { Text } from '../text';
import { container, noMargin } from './calculator-block.module.scss';
import { Container } from './styled';

const CalculatorBlock = ({
  title,
  text,
  cta,
  url,
  background = '#705ef7',
  buttonKind = 'whiteOutline',
  textColor = '#ffffff',
  hasNoMargin = false
}) => (
  <Container background={background} className={`${container} ${hasNoMargin ? noMargin : ''}`}>
    <Text size="24" margin="4px 0 34px 0" weight="700" kind="h3" color={textColor}>
      {title}
    </Text>
    <Text lineHeight="23px" size="18" weight="normal" kind="h3" margin="0 0 32px 0" color={textColor}>
      {text}
    </Text>
    <Button href={url} kind={buttonKind}>
      {cta}
    </Button>
  </Container>
);

export default CalculatorBlock;
