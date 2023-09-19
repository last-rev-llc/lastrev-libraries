import Person from './Person';

import { personBaseMock } from './Person.mock';

export default {
  title: '4. Pages/Person',
  component: Person,
  tags: ['autodocs'],
  argTypes: {
    title: { name: 'Per Title' },
    name: { name: 'Name' },
    jobTitle: { name: 'Job Title' },
    email: { name: 'Email' }
  }
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {
  args: {
    ...personBaseMock()
  }
};
