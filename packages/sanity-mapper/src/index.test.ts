import { convertSanityDoc } from './index';

describe('convertSanityDoc', () => {
  const defaultLocale = 'en-US';
  const locales = ['en-US', 'es-ES'];

  it('should handle documents without translations', () => {
    const doc = {
      _id: '123',
      _type: 'link',
      _updatedAt: '2025-06-13T13:12:36Z',
      _createdAt: '2021-12-16T19:21:12Z',
      text: 'Back to Homepage',
      variant: 'button-outlined'
    };

    const result = convertSanityDoc(doc, defaultLocale, locales);

    expect(result).toEqual({
      sys: {
        id: '123',
        type: 'Entry',
        updatedAt: '2025-06-13T13:12:36Z',
        createdAt: '2021-12-16T19:21:12Z',
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'link'
          }
        }
      },
      fields: {
        text: { 'en-US': 'Back to Homepage' },
        variant: { 'en-US': 'button-outlined' }
      }
    });
  });

  it('should handle documents with translations', () => {
    const doc = {
      __i18n_lang: 'en-US',
      _id: '123',
      _type: 'link',
      _updatedAt: '2025-06-13T13:12:36Z',
      _createdAt: '2021-12-16T19:21:12Z',
      text: 'Back to Homepage',
      variant: 'button-outlined',
      _translations: [
        {
          doc: {
            __i18n_lang: 'es-ES',
            _id: '456',
            _type: 'link',
            _updatedAt: '2025-06-13T13:12:26Z',
            _createdAt: '2021-12-16T19:21:12Z',
            text: 'Volver a la página principal',
            variant: 'button-outlined'
          }
        }
      ]
    };

    const result = convertSanityDoc(doc, defaultLocale, locales);

    expect(result).toEqual({
      sys: {
        id: '123',
        type: 'Entry',
        updatedAt: '2025-06-13T13:12:36Z',
        createdAt: '2021-12-16T19:21:12Z',
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'link'
          }
        }
      },
      fields: {
        text: {
          'en-US': 'Back to Homepage',
          'es-ES': 'Volver a la página principal'
        },
        variant: {
          'en-US': 'button-outlined',
          'es-ES': 'button-outlined'
        }
      }
    });
  });

  it('should handle documents with custom default locale', () => {
    const doc = {
      __i18n_lang: 'es-ES',
      _id: '123',
      _type: 'link',
      _updatedAt: '2025-06-13T13:12:36Z',
      _createdAt: '2021-12-16T19:21:12Z',
      text: 'Volver a la página principal',
      variant: 'button-outlined',
      _translations: [
        {
          doc: {
            __i18n_lang: 'en-US',
            _id: '456',
            _type: 'link',
            _updatedAt: '2025-06-13T13:12:26Z',
            _createdAt: '2021-12-16T19:21:12Z',
            text: 'Back to Homepage',
            variant: 'button-outlined'
          }
        }
      ]
    };

    const result = convertSanityDoc(doc, defaultLocale, locales);

    expect(result).toEqual({
      sys: {
        id: '123',
        type: 'Entry',
        updatedAt: '2025-06-13T13:12:36Z',
        createdAt: '2021-12-16T19:21:12Z',
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'link'
          }
        }
      },
      fields: {
        text: {
          'es-ES': 'Volver a la página principal',
          'en-US': 'Back to Homepage'
        },
        variant: {
          'es-ES': 'button-outlined',
          'en-US': 'button-outlined'
        }
      }
    });
  });

  it('should handle assets with translations', () => {
    const doc = {
      __i18n_lang: 'en-US',
      _id: '123',
      _type: 'sanity.imageAsset',
      _updatedAt: '2025-06-13T13:12:36Z',
      _createdAt: '2021-12-16T19:21:12Z',
      title: 'English Image',
      alt: 'English Alt Text',
      url: 'https://example.com/image.jpg',
      mimeType: 'image/jpeg',
      originalFilename: 'image.jpg',
      metadata: {
        dimensions: {
          width: 800,
          height: 600
        }
      },
      _translations: [
        {
          doc: {
            __i18n_lang: 'es-ES',
            _id: '456',
            _type: 'sanity.imageAsset',
            _updatedAt: '2025-06-13T13:12:26Z',
            _createdAt: '2021-12-16T19:21:12Z',
            title: 'Spanish Image',
            alt: 'Spanish Alt Text'
          }
        }
      ]
    };

    const result = convertSanityDoc(doc, defaultLocale, locales);

    expect(result).toEqual({
      sys: {
        id: '123',
        type: 'Asset',
        updatedAt: '2025-06-13T13:12:36Z',
        createdAt: '2021-12-16T19:21:12Z',
        revision: undefined
      },
      fields: {
        title: {
          'en-US': 'English Image',
          'es-ES': 'Spanish Image'
        },
        alt: {
          'en-US': 'English Alt Text',
          'es-ES': 'Spanish Alt Text'
        },
        file: {
          'en-US': {
            contentType: 'image/jpeg',
            fileName: 'image.jpg',
            url: 'https://example.com/image.jpg',
            details: {
              image: {
                width: 800,
                height: 600
              }
            }
          },
          'es-ES': {
            contentType: 'image/jpeg',
            fileName: 'image.jpg',
            url: 'https://example.com/image.jpg',
            details: {
              image: {
                width: 800,
                height: 600
              }
            }
          }
        }
      },
      metadata: {}
    });
  });

  it('should strip drafts. prefix from document ID for entries', () => {
    const doc = {
      _id: 'drafts.123',
      _type: 'link',
      _updatedAt: '2025-06-13T13:12:36Z',
      _createdAt: '2021-12-16T19:21:12Z',
      text: 'Draft Link',
      variant: 'button-outlined'
    };

    const result = convertSanityDoc(doc, defaultLocale, locales);

    expect(result).toEqual({
      sys: {
        id: '123', // Should be stripped of 'drafts.' prefix
        type: 'Entry',
        updatedAt: '2025-06-13T13:12:36Z',
        createdAt: '2021-12-16T19:21:12Z',
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'link'
          }
        }
      },
      fields: {
        text: { 'en-US': 'Draft Link' },
        variant: { 'en-US': 'button-outlined' }
      }
    });
  });

  it('should strip drafts. prefix from document ID for assets', () => {
    const doc = {
      _id: 'drafts.456',
      _type: 'sanity.imageAsset',
      _updatedAt: '2025-06-13T13:12:36Z',
      _createdAt: '2021-12-16T19:21:12Z',
      title: 'Draft Image',
      alt: 'Draft Alt Text',
      url: 'https://example.com/draft-image.jpg',
      mimeType: 'image/jpeg',
      originalFilename: 'draft-image.jpg',
      metadata: {
        dimensions: {
          width: 400,
          height: 300
        }
      }
    };

    const result = convertSanityDoc(doc, defaultLocale, locales);

    expect(result).toEqual({
      sys: {
        id: '456', // Should be stripped of 'drafts.' prefix
        type: 'Asset',
        updatedAt: '2025-06-13T13:12:36Z',
        createdAt: '2021-12-16T19:21:12Z',
        revision: undefined
      },
      fields: {
        title: { 'en-US': 'Draft Image' },
        alt: { 'en-US': 'Draft Alt Text' },
        file: {
          'en-US': {
            contentType: 'image/jpeg',
            fileName: 'draft-image.jpg',
            url: 'https://example.com/draft-image.jpg',
            details: {
              image: {
                width: 400,
                height: 300
              }
            }
          },
          'es-ES': {
            contentType: 'image/jpeg',
            fileName: 'draft-image.jpg',
            url: 'https://example.com/draft-image.jpg',
            details: {
              image: {
                width: 400,
                height: 300
              }
            }
          }
        }
      },
      metadata: {}
    });
  });

  it('should not modify document ID that does not start with drafts.', () => {
    const doc = {
      _id: 'published-123',
      _type: 'link',
      _updatedAt: '2025-06-13T13:12:36Z',
      _createdAt: '2021-12-16T19:21:12Z',
      text: 'Published Link',
      variant: 'button-outlined'
    };

    const result = convertSanityDoc(doc, defaultLocale, locales);

    expect(result).toEqual({
      sys: {
        id: 'published-123', // Should remain unchanged
        type: 'Entry',
        updatedAt: '2025-06-13T13:12:36Z',
        createdAt: '2021-12-16T19:21:12Z',
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'link'
          }
        }
      },
      fields: {
        text: { 'en-US': 'Published Link' },
        variant: { 'en-US': 'button-outlined' }
      }
    });
  });
});
