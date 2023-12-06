import Property from './Property';
import { propertyBaseMock } from './Property.mock';

export default {
  title: 'Pages/Property',
  component: Property
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    ...propertyBaseMock()
  }
};
