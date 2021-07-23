// import React from 'react';
// import Box from '@material-ui/core/Box';
// import Hero from './Hero';
// import heroMock from './Hero.mock';

// export default {
//   title: '1. Primitives / MUI / Hero',
//   component: Hero,
//   decorators: [
//     (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
//       <Box m={5}>{storyFn()}</Box>
//     )
//   ],
//   argTypes: {
//     variant: {
//       name: 'Variant',
//       control: {
//         type: 'inline-radio',
//         options: ['default', 'gradient-background']
//       },
//       table: {
//         defaultValue: { summary: 'standard' }
//       }
//     },
//     title: { name: 'Title' },
//     subtitle: { name: 'Subtitle' },
//     body: { name: 'Body' },
//     image: { name: 'Image' },
//     actions: { name: 'Actions' },
//   }
// };

// const Template = (args: JSX.IntrinsicAttributes) => <Hero {...args} />;
// export const Default = Template.bind({});
// Default.args = { ...heroMock };
