import React from 'react';
import { Box } from '@mui/material';
import PageGeneral from './PageGeneral';
import { pageGeneralMock } from './PageGeneral.mock';

export default {
  title: 'Pages / PageGeneral',
  component: PageGeneral,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => <Box>{storyFn()}</Box>
  ]
};

const Template = (args: JSX.IntrinsicAttributes) => <PageGeneral {...args} />;

export const Default = Template.bind({});
Default.args = { ...pageGeneralMock() };
