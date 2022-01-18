import React from 'react';
import { Story, Meta } from '@storybook/react';
import Article, { ArticleProps } from './Article';
import { articleMock } from './Article.mock';

type ArticleStory = {
  args?: ArticleProps;
} & Story<ArticleProps>;

const Template: ArticleStory = (args: ArticleProps) => <Article {...args} />;

export default {
  title: 'Modules / Article',
  component: Article,
  decorators: [
    (Story?: any, ctx?: any) => {
      return (
        <Story {...ctx.args} />
      );
    }
  ],
  argTypes: {
    id: { table: { disable: true } },
    sidekickLookup: { table: { disable: true } },
    __typename: { table: { disable: true } }
  }
} as Meta;

export const Default = Template.bind({});
Default.args = { ...articleMock };

