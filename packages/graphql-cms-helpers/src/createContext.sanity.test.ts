import { graphql, buildSchema } from 'graphql';
import LastRevAppConfig from '@last-rev/app-config';
import mockConfig from '@last-rev/app-config/src/app-config.mock';

// Mock @sanity/client before importing createContext
const fetchMock = jest.fn();
jest.mock('@sanity/client', () => ({
  __esModule: true,
  default: jest.fn(() => ({ fetch: fetchMock }))
}));

import createContext from './createContext';

describe('createContext with Sanity CMS', () => {
  beforeEach(() => {
    fetchMock.mockReset();
  });

  it('initializes context fields and loaders', async () => {
    fetchMock.mockResolvedValueOnce([{ code: 'en-US' }, { code: 'es' }]);

    const config = new LastRevAppConfig({ ...mockConfig(), cms: 'Sanity' });
    const ctx = await createContext({ config });

    expect(ctx.locales).toEqual(['en-US', 'es']);
    expect(ctx.defaultLocale).toBe('en-US');
    expect(ctx.loaders.entryLoader).toBeDefined();
    expect(ctx.contentful!.prod).toBeDefined();
    expect(ctx.contentful!.preview).toBeDefined();
    expect(fetchMock).toHaveBeenCalledWith('*[_type == "i18n.locale"]{code}');
  });

  it('resolves data via GraphQL using sanity loaders', async () => {
    fetchMock.mockImplementation((query: string, params: any) => {
      if (query.includes('i18n.locale')) {
        return Promise.resolve([{ code: 'en-US' }]);
      }
      if (query.startsWith('*[_id == $id]')) {
        return Promise.resolve({ _id: params.id });
      }
      return Promise.resolve(null);
    });

    const config = new LastRevAppConfig({ ...mockConfig(), cms: 'Sanity' });
    const ctx = await createContext({ config });

    const schema = buildSchema(`
      type Entry { _id: ID! }
      type Query { entry(id: ID!): Entry }
    `);

    const root = {
      entry: (_: any, { id }: any, context: any) => context.loaders.entryLoader.load({ id, preview: false })
    };

    const result = await graphql({
      schema,
      source: '{ entry(id: "123") { _id } }',
      rootValue: root,
      contextValue: { ...ctx, preview: false }
    });

    expect(result.data).toEqual({ entry: { _id: '123' } });
  });
});
