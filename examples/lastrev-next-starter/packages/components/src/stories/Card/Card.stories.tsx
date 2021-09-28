import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card, { CardProps } from '@last-rev/component-library/dist/components/Card/Card';
import {
  mediaLeftTextRightMock,
  mediaRightTextLeftMock,
  standardBlogMock,
  mediumIconCenterMock,
  iconSmallLeftMock,
  resourceMock,
  quoteMock,
  mediaMock,
  reasonMock,
  insightMock
} from './Card.mock';

const variantProps = {
  'media-left-text-right': {
    grid: {
      xs: 12,
      md: 12,
      lg: 12
    }
  },
  'media-right-text-left': {
    grid: {
      xs: 12,
      md: 12,
      lg: 12
    }
  },
  'stamdard-blog': {
    grid: {
      xs: 12,
      md: 12,
      lg: 12
    }
  },
  'medium-icon-center': {
    grid: {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 4
    },
    backgroundColor: '#262730'
  },
  'resource': {
    grid: {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 4
    }
  },
  'quote': {
    grid: {
      xs: 12,
      md: 12,
      lg: 12
    }
  },
  'media': {
    grid: {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 4
    },
    backgroundColor: '#262730'
  },
  'reason': {
    grid: {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 4
    }
  },
  'insight': {
    grid: {
      xs: 12,
      sm: 6,
      md: 6,
      lg: 4
    }
  }
};

export default {
  title: 'Modules / Card',
  component: Card,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal, ctx: any) => (
      <Paper
        sx={{ padding: 2, backgroundColor: variantProps[ctx?.args?.variant]?.backgroundColor ?? 'auto' }}
        variant="outlined">
        <Grid container alignItems="center" justifyContent="center">
          <Grid item {...variantProps[ctx?.args?.variant]?.grid}>
            {storyFn()}
          </Grid>
        </Grid>
      </Paper>
    )
  ],
  argTypes: {
    variant: {
      name: 'Variant',
      control: {
        type: 'select',
        options: ['resource']
      },
      table: {
        defaultValue: { summary: 'resource' }
      }
    },
    media: { name: 'Media' },
    title: { name: 'Title' },
    subtitle: { name: 'Subtitle' },
    body: { name: 'Body' },
    actions: { name: 'Actions' },
    __typename: { table: { disable: true } }
  }
};

const Template = (args: CardProps) => <Card {...args} />;

export const MediaLeftTextRight = Template.bind({});
MediaLeftTextRight.args = { ...mediaLeftTextRightMock };

export const MediaRightTextLeft = Template.bind({});
MediaRightTextLeft.args = { ...mediaRightTextLeftMock };

export const StandardBlog = Template.bind({});
StandardBlog.args = { ...standardBlogMock };

export const MediumIconCenter = Template.bind({});
MediumIconCenter.args = { ...mediumIconCenterMock };

export const IconSmallLeft = Template.bind({});
IconSmallLeft.args = { ...iconSmallLeftMock };

export const Resource = Template.bind({});
Resource.args = { ...resourceMock };

export const Quote = Template.bind({});
Quote.args = { ...quoteMock };

export const Media = Template.bind({});
Media.args = { ...mediaMock };

export const Reason = Template.bind({});
Reason.args = { ...reasonMock };

export const Insight = Template.bind({});
Insight.args = { ...insightMock };
