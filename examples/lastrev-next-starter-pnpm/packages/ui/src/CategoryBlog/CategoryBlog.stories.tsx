import CategoryBlog from './CategoryCategoryBlog';
import { categoryblogBaseMock, categoryblogWithHeroMock } from './CategoryBlog.mock';

export default {
  title: 'Pages/CategoryBlog',
  component: CategoryBlog
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = { args: { ...categoryblogBaseMock() } };
export const WithHero = { args: { ...categoryblogWithHeroMock() } };
