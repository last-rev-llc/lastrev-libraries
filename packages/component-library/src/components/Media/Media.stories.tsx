import React from 'react';
import Box from '@material-ui/core/Box';
import Media from './Media';
import { mediaMock } from './Media.mock';

export default {
  title: '1. Primitives / LR / Media',
  component: Media,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Box m={5}
        sx={{
          width: 180,
          height: 180,
          '& img': {
            width: '100%',
            height: '100%',
          }
        }}
      >{storyFn()}</Box>
    )
  ],
  argTypes: {
    file: { name: 'File URL' },
    title: { name: 'Title' },
    description: { name: 'Description' },
    desktop: { name: 'Desktop' },
    tablet: { name: 'Tablet' },
    mobile: { name: 'Mobile' },
    __typename: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } }
  }
};

const Template = (args: JSX.IntrinsicAttributes) => <Media {...args} />;
export const Default = Template.bind({});
Default.args = { ...mediaMock };
