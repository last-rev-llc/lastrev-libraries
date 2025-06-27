import { ApolloContext, ItemKey, RefByKey, FVLKey, BaseEntry } from '@last-rev/types';

export const createMockEntry = (id: string, contentType: string, fields: Record<string, any>): BaseEntry => {
  return {
    sys: {
      id,
      contentType: {
        sys: {
          id: contentType
        }
      }
    },
    fields: Object.entries(fields).reduce((acc, [key, value]) => {
      acc[key] = {
        ['en-US']: value
      };
      return acc;
    }, {} as Record<string, any>)
  } as unknown as BaseEntry;
};

export const entryMocks = {
  homepage: createMockEntry('homepage', 'page', { slug: '/' }),
  page: createMockEntry('page1', 'page', { slug: 'page-1', excludeFromLocales: ['fr'] }),
  pageWithFullPath: createMockEntry('page2', 'page', { slug: 'some/path/here', excludeFromLocales: ['fr'] }),
  blogWithCategories: createMockEntry('blog1', 'blog', {
    slug: 'blog-1',
    excludeFromLocales: ['fr'],
    categories: [
      {
        sys: {
          id: 'category1',
          type: 'Link',
          linkType: 'Entry'
        }
      },
      {
        sys: {
          id: 'category3',
          type: 'Link',
          linkType: 'Entry'
        }
      },
      {
        sys: {
          id: 'category2',
          type: 'Link',
          linkType: 'Entry'
        }
      },
      {
        sys: {
          id: 'noncategory1',
          type: 'Link',
          linkType: 'Entry'
        }
      }
    ]
  }),
  categoryWithSubcategory: createMockEntry('category1', 'category', {
    slug: 'category-1',
    subCategories: [{ sys: { id: 'subcategory1', type: 'Link', linkType: 'Entry' } }]
  }),
  categoryWithOtherSubcategory: createMockEntry('category3', 'category', {
    slug: 'category-3',
    subCategories: [{ sys: { id: 'subcategory2', type: 'Link', linkType: 'Entry' } }]
  }),
  categoryWithoutSubcategory: createMockEntry('category2', 'category', {
    slug: 'category-2'
  }),
  subcategory: createMockEntry('subcategory1', 'category', { slug: 'sub-category-1' }),
  subcategory2: createMockEntry('subcategory2', 'category', { slug: 'sub-category-2' }),
  noncategory: createMockEntry('noncategory1', 'noncategory', { slug: 'non-category-1' }),
  topic: createMockEntry('topic1', 'topic', { excludeFromLocales: ['fr'], slug: 'topic-1' }),
  courseWithTopic1: createMockEntry('course1', 'course', {
    slug: 'course-1',
    excludeFromLocales: ['fr'],
    topics: [{ sys: { id: 'topic1', type: 'Link', linkType: 'Entry' } }],
    category: { sys: { id: 'category1', type: 'Link', linkType: 'Entry' } }
  }),
  courseWithTopic2: createMockEntry('course2', 'course', {
    slug: 'course-2',
    topics: [{ sys: { id: 'topic2', type: 'Link', linkType: 'Entry' } }]
  }),
  noncourse: createMockEntry('noncourse1', 'noncourse', {
    slug: 'non-course-1',
    topics: [{ sys: { id: 'topic1', type: 'Link', linkType: 'Entry' } }]
  }),
  class: createMockEntry('class1', 'class', {
    slug: 'class-1',
    courses: [{ sys: { id: 'course1', type: 'Link', linkType: 'Entry' } }]
  })
};

export const mockApolloContext = (locale?: string) => {
  const entries = Object.values(entryMocks);
  return {
    defaultLocale: 'en-US',
    locale: locale || 'en-US',
    preview: false,
    loaders: {
      entryByFieldValueLoader: {
        load: async ({ field, value, contentType }: FVLKey) => {
          const res = entries.find(
            (entry) => entry.sys.contentType.sys.id === contentType && (entry.fields as any)[field]?.['en-US'] === value
          );
          return Promise.resolve(res || null);
        },
        loadMany: async (keys: FVLKey[]) => {
          const res = keys.map(({ field, value, contentType }: FVLKey) => {
            return (
              entries.find(
                (entry) =>
                  entry.sys.contentType.sys.id === contentType && (entry.fields as any)[field]?.['en-US'] === value
              ) || null
            );
          });
          return Promise.resolve(res);
        }
      },
      entriesRefByLoader: {
        load: async ({ id, contentType, field }: RefByKey) => {
          const loaded =
            entries.filter((e) => {
              if (e.sys.contentType.sys.id !== contentType) return false;
              let fieldValues = (e.fields as any)[field]?.['en-US'];
              if (!fieldValues) return false;
              if (!Array.isArray(fieldValues)) {
                fieldValues = [fieldValues];
              }

              return fieldValues.some((v: any) => v && v.sys?.id === id);
            }) || [];
          return Promise.resolve(loaded);
        },
        loadMany: async (keys: RefByKey[]) => {
          const results = keys.map(({ id, contentType, field }) => {
            return (
              entries.filter((e) => {
                if (e.sys.contentType.sys.id !== contentType) return false;
                let fieldValues = (e.fields as any)[field]?.['en-US'];
                if (!fieldValues) return false;
                if (!Array.isArray(fieldValues)) {
                  fieldValues = [fieldValues];
                }

                return fieldValues.some((v: any) => v && v.sys?.id === id);
              }) || []
            );
          });
          return Promise.resolve(results);
        }
      },
      entryLoader: {
        load: async ({ id }: ItemKey) => {
          const entry =
            entries.find((e) => {
              return e.sys.id === id;
            }) || null;
          return Promise.resolve(entry);
        },
        loadMany: async (keys: ItemKey[]) => {
          const es = keys.map((k) => entries.find((e) => k.id === e.sys.id));
          return Promise.resolve(es);
        }
      }
    }
  } as unknown as ApolloContext;
};
