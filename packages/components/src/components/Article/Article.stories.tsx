import React from 'react';
import { Story, Meta } from '@storybook/react';

import Article, { ArticleProps } from './Article';
import { articleMock } from './Article.mock';

type ArticleStory = {
  args?: ArticleProps;
} & Story<ArticleProps>;

const Template: ArticleStory = (args: ArticleProps) => <Article {...args} />;

export default {
  title: 'Pages / Article',
  component: Article,
  decorators: [
    (Story?: any, ctx?: any) => {
      return (
        <Story {...ctx.args} />
      );
    }
  ],
  argTypes: {
    title: { name: 'Title' },
    slug: { name: 'Slug' },
    summary: { name: 'Summary' },
    seo: { name: 'SEO' },
    featuredMedia: { name: 'Featured Media' },
    pubDate: { name: 'Publish Date (Last Modified Date)' },
    disableBackToTop: { name: 'Disable Back To Top' },
    body: { name: 'Body' },
    categories: { name: 'Categories' },
    relatedLinks: { name: 'Related Links' },
    id: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } },
    __typename: { table: { disable: true } }
  }
} as Meta;

export const Default = Template.bind({});
Default.args = { ...articleMock };

