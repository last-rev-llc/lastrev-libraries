import React from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import { Paper, Button, Box, Typography } from '@material-ui/core';
import styled from '@material-ui/system/styled';
import ErrorBoundary from '../ErrorBoundary';
//import sidekick from '../../utils/sidekick';

export interface BackToTopProps {
  theme: any;
  //sidekickLookup: string;
}

export const BackToTop = ({}: //sidekickLookup,
BackToTopProps) => {
  // const [visible, setVisible] = React.useState(false);

  // React.useLayoutEffect(() => {
  //   const onScroll = throttle(() => {
  //     const tmp = window.scrollY > 200;
  //     if (visible !== tmp) {
  //       setVisible(tmp);
  //     }
  //   }, 100);

  //   window.addEventListener('scroll', onScroll);

  //   return () => {
  //     window.removeEventListener('scroll', onScroll);
  //   };
  // });

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0 });
  };

  return (
    <ErrorBoundary>
      <Root data-testid="BackToTop">
        <Button color="secondary" onClick={handleClick}>
          <Content>
            <KeyboardArrowUpIcon />
            <Typography variant="body1">{'common:backToTop'}</Typography>
          </Content>
        </Button>
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled(Paper, {
  name: 'BackToTop',
  slot: 'Root',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(({ theme }) => ({
  'elevation': 1,
  'cursor': 'pointer',
  'width': 64,
  'height': 64,
  'borderRadius': '50%',
  'background': theme.palette.primary.main,
  'position': 'fixed',
  'right': 20,
  'bottom': -100,
  'transition': 'all ease 0.3s',
  'overflow': 'hidden',
  '& svg': {
    fontSize: 30,
    marginTop: -4,
    color: theme.palette.primary.main
  },
  [theme.breakpoints.up('sm')]: {
    display: 'none'
  }
}));

const Content = styled(Box, {
  name: 'BackToTop',
  slot: 'Content',
  overridesResolver: (_, styles) => ({
    ...styles.content
  })
})<{ variant?: string }>(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
}));

export default BackToTop;
