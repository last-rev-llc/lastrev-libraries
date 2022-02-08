import { FooterProps } from './Footer';
import { lorem } from 'faker';
import { mediaMock } from '../Media/Media.mock';
import navigationItemMock from '../NavigationItem/NavigationItem.mock';

export default (): FooterProps => ({
  media: [mediaMock()],
  logoUrl: 'http://www.example.com',
  navigationItems: [navigationItemMock(), navigationItemMock(), navigationItemMock()],
  actions: [
    {
      id: 'footer-nav-cta',
      __typename: 'Link',
      sidekickLookup: {
        contentId: 'footer-nav-cta',
        contentTypeId: 'Link'
      },
      text: 'Contact Us',
      href: '/#footer-nav-cta',
      variant: null
    }
  ],
  disclaimerText: {
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
  sidekickLookup: {}
});
