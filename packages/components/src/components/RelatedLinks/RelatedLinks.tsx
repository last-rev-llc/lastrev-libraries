import React from 'react';
import Box from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import Link, { LinkProps } from '@last-rev/component-library/dist/components/Link/Link';

import { sidekick } from '../../utils/sidekick';

export interface RelatedLinksProps {
  title?: string;
  links?: Array<LinkProps>;
  sidekickLookup?: any;
}

export const RelatedLinks = ({
  title,
  links,
  sidekickLookup
}: RelatedLinksProps) => {
  return (
    <ErrorBoundary>
      {links ? (
        <Root data-testid="RelatedLinks">
          {title ? (
            <Typography variant="h6" component="h6" data-testid="RelatedLinks-title">{title}</Typography>
          ) : null}
          <Box component="ul" pl={3}
            {...sidekick(sidekickLookup?.categories)}
            data-testid="RelatedLinks-list"
          >
            {links?.map(link => (
              <LinkItem component="li"
                key={link?.id}
                data-testid="RelatedLinks-item"
              >
                <Link href={link?.href}>{link?.text}</Link>
              </LinkItem>
            ))}
          </Box>
        </Root>
      ) : null}
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'RelatedLinks',
  slot: 'Root',
})<{}>(({ theme }) => ({
  marginBottom: theme.spacing(5),
  padding: theme.spacing(3),
  backgroundColor: theme.palette.midnight.A06,
  border: `1px solid ${theme.palette.midnight.A20}`
}));

const LinkItem = styled(Typography, {
  name: 'RelatedLinks',
  slot: 'LinkItem',
})<TypographyProps<React.ElementType>>(({ theme }) => ({
  '&::marker': {
    color: theme.palette.background.greenishBlue,
    fontSize: '1rem'
  },
  
  '&:not(:last-child)': {
    marginBottom: theme.spacing(1)
  },
  
  '& a': {
    color: theme.palette.background.greenishBlue,
    fontSize: 16,
    lineHeight: 1.5,
    textDecoration: 'underline',
   
    '&:hover': {
      textDecoration: 'none'
    }
  }
}));

export default RelatedLinks;
