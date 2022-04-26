import { random } from 'faker';
import { LinkProps } from '@last-rev/component-library/dist/components/Link';

export const mockLinkBase = (): LinkProps => {
  const id = random.alphaNumeric(10);
  return {
    __typename: 'Link',
    id,
    href: 'http://www.example.com',
    text: 'Mocked Link',
    sidekickLookup: {
      contentId: id,
      contentTypeId: 'Link'
    }
  };
};

export default (): LinkProps => ({
  ...mockLinkBase()
});
