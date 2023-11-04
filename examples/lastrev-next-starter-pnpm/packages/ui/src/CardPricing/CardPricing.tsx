import React from 'react';

import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import { default as MuiCardMedia } from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

import sidekick from '@last-rev/contentful-sidekick-util';

import { getFirstOfArray } from '../utils/getFirstOfArray';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';
import type { CardPricingProps, CardPricingOwnerState } from './CardPricing.types';
import { type LinkProps } from '../Link';

const CardPricing = (props: CardPricingProps) => {
  const { id, overline, price, textBelowPrice, body, link, actions, variant, loading, sidekickLookup } = props;

  const ownerState = {
    ...props,
    variant
  };

  return (
    <ErrorBoundary>
      <Root ownerState={ownerState} data-testid="CardPricing" {...sidekick(sidekickLookup)}>
        <CardPricingWrap ownerState={ownerState}>
          {!loading && (overline || price || textBelowPrice || body) ? (
            // @ts-ignore: TODO
            <ContentWrap ownerState={ownerState}>
              {overline ? (
                <Overline
                  {...sidekick(sidekickLookup, 'overline')}
                  variant="overline"
                  data-testid="CardPricing-overline"
                  // @ts-ignore: TODO
                  ownerState={ownerState}>
                  {overline}
                </Overline>
              ) : null}

              {price ? (
                <Price
                  {...sidekick(sidekickLookup, 'price')}
                  component="p"
                  variant="h3"
                  data-testid="CardPricing-price"
                  // @ts-ignore: TODO
                  ownerState={ownerState}>
                  {price}
                </Price>
              ) : null}

              {textBelowPrice ? (
                <TextBelowPrice
                  {...sidekick(sidekickLookup, 'textbelowprice')}
                  component="p"
                  variant="h4"
                  data-testid="CardPricing-textbelowprice"
                  // @ts-ignore: TODO
                  ownerState={ownerState}>
                  {textBelowPrice}
                </TextBelowPrice>
              ) : null}

              {body ? (
                <BodyWrap ownerState={ownerState} {...sidekick(sidekickLookup, 'body')}>
                  <Body __typename="RichText" body={body} ownerState={ownerState} data-testid="CardPricing-body" />
                </BodyWrap>
              ) : null}
            </ContentWrap>
          ) : null}

          {loading ? (
            <ContentWrap ownerState={ownerState} data-testid="CardPricing-ContentSkeleton">
              <Overline ownerState={ownerState} variant="overline">
                <Skeleton variant="text" width="100%" />
              </Overline>

              <Price ownerState={ownerState} variant="display5">
                <Skeleton variant="text" width="100%" />
              </Price>

              <TextBelowPrice ownerState={ownerState} variant="display6">
                <Skeleton variant="text" width="100%" />
              </TextBelowPrice>

              <BodyWrap ownerState={ownerState} {...sidekick(sidekickLookup, 'body')}>
                <Body ownerState={ownerState} variant="bodySmall">
                  <Skeleton variant="text" width="100%" />
                </Body>
              </BodyWrap>
            </ContentWrap>
          ) : null}
          {(actions?.length || loading) && (
            <ActionsWrap
              {...sidekick(sidekickLookup, 'actions')}
              data-testid="CardPricing-actions"
              // @ts-ignore: TODO
              ownerState={ownerState}>
              {!loading ? (
                actions?.map((link: any, index: number) => (
                  <Action
                    key={`card-${id}-link-${link?.id || index}`}
                    {...(link as LinkProps)}
                    ownerState={ownerState}
                  />
                ))
              ) : (
                <Skeleton variant="text" width="100%" />
              )}
            </ActionsWrap>
          )}
        </CardPricingWrap>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'CardPricing',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: CardPricingOwnerState }>``;

const CardPricingWrap = styled(MuiCard, {
  name: 'CardPricing',
  slot: 'CardPricingWrap',
  overridesResolver: (props, styles) => [styles.cardWrap]
})<{ ownerState: CardPricingOwnerState }>``;

const CardPricingLink = styled(CardActionArea, {
  name: 'CardPricing',
  slot: 'CardPricingLink',
  overridesResolver: (_, styles) => [styles.link]
})<{ ownerState: CardPricingOwnerState }>``;

const CardPricingMedia = styled(MuiCardMedia, {
  name: 'CardPricing',
  slot: 'CardPricingMedia',
  overridesResolver: (_, styles) => [styles.cardMedia]
})<{ ownerState: CardPricingOwnerState }>``;

const ActionsWrap = styled(CardActions, {
  name: 'CardPricing',
  slot: 'ActionsWrap',
  overridesResolver: (_, styles) => [styles.actionsWrap]
})<{ ownerState: CardPricingOwnerState }>``;

const Action = styled(ContentModule, {
  name: 'CardPricing',
  slot: 'CardPricingAction',
  overridesResolver: (_, styles) => [styles.action]
})<{ ownerState: CardPricingOwnerState }>``;

const ContentWrap = styled(CardContent, {
  name: 'CardPricing',
  slot: 'ContentWrap',
  overridesResolver: (_, styles) => [styles.contentWrap]
})<{ ownerState: CardPricingOwnerState }>``;

const Overline = styled(Typography, {
  name: 'CardPricing',
  slot: 'Overline',
  overridesResolver: (_, styles) => [styles.overline]
})<{ ownerState: CardPricingOwnerState }>``;

const Price = styled(Typography, {
  name: 'CardPricing',
  slot: 'Price',
  overridesResolver: (_, styles) => [styles.price]
})<{ ownerState: CardPricingOwnerState }>``;

const TextBelowPrice = styled(Typography, {
  name: 'CardPricing',
  slot: 'TextBelowPrice',
  overridesResolver: (_, styles) => [styles.textbelowprice]
})<{ ownerState: CardPricingOwnerState }>``;

const BodyWrap = styled(Box, {
  name: 'CardPricing',
  slot: 'BodyWrap',
  overridesResolver: (_, styles) => [styles.bodyWrap]
})<{ ownerState: CardPricingOwnerState }>``;

const Body = styled(ContentModule, {
  name: 'CardPricing',
  slot: 'Body',
  overridesResolver: (_, styles) => [styles.body]
})<{ ownerState: CardPricingOwnerState }>``;

export default CardPricing;
