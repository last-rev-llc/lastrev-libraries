import { SectionProps } from './Section.types';
import mockTheme from '../../theme/mock.theme';
import richTextMock from '../Text/Text.mock';

export const singlePanelMock = (): SectionProps => ({
  __typename: 'Section',
  variant: 'single-panel',
  styles: {
    gridContainer: {
      spacing: 4
    }
  },
  contents: [richTextMock()],
  theme: [mockTheme]
});

export const splitPanelMock = (): SectionProps => ({
  __typename: 'Section',
  variant: 'split-panel',
  styles: {
    gridContainer: {
      spacing: 4
    }
  },
  contents: [
    richTextMock(),
    {
      __typename: 'Media',
      file: {
        url: 'https://i.picsum.photos/id/237/690/388.jpg?hmac=Zuv-CcXEfzBDJlr7G8wx67jMiWLssNTUppetu6ohvLc',
        height: 'auto',
        width: '100%'
      }
    }
  ],
  theme: [mockTheme]
});
