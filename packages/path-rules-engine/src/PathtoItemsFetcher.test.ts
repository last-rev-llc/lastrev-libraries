import PathToItemsFetcher from './PathToItemsFetcher';
import PathRuleParser from './PathRuleParser';
import { ApolloContext, FVLKey } from '@last-rev/types';
import { entryMocks } from './testUtils';

const entries = Object.values(entryMocks);

const parser = new PathRuleParser();

const apolloContext: ApolloContext = {
  defaultLocale: 'en-US',
  preview: false,
  loaders: {
    entryByFieldValueLoader: {
      load: async ({ field, value, contentType }: FVLKey) => {
        const entry =
          entries.find((e) => {
            return e.fields[field]?.['en-US'] === value && e.sys.contentType.sys.id === contentType;
          }) || null;
        return Promise.resolve(entry);
      }
    }
  }
} as unknown as ApolloContext;

describe('PathToItemsFetcher', () => {
  it('fetches items from a simple path', async () => {
    parser.parse(`/:slug`);

    const fetcher = new PathToItemsFetcher({
      pathRule: parser.PathRule(),
      rootContentType: 'page'
    });

    const slugs = ['page-1'];

    await expect(fetcher.fetch({ slugs, apolloContext })).resolves.toEqual([entryMocks.page]);
  });

  it('fails to fetch from simple path if content type does not match', async () => {
    parser.parse(`/:slug`);

    const fetcher = new PathToItemsFetcher({
      pathRule: parser.PathRule(),
      rootContentType: 'blog'
    });

    const slugs = ['page-1'];

    await expect(fetcher.fetch({ slugs, apolloContext })).resolves.toEqual(null);
  });

  it('fails to fetch from simple path if slug does not match', async () => {
    parser.parse(`/:slug`);

    const fetcher = new PathToItemsFetcher({
      pathRule: parser.PathRule(),
      rootContentType: 'page'
    });

    const slugs = ['page-2'];

    await expect(fetcher.fetch({ slugs, apolloContext })).resolves.toEqual(null);
  });

  it('fails to fetch from simple path if path segment length does not match', async () => {
    parser.parse(`/:slug`);

    const fetcher = new PathToItemsFetcher({
      pathRule: parser.PathRule(),
      rootContentType: 'page'
    });

    const slugs = ['pages', 'page-1'];

    await expect(fetcher.fetch({ slugs, apolloContext })).resolves.toEqual(null);
  });

  it('fails to fetch from simple path if field does not match', async () => {
    parser.parse(`/:slug2`);

    const fetcher = new PathToItemsFetcher({
      pathRule: parser.PathRule(),
      rootContentType: 'page'
    });

    const slugs = ['page-1'];

    await expect(fetcher.fetch({ slugs, apolloContext })).resolves.toEqual(null);
  });

  it('fetches items from a simple path with a static segment', async () => {
    parser.parse(`/pages/:slug`);

    const fetcher = new PathToItemsFetcher({
      pathRule: parser.PathRule(),
      rootContentType: 'page'
    });

    const slugs = [null, 'page-1'];

    await expect(fetcher.fetch({ slugs, apolloContext })).resolves.toEqual([null, entryMocks.page]);
  });

  it('fetches items from a path with reference expression', async () => {
    parser.parse(`/blogs/:categories(category).slug/:slug`);

    const fetcher = new PathToItemsFetcher({
      pathRule: parser.PathRule(),
      rootContentType: 'blog'
    });

    const slugs = [null, 'category-1', 'blog-1'];

    await expect(fetcher.fetch({ slugs, apolloContext })).resolves.toEqual([
      null,
      entryMocks.categoryWithSubcategory,
      entryMocks.blogWithCategories
    ]);
  });

  it('fetches items from a path with refBy expression', async () => {
    parser.parse(`/courses/:__refBy__(course, topics).slug/:slug`);

    const fetcher = new PathToItemsFetcher({
      pathRule: parser.PathRule(),
      rootContentType: 'topic'
    });

    const slugs = [null, 'course-1', 'topic-1'];

    await expect(fetcher.fetch({ slugs, apolloContext })).resolves.toEqual([
      null,
      entryMocks.courseWithTopic1,
      entryMocks.topic
    ]);
  });
});
