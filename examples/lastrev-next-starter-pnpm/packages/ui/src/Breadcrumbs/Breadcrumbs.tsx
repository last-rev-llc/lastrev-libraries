import React from 'react';

import { styled } from '@mui/material/styles';

import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import type { BreadcrumbsProps, BreadcrumbsOwnerState } from './Breadcrumbs.types';
import { LinkProps } from '../Link';

const Breadcrumbs = (props: BreadcrumbsProps) => {
  const ownerState = { ...props };

  const { links } = props;

  if (!links?.length) return null;

  return (
    <ErrorBoundary>
      <Root aria-label="breadcrumb" ownerState={ownerState} separator="&bull;">
        {links?.map((link: any, index: number) => (
          <Breadcrumb key={`breadcrumb-${index}-${link?.id}`} {...(link as LinkProps)} ownerState={ownerState} />
        ))}
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(MuiBreadcrumbs, {
  name: 'Breadcrumbs',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ visible?: boolean; ownerState: BreadcrumbsOwnerState }>``;

const Breadcrumb = styled(ContentModule, {
  name: 'Breadcrumbs',
  slot: 'Breadcrumb',
  overridesResolver: (_, styles) => [styles.breadcrumb]
})<{ ownerState: BreadcrumbsOwnerState }>``;

export default Breadcrumbs;
