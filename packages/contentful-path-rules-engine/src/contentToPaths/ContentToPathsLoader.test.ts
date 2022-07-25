import PathLoader from './ContentToPathsLoader';
import { entryMocks, mockApolloContext } from '../testUtils';

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
      { rule: '/blogs/:categories(category).slug/:__segment__(1).subCategories(category).slug/:slug' }
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

describe('ContentToPathsLoader', () => {
  describe('simple slug', () => {
    it('loads when item exists', async () => {
      const loaded = await pathLoader.loadPathsFromContent(entryMocks.page, mockApolloContext());
      expect(loaded).toEqual([{ path: '/page-1', pathEntries: [entryMocks.page] }]);
    });

    it('does not load when item exists, but filter function returns false', async () => {
      const loaded = await pathLoader.loadPathsFromContent(entryMocks.page, mockApolloContext('fr'));
      expect(loaded).toEqual([]);
    });
  });

  describe('slug with static segment', () => {
    it('loads when item exists', async () => {
      const loaded = await pathLoader.loadPathsFromContent(entryMocks.blogWithCategories, mockApolloContext());
      expect(loaded).toHaveLength(4);
      expect(loaded).toContainEqual({ path: '/blogs/blog-1', pathEntries: [null, entryMocks.blogWithCategories] });
      expect(loaded).toContainEqual({
        path: '/blogs/category-1/blog-1',
        pathEntries: [null, entryMocks.categoryWithSubcategory, entryMocks.blogWithCategories]
      });
      expect(loaded).toContainEqual({
        path: '/blogs/category-2/blog-1',
        pathEntries: [null, entryMocks.categoryWithoutSubcategory, entryMocks.blogWithCategories]
      });
      expect(loaded).toContainEqual({
        path: '/blogs/category-1/sub-category-1/blog-1',
        pathEntries: [null, entryMocks.categoryWithSubcategory, entryMocks.subcategory, entryMocks.blogWithCategories]
      });
    });

    it('does not load when item exists, but filter function returns false', async () => {
      const loaded = await pathLoader.loadPathsFromContent(entryMocks.blogWithCategories, mockApolloContext('fr'));
      expect(loaded).toEqual([]);
    });
  });

  // describe('reference expressions', () => {
  //   it('loads when item exists', async () => {
  //     const loaded = await pathLoader.loadPathsFromContent('/blogs/category-1/blog-1', mockApolloContext());
  //     expect(loaded).toEqual([null, entryMocks.categoryWithSubcategory, entryMocks.blogWithCategories]);
  //   });

  //   it('does not load when item does not exist', async () => {
  //     const loaded = await pathLoader.loadPathsFromContent('/blogs/category-1/music', mockApolloContext());
  //     expect(loaded).toEqual(null);
  //   });

  //   it('does not load when reference item does not exist', async () => {
  //     const loaded = await pathLoader.loadPathsFromContent('/blogs/category-none/blog-1', mockApolloContext());
  //     expect(loaded).toEqual(null);
  //   });

  //   it('does not load when reference item exists but is not referred', async () => {
  //     const loaded = await pathLoader.loadPathsFromContent('/blogs/category-3/blog-1', mockApolloContext());
  //     expect(loaded).toEqual(null);
  //   });

  //   it('does not load when reference item exists but is wrong type', async () => {
  //     const loaded = await pathLoader.loadPathsFromContent('/blogs/non-category-1/blog-1', mockApolloContext());
  //     expect(loaded).toEqual(null);
  //   });

  //   it('does not load when item exists, but filter function returns false', async () => {
  //     const loaded = await pathLoader.loadPathsFromContent('/blogs/category-1/blog-1', mockApolloContext('fr'));
  //     expect(loaded).toEqual(null);
  //   });

  //   it('loads path items with a deeply nested reference expression when item exists', async () => {
  //     const loaded = await pathLoader.loadPathsFromContent('/blogs/category-1/sub-category-1/blog-1', mockApolloContext());
  //     expect(loaded).toEqual([
  //       null,
  //       entryMocks.categoryWithSubcategory,
  //       entryMocks.subcategory,
  //       entryMocks.blogWithCategories
  //     ]);
  //   });
  // });

  // describe('refBy expressions', () => {
  //   it('loads when item exists', async () => {
  //     const loaded = await pathLoader.loadPathsFromContent('/courses/course-1/topic-1', mockApolloContext());
  //     expect(loaded).toEqual([null, entryMocks.courseWithTopic1, entryMocks.topic]);
  //   });

  //   it('does not load when item does not exist', async () => {
  //     const loaded = await pathLoader.loadPathsFromContent('/courses/course-1/music', mockApolloContext());
  //     expect(loaded).toEqual(null);
  //   });

  //   it('does not load when refBy item does not exist', async () => {
  //     const loaded = await pathLoader.loadPathsFromContent('/courses/course-none/topic-1', mockApolloContext());
  //     expect(loaded).toEqual(null);
  //   });

  //   it('does not load when refBy item exists but is not referred', async () => {
  //     const loaded = await pathLoader.loadPathsFromContent('/courses/course-2/topic-1', mockApolloContext());
  //     expect(loaded).toEqual(null);
  //   });

  //   it('does not load when refBy item exists but is wrong type', async () => {
  //     const loaded = await pathLoader.loadPathsFromContent('/courses/non-course-1/topic-1', mockApolloContext());
  //     expect(loaded).toEqual(null);
  //   });

  //   it('does not load when item exists, but filter function returns false', async () => {
  //     const loaded = await pathLoader.loadPathsFromContent('/courses/course-1/topic-1', mockApolloContext('fr'));
  //     expect(loaded).toEqual(null);
  //   });

  //   it('loads path items with a deeply nested refBy expression when item exists', async () => {
  //     const loaded = await pathLoader.loadPathsFromContent('/classes/class-1/courses/course-1/topic-1', mockApolloContext());
  //     expect(loaded).toEqual([null, entryMocks.class, null, entryMocks.courseWithTopic1, entryMocks.topic]);
  //   });
  // });

  // describe('site based filter', () => {
  //   it('does not load when item exists, but filter function returns false', async () => {
  //     const loaded = await pathLoader.loadPathsFromContent('/blogs/blog-1', mockApolloContext(), 'no-blog-site');
  //     expect(loaded).toEqual(null);
  //   });
  // });
});
