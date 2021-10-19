import { lorem } from 'faker';
import { ButtonProps } from './Button';

const mockContent = (): ButtonProps => ({
  variant: 'contained',
  size: 'large',
  color: 'primary',
  text: lorem.word(),
  className: lorem.word()
});

export default mockContent;
