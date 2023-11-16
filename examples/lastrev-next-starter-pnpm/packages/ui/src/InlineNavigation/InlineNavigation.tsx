import React, { useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

import type { InlineNavigationProps, InlineNavigationOwnerState } from './InlineNavigation.types';
import ContentModule from '../ContentModule';
import { useScrollTrigger } from '@mui/material';
import { Link } from '../../../graphql-sdk/src/types';
import Grid from '../Grid';
import sidekick from '@last-rev/contentful-sidekick-util';

const InlineNavigation = React.forwardRef<any, InlineNavigationProps>(function InlineNavigation(props, ref) {
  const { subNavigation, id, sidekickLookup, ...other } = props;
  const [activeLink, setActiveLink] = React.useState('');
  const trigger = useScrollTrigger({
    disableHysteresis: true
  });

  useEffect(() => {
    const handleScroll = () => {
      let foundActive = false;
      subNavigation
        ?.filter((link) => (link as Link)?.href?.startsWith('#'))
        ?.forEach((link) => {
          const section = document.querySelector((link as Link)?.href);
          if (section && window.pageYOffset >= section?.offsetTop - 100) {
            setActiveLink((link as Link)?.href);
            foundActive = true;
          }
        });
      if (!foundActive) setActiveLink('');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [subNavigation]);
  const ownerState = { ...props, trigger, activeLink };
  return (
    <Root ownerState={ownerState} {...sidekick(sidekickLookup)}>
      <LinksWrap ownerState={ownerState}>
        {subNavigation?.map((link) => (
          <Link ownerState={ownerState} key={link?.id} {...link} color="inherit" variant="buttonText" size="large" />
        ))}
      </LinksWrap>
    </Root>
  );
});

const Root = styled(Grid, {
  name: 'InlineNavigation',
  slot: 'Root',
  overridesResolver: (_, styles) => [styles.root]
})<{ ownerState: InlineNavigationOwnerState }>``;

const LinksWrap = styled(Box, {
  name: 'InlineNavigation',
  slot: 'LinksWrap',
  overridesResolver: (_, styles) => [styles.linksWrap]
})<{ ownerState: InlineNavigationOwnerState }>``;

const Link = styled(ContentModule, {
  name: 'InlineNavigation',
  slot: 'Link',
  overridesResolver: (_, styles) => [styles.link]
})<{ ownerState: InlineNavigationOwnerState }>``;

export default InlineNavigation;
