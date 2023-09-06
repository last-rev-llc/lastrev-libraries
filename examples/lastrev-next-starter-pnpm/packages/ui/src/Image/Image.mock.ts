import { lorem } from 'faker';
import { ImageProps } from './Image.types';

export const imageMock = (): ImageProps => ({
  src: 'https://source.unsplash.com/random/300×300',
  alt: lorem.words(3),
  width: 180,
  height: 180,
  className: lorem.word(),
  testId: 'Image'
  // lazy: false
});

export default imageMock;
