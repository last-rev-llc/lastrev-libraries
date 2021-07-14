import { lorem, name } from 'faker';
import { capitalize } from 'lodash';
import mockTheme from '../../theme/mock.theme';
import cardMock from '../Card/Card.mock';

export default {
  __typename: 'Section',
  contents: [
    {
      ...cardMock,
      variant: 'media',
      title: null,
      subtitle: null,
      body: null,
      ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'media-outlined',
      outlined: true,
      title: capitalize(lorem.words(2)),
      subtitle: null,
      body: lorem.sentence(),
      ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'avatar',
      title: name.findName(),
      subtitle: name.jobTitle(),
      body: lorem.sentence(),
      ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'avatar-portrait',
      title: name.findName(),
      subtitle: name.jobTitle(),
      body: lorem.sentence(),
      ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'avatar-large',
      title: null,
      subtitle: null,
      body: null,
      ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'square-light',
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: null,
      ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'square-dark',
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: null,
      ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'standard-light',
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'standard-dark',
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'standard-light-border',
      image: null,
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'standard-light-border',
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'standard-dark-border',
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      theme: [mockTheme]
    }
  ],
  theme: [
    {
      components: {
        Section: {
          styleOverrides: {
            root: {
              backgroundColor: '#eee',
              border: '3px solid grey'
            },
            gridContainer: {
              padding: 10
            },
            gridItem: {
              padding: 10
            }
          }
        }
      }
    }
  ]
};
