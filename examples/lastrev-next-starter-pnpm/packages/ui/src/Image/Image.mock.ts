import type { ImageProps } from './Image.types';

// TODO: Use Media Mock
const imageDefaultMock: ImageProps = {
  src: 'https://source.unsplash.com/random/300×300',
  alt: 'This is the image alt text',
  width: 180,
  height: 180,
  className: 'image-class-name',
  testId: 'Image'
  // lazy: false
};

export const imageBaseMock = ({ ...override } = {}) => ({
  ...imageDefaultMock,
  ...override
});

export default imageBaseMock;
