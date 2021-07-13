import { lorem } from 'faker';
import { capitalize } from 'lodash';
import mockImage from '../Image/Image.mock';
import mockLink from '../Link/Link.mock';

export default {
  __typename: 'Card',
  image: {
    ...mockImage,
    src: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg',
    alt: 'Contemplative Lizard',
    width: '100%',
    height: '100%'
  },
  title: capitalize(lorem.word()),
  subtitle: capitalize(lorem.words(3)),
  body: lorem.sentence(),
  ctas: [{ ...mockLink }]
};
