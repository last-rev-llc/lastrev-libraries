import ContentToPathsFetcher from './ContentToPathsFetcher';
import PathRuleParser from '../core/PathRuleParser';
import { entryMocks, mockApolloContext } from '../testUtils';

const apolloContext = mockApolloContext();

describe('ContentToPathsFetcher', () => {
  it('fetches path with a simple slug', async () => {
    const parser = new PathRuleParser(`/:slug`);
    const fetcher = new ContentToPathsFetcher({
      pathRule: parser.PathRule()
    });
    await expect(fetcher.fetch({ entry: entryMocks.page, apolloContext })).resolves.toEqual([
      {
        path: '/page-1',
        pathEntries: [entryMocks.page]
      }
    ]);
  });
  it("fails to fetch a simple slug if field doesn't exist ", async () => {
    const parser = new PathRuleParser(`/:slug2`);
    const fetcher = new ContentToPathsFetcher({
      pathRule: parser.PathRule()
    });
    await expect(fetcher.fetch({ entry: entryMocks.page, apolloContext })).resolves.toEqual([]);
  });
  it('fetches path with a static segment and simple slug', async () => {
    const parser = new PathRuleParser(`/blogs/:slug`);
    const fetcher = new ContentToPathsFetcher({
      pathRule: parser.PathRule()
    });
    await expect(fetcher.fetch({ entry: entryMocks.blogWithCategories, apolloContext })).resolves.toEqual([
      {
        path: '/blogs/blog-1',
        pathEntries: [null, entryMocks.blogWithCategories]
      }
    ]);
  });
  it('fetches all paths for an item with a reference expression', async () => {
    const parser = new PathRuleParser(`/topics/:categories(category).slug/:slug`);
    const fetcher = new ContentToPathsFetcher({
      pathRule: parser.PathRule()
    });
    await expect(fetcher.fetch({ entry: entryMocks.blogWithCategories, apolloContext })).resolves.toEqual([
      {
        path: '/topics/category-1/blog-1',
        pathEntries: [null, entryMocks.categoryWithSubcategory, entryMocks.blogWithCategories]
      },
      {
        path: '/topics/category-3/blog-1',
        pathEntries: [null, entryMocks.categoryWithOtherSubcategory, entryMocks.blogWithCategories]
      },
      {
        path: '/topics/category-2/blog-1',
        pathEntries: [null, entryMocks.categoryWithoutSubcategory, entryMocks.blogWithCategories]
      }
    ]);
  });
  it('fails to fetfh paths for an item with a reference expression but wrong content type', async () => {
    const parser = new PathRuleParser(`/topics/:categories(someOtherType).slug/:slug`);
    const fetcher = new ContentToPathsFetcher({
      pathRule: parser.PathRule()
    });
    await expect(fetcher.fetch({ entry: entryMocks.blogWithCategories, apolloContext })).resolves.toEqual([]);
  });
  it('fetches all paths for an item with nested reference expressions', async () => {
    const parser = new PathRuleParser(
      `/topics/:categories(category).slug/:categories(category).subCategories(category).slug/:slug`
    );
    const fetcher = new ContentToPathsFetcher({
      pathRule: parser.PathRule()
    });
    const fetched = await fetcher.fetch({ entry: entryMocks.blogWithCategories, apolloContext });

    expect(fetched).toHaveLength(6);
    expect(fetched).toContainEqual({
      path: '/topics/category-1/sub-category-1/blog-1',
      pathEntries: [null, entryMocks.categoryWithSubcategory, entryMocks.subcategory, entryMocks.blogWithCategories]
    });
    expect(fetched).toContainEqual({
      path: '/topics/category-3/sub-category-2/blog-1',
      pathEntries: [
        null,
        entryMocks.categoryWithOtherSubcategory,
        entryMocks.subcategory2,
        entryMocks.blogWithCategories
      ]
    });
    // NOTE: these below are expected, but are not probably what the end user would usually want.
    // See pattern below for segment references
    expect(fetched).toContainEqual({
      path: '/topics/category-1/sub-category-2/blog-1',
      pathEntries: [null, entryMocks.categoryWithSubcategory, entryMocks.subcategory2, entryMocks.blogWithCategories]
    });

    expect(fetched).toContainEqual({
      path: '/topics/category-2/sub-category-1/blog-1',
      pathEntries: [null, entryMocks.categoryWithoutSubcategory, entryMocks.subcategory, entryMocks.blogWithCategories]
    });

    expect(fetched).toContainEqual({
      path: '/topics/category-2/sub-category-2/blog-1',
      pathEntries: [null, entryMocks.categoryWithoutSubcategory, entryMocks.subcategory2, entryMocks.blogWithCategories]
    });

    expect(fetched).toContainEqual({
      path: '/topics/category-3/sub-category-1/blog-1',
      pathEntries: [
        null,
        entryMocks.categoryWithOtherSubcategory,
        entryMocks.subcategory,
        entryMocks.blogWithCategories
      ]
    });
  });
  it('fetches all paths for an item with nested reference expressions using segment references', async () => {
    const parser = new PathRuleParser(
      `/topics/:categories(category).slug/:__segment__(1).subCategories(category).slug/:slug`
    );
    const fetcher = new ContentToPathsFetcher({
      pathRule: parser.PathRule()
    });
    await expect(fetcher.fetch({ entry: entryMocks.blogWithCategories, apolloContext })).resolves.toEqual([
      {
        path: '/topics/category-1/sub-category-1/blog-1',
        pathEntries: [null, entryMocks.categoryWithSubcategory, entryMocks.subcategory, entryMocks.blogWithCategories]
      },
      {
        path: '/topics/category-3/sub-category-2/blog-1',
        pathEntries: [
          null,
          entryMocks.categoryWithOtherSubcategory,
          entryMocks.subcategory2,
          entryMocks.blogWithCategories
        ]
      }
    ]);
  });
  it('fetches all paths for an item with a refBy expression', async () => {
    const parser = new PathRuleParser(`/courses/:__refBy__(course, topics).slug/:slug`);
    const fetcher = new ContentToPathsFetcher({
      pathRule: parser.PathRule()
    });
    await expect(fetcher.fetch({ entry: entryMocks.topic, apolloContext })).resolves.toEqual([
      {
        path: '/courses/course-1/topic-1',
        pathEntries: [null, entryMocks.courseWithTopic1, entryMocks.topic]
      }
    ]);
  });
  it('fetches all paths for an item with nested refBy expressions', async () => {
    const parser = new PathRuleParser(
      `/classes/:__refBy__(course, topics).__refBy__(class, courses).slug/:__refBy__(course, topics).slug/:slug`
    );
    const fetcher = new ContentToPathsFetcher({
      pathRule: parser.PathRule()
    });
    await expect(fetcher.fetch({ entry: entryMocks.topic, apolloContext })).resolves.toEqual([
      {
        path: '/classes/class-1/course-1/topic-1',
        pathEntries: [null, entryMocks.class, entryMocks.courseWithTopic1, entryMocks.topic]
      }
    ]);
  });
  it('fetches all paths for an item with nested refBy expressions using segment references', async () => {
    const parser = new PathRuleParser(
      `/classes/:__segment__(2).__refBy__(class, courses).slug/:__refBy__(course, topics).slug/:slug`
    );
    const fetcher = new ContentToPathsFetcher({
      pathRule: parser.PathRule()
    });
    await expect(fetcher.fetch({ entry: entryMocks.topic, apolloContext })).resolves.toEqual([
      {
        path: '/classes/class-1/course-1/topic-1',
        pathEntries: [null, entryMocks.class, entryMocks.courseWithTopic1, entryMocks.topic]
      }
    ]);
  });
});
