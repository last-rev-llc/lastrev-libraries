import { lorem } from 'faker';
import mockCard from '../Card/Card.mock';
import {staticRichTextMock} from '../Text/Text.mock';
import mockTheme from '../../theme/mock.theme';

export default {
  id: 1,
  __typename: "Collection", 
  sidekickLookup: {},
  itemsSpacing: 2,
  variant: 'three-per-row',
  items: [{ ...mockCard }, { ...mockCard, title: lorem.sentence() }, { ...mockCard }, { ...mockCard }],
  itemsVariant: 'standard-round',
  // itemsWidth: 'xl',
  introText: staticRichTextMock,
  theme: [mockTheme]
};
