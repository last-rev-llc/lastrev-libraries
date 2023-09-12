import { lorem } from 'faker';
import { ImageProps } from './Image.types';

// TODO: Use Media Mock
const imageDefaultMock: ImageProps = {
  src: 'https://source.unsplash.com/random/300×300',
  alt: lorem.words(3),
  width: 180,
  height: 180,
  className: lorem.word(),
  testId: 'Image'
  // lazy: false
};

export const imageBaseMock = ({ ...override } = {}) => ({
  ...imageDefaultMock,
  ...override
});

export default imageBaseMock;
