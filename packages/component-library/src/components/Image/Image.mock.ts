import { lorem } from 'faker';
import { ImageProps } from './Image.types';

export default (): ImageProps => ({
  src: 'https://images.ctfassets.net/imglmb3xms7o/6nmKqleRuQCjYEl6YdyqJB/083bb61de3f0aac739f5c01073fafa63/cmp.png?h=250',
  alt: lorem.words(3),
  width: 180,
  height: 180,
  className: lorem.word(),
  testId: 'Image'
  // lazy: false
});
