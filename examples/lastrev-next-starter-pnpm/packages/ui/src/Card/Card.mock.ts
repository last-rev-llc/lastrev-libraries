import { lorem } from 'faker';
import { CardProps } from './Card.types';
import { staticRichTextMock } from '../RichText/RichText.mock';
import { mediaBaseImageMock } from '../Media/Media.mock';
import { linkButtonMock, linkBaseMock } from '../Link/Link.mock';

const cardDefaultMock: CardProps = {
  id: lorem.word(),
  __typename: 'Card',
  variant: 'default',
  media: [mediaBaseImageMock()],
  title: 'This is a card title',
  subtitle: 'And this is the subtitle',
  body: staticRichTextMock(), // TODO: Match to options in card
  actions: [{ ...linkButtonMock(), text: 'Card link' }],
  link: [{ ...linkBaseMock() }],
  sidekickLookup: {},
  loading: true
};

export const cardBaseMock = ({ ...override } = {}): CardProps => ({
  ...cardDefaultMock,
  ...override
});

export const cardWithTagsBaseMock = (): CardProps => ({
  ...cardBaseMock()
});

export default cardBaseMock;
