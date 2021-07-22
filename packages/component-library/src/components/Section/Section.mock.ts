import mockTheme from '../../theme/mock.theme';
import richTextMock from '../RichText/RichText.mock';

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
