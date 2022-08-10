import PathLoader from './ContentToPathsLoader';
import { entryMocks, mockApolloContext } from '../testUtils';

const pathLoader = new PathLoader({
  page: {
    rules: [{ rule: '/:slug', isCanonical: true, allowFullPaths: true }],
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

    it('loads when item exists and has a full path', async () => {
      const loaded = await pathLoader.loadPathsFromContent(entryMocks.pageWithFullPath, mockApolloContext());
      expect(loaded).toEqual([{ path: '/some/path/here', pathEntries: [entryMocks.pageWithFullPath] }]);
    });
  });

  describe('slug with static segment and references', () => {
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

  describe('slug with static segment and refBy', () => {
    it('loads when item exists', async () => {
      const loaded = await pathLoader.loadPathsFromContent(entryMocks.topic, mockApolloContext());
      expect(loaded).toHaveLength(3);
      expect(loaded).toContainEqual({ path: '/topics/topic-1', pathEntries: [null, entryMocks.topic] });
      expect(loaded).toContainEqual({
        path: '/courses/course-1/topic-1',
        pathEntries: [null, entryMocks.courseWithTopic1, entryMocks.topic]
      });
      expect(loaded).toContainEqual({
        path: '/classes/class-1/courses/course-1/topic-1',
        pathEntries: [null, entryMocks.class, null, entryMocks.courseWithTopic1, entryMocks.topic]
      });
    });

    it('does not load when item exists, but filter function returns false', async () => {
      const loaded = await pathLoader.loadPathsFromContent(entryMocks.topic, mockApolloContext('fr'));
      expect(loaded).toEqual([]);
    });
  });
});
