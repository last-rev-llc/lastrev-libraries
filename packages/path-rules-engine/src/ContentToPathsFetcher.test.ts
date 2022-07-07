import ContentToPathsFetcher from './ContentToPathsFetcher';
import PathRuleParser from './PathRuleParser';
import { ApolloContext, ItemKey, RefByKey } from '@last-rev/types';
import { entryMocks } from './testUtils';

const entries = Object.values(entryMocks);

const parser = new PathRuleParser();

const apolloContext: ApolloContext = {
  defaultLocale: 'en-US',
  preview: false,
  loaders: {
    refByEntriesLoader: {
      load: async ({ id, contentType, field }: RefByKey) => {
        const entry =
          entries.find((e) => {
            return e.sys.contentType.sys.id === contentType && e.fields[field]?.['en-US']?.sys.id === id;
          }) || null;
        return Promise.resolve(entry);
      },
      loadMany: async (keys: RefByKey[]) => {
        const es = entries.filter((e) => {
          return keys.find(
            (k) => e.sys.contentType.sys.id === k.contentType && e.fields[k.field]?.['en-US']?.sys.id === k.id
          );
        });
        return Promise.resolve(es);
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
        const es = entries.filter((e) => {
          return keys.find((k) => k.id === e.sys.id);
        });
        return Promise.resolve(es);
      }
    }
  }
} as unknown as ApolloContext;

describe('ContentToPathsFetcher', () => {
  it('fetches path with a simple slug', async () => {
    parser.parse(`/:slug`);

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
    parser.parse(`/:slug2`);

    const fetcher = new ContentToPathsFetcher({
      pathRule: parser.PathRule()
    });

    await expect(fetcher.fetch({ entry: entryMocks.page, apolloContext })).resolves.toEqual([]);
  });

  it('fetches path with a static segment and simple slug', async () => {
    parser.parse(`/blogs/:slug`);

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
    parser.parse(`/topics/:categories(category).slug/:slug`);

    const fetcher = new ContentToPathsFetcher({
      pathRule: parser.PathRule()
    });

    await expect(fetcher.fetch({ entry: entryMocks.blogWithCategories, apolloContext })).resolves.toEqual([
      {
        path: '/topics/category-1/blog-1',
        pathEntries: [null, entryMocks.categoryWithSubcategory, entryMocks.blogWithCategories]
      },
      {
        path: '/topics/category-2/blog-1',
        pathEntries: [null, entryMocks.categoryWithoutSubcategory, entryMocks.blogWithCategories]
      }
    ]);
  });

  it('fetches all paths for an item with nested reference expressions', async () => {
    parser.parse(`/topics/:categories(category).slug/:categories(category).subCategories(category).slug/:slug`);

    const fetcher = new ContentToPathsFetcher({
      pathRule: parser.PathRule()
    });

    await expect(fetcher.fetch({ entry: entryMocks.blogWithCategories, apolloContext })).resolves.toEqual([
      {
        path: '/topics/category-1/sub-category-1/blog-1',
        pathEntries: [null, entryMocks.categoryWithSubcategory, entryMocks.subcategory, entryMocks.blogWithCategories]
      }
    ]);
  });
});
