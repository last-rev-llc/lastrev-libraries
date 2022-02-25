import React from 'react';
import Box from '@mui/material/Box';
import Typography, { TypographyProps } from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ErrorBoundary from '@last-rev/component-library/dist/components/ErrorBoundary/ErrorBoundary';
import Link, { LinkProps } from '@last-rev/component-library/dist/components/Link/Link';

import { ScrollSpy } from '../../utils/scrollSpy';

export interface ArticleNavProps {
  sideNav?: Array<LinkProps>;
}

export const ArticleNav = ({ sideNav }: ArticleNavProps) => {
  const [active, setActive] = React.useState('');

  const onScrollUpdate = (entry: { target: any; boundingClientRect: any; }, isInViewPort: any) => {
    const { target, boundingClientRect } = entry;
    const menuItem = document.querySelector(`[data-scrollspy-id="${target.id}"]`);
    if (!menuItem) return;
    if (boundingClientRect.y <= 0 && isInViewPort) {
      setActive(`/#${target.id}`);
    }
  };

  return (
    <ErrorBoundary>
      {sideNav ? (
        <>
          <ScrollSpy handleScroll={onScrollUpdate} />
          <Root data-testid="ArticleNav">
            {/* TODO: Use localization lookup for this overline (IAS-117) */}
            {sideNav.length > 0 ? (
              <Typography variant="overline">
                Contents
              </Typography>
            ) : null}

            <Box component="ul" p={0}
              data-testid="ArticleNav-list"
              sx={{ listStyle: 'none' }}
            >
              {sideNav?.map((link, idx) => (
                <NavLink component="li" mb={2} pl={1}
                  key={link?.id}
                  data-testid="ArticleNav-link"
                  data-scrollspy-id={String(link?.href).substring(2)}
                  className={`
                    ${idx === 0 && !active ? 'active' : ''}
                    ${active === link?.href && 'active'}
                  `}
                  onClick={() => {
                    setTimeout(() => {
                      setActive(link?.href as string);
                    }, 500);
                  }}
                >
                  <Link href={String(link?.href).substring(1)}>{link?.text}</Link>
                </NavLink>
              ))}
            </Box>
          </Root>
        </>
      ) : null}
    </ErrorBoundary>
  );
};

const Root = styled(Box, {
  name: 'ArticleNav',
  slot: 'Root',
})<{}>(({ theme }) => ({
  position: 'sticky',
  top: 140,
  padding: theme.spacing(1, 0, 3),
}));

const NavLink = styled(Typography, {
  name: 'ArticleNav',
  slot: 'NavLink',
})<TypographyProps<React.ElementType>>(({ theme }) => ({
  borderLeft: '2px solid transparent',
  fontSize: 15,
  lineHeight: 1.2,

  '& a': {
    color: theme.palette.midnight.A70,
    fontWeight: 500,

    '&:hover': {
      color: theme.palette.text.primary,
      textDecoration: 'none'
    }
  },

  '&.active': {
    borderLeftColor: theme.palette.background.integralOrange,

    '& a': {
      color: theme.palette.text.primary,
      fontWeight: 600
    }
  }
}));

export default ArticleNav;
