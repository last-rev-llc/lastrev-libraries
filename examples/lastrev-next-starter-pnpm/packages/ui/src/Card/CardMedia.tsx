import React from 'react';

import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import sidekick from '@last-rev/contentful-sidekick-util';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import { CardProps } from './Card.types';
import Link from '../Link';

import getFirstOfArray from '../utils/getFirstOfArray';
import useThemeProps from '../utils/useThemeProps';

export const Card = (inProps: CardProps) => {
  const props: CardProps = useThemeProps({
    name: 'Card',
    props: inProps
  });
  const { media, link, variant, position, sidekickLookup } = props;

  const image = getFirstOfArray(media);

  if (!image) return null;

  return (
    <ErrorBoundary>
      <Root data-testid="Card" {...sidekick(sidekickLookup)} {...(props as any)}>
        {!!link ? <CardLink component={Link} noLinkStyle {...(link as any)} /> : null}
        <Media>
          <ContentModule {...sidekick(sidekickLookup, 'media')} {...image} data-testid="Card-media" />
        </Media>
      </Root>
    </ErrorBoundary>
  );
};

const shouldForwardProp = (prop: string) =>
  prop !== 'variant' &&
  prop !== 'sidekickLookup' &&
  prop !== 'media' &&
  prop !== 'link' &&
  prop !== 'ownerState' &&
  prop !== 'noLinkStyle' &&
  prop !== 'colorScheme';

const Root = styled(MuiCard, {
  name: 'Card',
  slot: 'Root',
  shouldForwardProp: (prop) => shouldForwardProp(prop as string),
  overridesResolver: (_, styles) => [styles.root]
})<CardProps>(() => ({}));

const CardLink = styled(CardActionArea, {
  name: 'Card',
  slot: 'CardLink',

  overridesResolver: (_, styles) => [styles.cardLink]
})(() => ({}));

const Media = styled(CardMedia, {
  name: 'Card',
  slot: 'CardMedia',
  shouldForwardProp,
  overridesResolver: (_, styles) => [styles.cardMedia]
})(() => ({}));

export default Card;
