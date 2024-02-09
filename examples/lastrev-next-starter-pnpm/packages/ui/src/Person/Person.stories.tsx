import Person from './Person';
import { personBaseMock } from './Person.mock';

export default {
  title: 'Pages/Person',
  component: Person
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    ...personBaseMock()
  }
};
