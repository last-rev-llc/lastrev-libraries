import { lorem, name } from 'faker';
import { capitalize } from 'lodash';
import mockTheme from '../../theme/mock.theme';
import cardMock from '../Card/Card.mock';
import richTextMock from '../RichText/RichText.mock';

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
      variant: 'media',
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
      variant: 'avatar-large',
      title: null,
      subtitle: null,
      body: null,
      ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'square',
      media: null,
      title: lorem.sentence(),
      subtitle: null,
      body: null,
      ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'standard',
      title: lorem.sentence(),
      subtitle: null,
      body: lorem.sentence(),
      // ctas: null,
      theme: [mockTheme]
    },
    {
      ...cardMock,
      variant: 'standard-round',
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

export const singlePanelMock = {
  __typename: 'Section',
  variant: 'single-panel',
  styles: {
    gridContainer: {
      spacing: 4
    }
  },
  contents: [richTextMock],
  theme: [mockTheme]
};

export const splitPanelMock = {
  __typename: 'Section',
  variant: 'split-panel',
  styles: {
    gridContainer: {
      spacing: 4
    }
  },
  contents: [
    richTextMock,
    {
      __typename: 'Media',
      file: {
        url: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
        height: 'auto',
        width: '100%'
      }
    }
  ],
  theme: [mockTheme]
};
