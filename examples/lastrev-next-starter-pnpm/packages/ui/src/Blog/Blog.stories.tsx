import Blog from './Blog';
import { blogBaseMock } from './Blog.mock';

export default {
  title: 'Pages/Blog',
  component: Blog
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    ...blogBaseMock()
  }
};
