import PageResource from './PageResource';
import { pageresourceBaseMock, pageresourceWithHeroMock } from './PageResource.mock';

export default {
  title: 'Pages/PageResource',
  component: PageResource
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = { args: { ...pageresourceBaseMock() } };
export const WithHero = { args: { ...pageresourceWithHeroMock() } };
