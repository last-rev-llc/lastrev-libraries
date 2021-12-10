import mockFile from '../mocks/file.mock';
import kebabCase from 'lodash/kebabCase';

export interface navigationItemMockProps {
  imageUrl?: string;
  summary?: string;
  text?: string;
  href?: string;
}

export const navigationItemMock = ({
  text = 'Nav Item',
  summary = 'Nav Item Summary',
  href = '/',
  imageUrl
}: navigationItemMockProps) => {
  const navItem = {
    id: kebabCase(text),
    __typename: 'NavigationItem',
    text,
    summary,
    href,
    media: {
      __typename: 'Media',
      file: mockFile({ height: 2160, width: 3840, text, url: imageUrl }),
      title: `${text} image title`
    }
  };

  return navItem;
};

export default navigationItemMock;
