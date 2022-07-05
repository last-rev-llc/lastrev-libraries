import PathLoader from './PathToContentLoader';
import { ApolloContext, FVLKey } from '@last-rev/types';
import { entryMocks } from './testUtils';

const entries = Object.values(entryMocks);

const pathLoader = new PathLoader({
  page: {
    rules: [{ rule: '/:slug', isCanonical: true }],
    filter: async ({ pathEntries, ctx }) => {
      const item = pathEntries[pathEntries.length - 1];
      const excludedLocales = (item && item.fields.excludeFromLocales['en-US']) || [];
      return !excludedLocales.includes(ctx.locale);
    }
  },
  blog: {
    rules: [
      { rule: '/blogs/:slug', isCanonical: true },
      { rule: '/blogs/:categories(category).slug/:slug' },
      { rule: '/blogs/:categories(category).slug/:categories(category).subCategories(category).slug/:slug' }
    ],
    filter: async ({ pathEntries, ctx, site }) => {
      if (site && site === 'no-blog-site') return false;
      const item = pathEntries[pathEntries.length - 1];
      const excludedLocales = (item && item.fields.excludeFromLocales['en-US']) || [];
      return !excludedLocales.includes(ctx.locale);
    }
  },
  topic: {
    rules: [
      { rule: '/topics/:slug', isCanonical: true },
      { rule: '/courses/:__refBy__(course, topics).slug/:slug' },
      {
        rule: '/classes/:__refBy__(course, topics).__refBy__(class, courses).slug/courses/:__refBy__(course, topics).slug/:slug'
      }
    ],
    filter: async ({ pathEntries, ctx }) => {
      const item = pathEntries[pathEntries.length - 1];
      const excludedLocales = (item && item.fields.excludeFromLocales['en-US']) || [];
      return !excludedLocales.includes(ctx.locale);
    }
  }
});

const entryByFieldValueLoader = {
  load: async ({ field, value, contentType }: FVLKey) => {
    const entry =
      entries.find((e) => {
        return e.fields[field]?.['en-US'] === value && e.sys.contentType.sys.id === contentType;
      }) || null;
    return Promise.resolve(entry);
  }
};

const createApolloContext = (locale?: string): ApolloContext => {
  return {
    defaultLocale: 'en-US',
    locale: locale || 'en-US',
    preview: false,
    loaders: {
      entryByFieldValueLoader
    }
  } as unknown as ApolloContext;
};

describe('PathLoader', () => {
  describe('simple slug', () => {
    it('loads when item exists', async () => {
      const loaded = await pathLoader.getItemsForPath('/page-1', createApolloContext());
      expect(loaded).toEqual([entryMocks.page]);
    });

    it('does not load when item does not exist', async () => {
      const loaded = await pathLoader.getItemsForPath('/music', createApolloContext());
      expect(loaded).toEqual(null);
    });

    it('does not load when item exists, but filter function returns false', async () => {
      const loaded = await pathLoader.getItemsForPath('/page-1', createApolloContext('fr'));
      expect(loaded).toEqual(null);
    });
  });

  describe('slug with static segment', () => {
    it('loads when item exists', async () => {
      const loaded = await pathLoader.getItemsForPath('/blogs/blog-1', createApolloContext());
      expect(loaded).toEqual([null, entryMocks.blogWithCategories]);
    });

    it('does not load when item does not exist', async () => {
      const loaded = await pathLoader.getItemsForPath('/blogs/music', createApolloContext());
      expect(loaded).toEqual(null);
    });

    it('does not load when item exists, but filter function returns false', async () => {
      const loaded = await pathLoader.getItemsForPath('/blogs/blog-1', createApolloContext('fr'));
      expect(loaded).toEqual(null);
    });
  });

  describe('reference expressions', () => {
    it('loads when item exists', async () => {
      const loaded = await pathLoader.getItemsForPath('/blogs/category-1/blog-1', createApolloContext());
      expect(loaded).toEqual([null, entryMocks.categoryWithSubcategory, entryMocks.blogWithCategories]);
    });

    it('does not load when item does not exist', async () => {
      const loaded = await pathLoader.getItemsForPath('/blogs/category-1/music', createApolloContext());
      expect(loaded).toEqual(null);
    });

    it('does not load when reference item does not exist', async () => {
      const loaded = await pathLoader.getItemsForPath('/blogs/category-none/blog-1', createApolloContext());
      expect(loaded).toEqual(null);
    });

    it('does not load when reference item exists but is not referred', async () => {
      const loaded = await pathLoader.getItemsForPath('/blogs/category-2/blog-1', createApolloContext());
      expect(loaded).toEqual(null);
    });

    it('does not load when reference item exists but is wrong type', async () => {
      const loaded = await pathLoader.getItemsForPath('/blogs/non-category-1/blog-1', createApolloContext());
      expect(loaded).toEqual(null);
    });

    it('does not load when item exists, but filter function returns false', async () => {
      const loaded = await pathLoader.getItemsForPath('/blogs/category-1/blog-1', createApolloContext('fr'));
      expect(loaded).toEqual(null);
    });

    it('loads path items with a deeply nested reference expression when item exists', async () => {
      const loaded = await pathLoader.getItemsForPath('/blogs/category-1/sub-category-1/blog-1', createApolloContext());
      expect(loaded).toEqual([
        null,
        entryMocks.categoryWithSubcategory,
        entryMocks.subcategory,
        entryMocks.blogWithCategories
      ]);
    });
  });

  describe('refBy expressions', () => {
    it('loads when item exists', async () => {
      const loaded = await pathLoader.getItemsForPath('/courses/course-1/topic-1', createApolloContext());
      expect(loaded).toEqual([null, entryMocks.courseWithTopic1, entryMocks.topic]);
    });

    it('does not load when item does not exist', async () => {
      const loaded = await pathLoader.getItemsForPath('/courses/course-1/music', createApolloContext());
      expect(loaded).toEqual(null);
    });

    it('does not load when refBy item does not exist', async () => {
      const loaded = await pathLoader.getItemsForPath('/courses/course-none/topic-1', createApolloContext());
      expect(loaded).toEqual(null);
    });

    it('does not load when refBy item exists but is not referred', async () => {
      const loaded = await pathLoader.getItemsForPath('/courses/course-2/topic-1', createApolloContext());
      expect(loaded).toEqual(null);
    });

    it('does not load when refBy item exists but is wrong type', async () => {
      const loaded = await pathLoader.getItemsForPath('/courses/non-course-1/topic-1', createApolloContext());
      expect(loaded).toEqual(null);
    });

    it('does not load when item exists, but filter function returns false', async () => {
      const loaded = await pathLoader.getItemsForPath('/courses/course-1/topic-1', createApolloContext('fr'));
      expect(loaded).toEqual(null);
    });

    it('loads path items with a deeply nested refBy expression when item exists', async () => {
      const loaded = await pathLoader.getItemsForPath(
        '/classes/class-1/courses/course-1/topic-1',
        createApolloContext()
      );
      expect(loaded).toEqual([null, entryMocks.class, null, entryMocks.courseWithTopic1, entryMocks.topic]);
    });
  });

  describe('site based filter', () => {
    it('does not load when item exists, but filter function returns false', async () => {
      const loaded = await pathLoader.getItemsForPath('/blogs/blog-1', createApolloContext(), 'no-blog-site');
      expect(loaded).toEqual(null);
    });
  });
});
