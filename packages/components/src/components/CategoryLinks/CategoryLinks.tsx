import React from 'react';
import Chip, { ChipProps } from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import Link, { LinkProps } from '@last-rev/component-library/dist/components/Link/Link';

import { sidekick } from '../../utils/sidekick';

export interface CategoryLinkProps {
  links?: Array<LinkProps>;
  sidekickLookup?: any;
}

export const CategoryLinks = ({
  links,
  sidekickLookup
}: CategoryLinkProps) => {
  return (
    <ErrorBoundary>
      {links ? (
        <LinkGroup
          direction="row"
          gap={2}
          {...sidekick(sidekickLookup?.categories)}
          data-testid="CategoryLinks"
        >
          {links?.map(link => (
            <LinkItem
              href={link?.href}
              key={link?.id}
              clickable
              component={Link}
              size="small"
              label={link?.text}
              data-testid="CategoryLinks-link"
            />
          ))}
        </LinkGroup>
      ) : null}
    </ErrorBoundary>
  );
};

const LinkGroup = styled(Stack, {
  name: 'CategoryLinks',
  slot: 'Group'
})<{}>(() => ({
  flexWrap: 'wrap'
}));

const LinkItem = styled(Chip, {
  name: 'CategoryLinks',
  slot: 'Item'
})<ChipProps<React.ElementType>>(() => ({
  
}));

export default CategoryLinks;
