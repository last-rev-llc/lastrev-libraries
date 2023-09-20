import { lorem } from 'faker';

export default {
  title: {
    name: 'title',
    value: lorem.sentence()
  },
  keywords: {
    name: 'keywords',
    value: `${lorem.word()}, ${lorem.word()}, ${lorem.word()}`
  },
  canonical: {
    name: 'canonical',
    value: `https://${lorem.word()}.com/${lorem.word()}`
  },
  description: {
    name: 'description',
    value: lorem.sentence()
  },
  robots: {
    name: 'robots',
    value: 'noindex, nofollow'
  }
};
