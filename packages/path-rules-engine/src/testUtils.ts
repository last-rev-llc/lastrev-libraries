import { Entry } from 'contentful';

export const createMockEntry = (id: string, contentType: string, fields: Record<string, any>): Entry<any> => {
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
  } as unknown as Entry<any>;
};

export const entryMocks = {
  page: createMockEntry('page1', 'page', { slug: 'page-1', excludeFromLocales: ['fr'] }),
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
  subcategory: createMockEntry('subcategory1', 'category', { slug: 'sub-category-1' }),
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
