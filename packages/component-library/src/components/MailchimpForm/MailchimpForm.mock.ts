import { lorem } from 'faker';
import { capitalize } from 'lodash';
import { MailchimpFormProps } from './MailchimpForm.types';
import mockTheme from '../../theme/mock.theme';

export default (): MailchimpFormProps => ({
  variant: 'default',
  // contentWidth: 'xl',
  title: capitalize(lorem.words(3)),
  subtitle: lorem.sentence(),
  image: {
    file: {
      url: 'https://images.ctfassets.net/m1b67l45sk9z/1BOSe14Ig8b1nEpEe76UZJ/b88c975ad512e365e27b7c4d8c708467/StarPlant.svg'
    },
    alt: lorem.words(2)
  },
  body: {
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: lorem.sentences(2),
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  },
  successMessage: {
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'You have successfully subscribed!',
              marks: [],
              data: {}
            }
          ]
        }
      ]
    }
  },
  actions: [{ text: 'Join now', variant: 'button-contained' }],
  theme: [mockTheme],
  sidekickLookup: ''
});
