import React from 'react';
import { Story, Meta } from '@storybook/react';

import PageTopic, { PageTopicProps } from './PageTopic';
import { PageTopicMock } from './PageTopic.mock';

type PageTopicStory = {
  args?: PageTopicProps;
} & Story<PageTopicProps>;

const Template: PageTopicStory = (args: PageTopicProps) => <PageTopic {...args} />;

export default {
  title: 'Pages / Topic',
  component: PageTopic,
  decorators: [
    (Story?: any, ctx?: any) => {
      return <Story {...ctx.args} />;
    }
  ],
  argTypes: {
    id: { name: 'ID' },
    title: { name: 'Title' },
    hero: { table: { disable: true } },
    subCategories: { table: { disable: true } },
    articles: { table: { disable: true } },
    featuredArticles: { table: { disable: true } },
    categoryHierarchyLinks: { table: { disable: true } },
    header: { table: { disable: true } },
    footer: { table: { disable: true } },
    disableBackToTop: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } },
    link: { table: { disable: true } },
    topicNavItems: { table: { disable: true } }
  }
} as Meta;

export const Default = Template.bind({});
Default.args = { ...PageTopicMock };
