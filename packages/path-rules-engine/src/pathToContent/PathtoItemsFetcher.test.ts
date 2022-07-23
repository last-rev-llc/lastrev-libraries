import PathToItemsFetcher from './PathToItemsFetcher';
import PathRuleParser from '../core/PathRuleParser';
import { entryMocks, mockApolloContext } from '../testUtils';

const apolloContext = mockApolloContext();

const parser = new PathRuleParser();

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
