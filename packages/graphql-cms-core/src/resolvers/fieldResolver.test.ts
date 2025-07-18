import { ApolloContext, CmsLoaders, Mappers, TypeMapper, TypeMappings } from '@last-rev/types';
import content from './contentItem.mock';
import fieldResolver from './fieldResolver';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger();

logger.error = jest.fn();

const createMockLoader = () => {
  return {
    load: jest.fn(),
    loadMany: jest.fn(),
    clear: jest.fn(),
    clearAll: jest.fn(),
    prime: jest.fn(),
    name: 'mockLoader'
  };
};

describe('fieldResolver.ts', () => {
  const resolver = fieldResolver('Foo');
  const typeMappings: TypeMappings = {};
  const loaders: CmsLoaders = {
    entryLoader: createMockLoader(),
    assetLoader: createMockLoader(),
    entriesByContentTypeLoader: createMockLoader(),
    entriesRefByLoader: createMockLoader(),
    entryByFieldValueLoader: createMockLoader(),
    fetchAllContentTypes: jest.fn()
  };

  let mappers: Mappers = {};
  let locale: string = 'en-US';

  let ctx = {
    typeMappings,
    mappers,
    defaultLocale: 'en-US',
    locale,
    loaders
  } as unknown as ApolloContext;

  beforeEach(() => {
    jest.clearAllMocks();
    mappers = {};
    locale = 'en-US';
    ctx = {
      typeMappings,
      mappers,
      defaultLocale: 'en-US',
      locale,
      loaders
    } as unknown as ApolloContext;
  });

  const setMapper = (newMapper: TypeMapper) => {
    ctx.mappers = {
      Foo: {
        Foo: newMapper
      }
    };
  };

  const setLocale = (locale: string) => {
    ctx.locale = locale;
  };

  it('should not resolve a field when a string mapper does not exist', async () => {
    const resolved = await resolver(content, {}, ctx, { fieldName: 'fieldTwo' } as any);

    expect(resolved).toBeNull();
  });

  it('should throw an error when mapper is not string or function', async () => {
    setMapper({
      fieldTwo: { something: 'unsuported Value' }
    } as unknown as TypeMapper);

    const resolved = await resolver(content, {}, ctx, { fieldName: 'fieldTwo' } as any);

    expect(resolved).toBeNull();
    expect(logger.error).toHaveBeenCalledWith('Unsupported mapper type for Foo.Foo: object', {
      caller: 'fieldResolver'
    });
  });

  it('should throw an error and log it with the correct prefix when function mapper throws', async () => {
    setMapper({
      fieldTwo: async () => {
        throw new Error('Oops');
      }
    } as unknown as TypeMapper);

    await expect(resolver(content, {}, ctx, { fieldName: 'fieldTwo' } as any)).rejects.toThrow();
    expect(logger.error).toHaveBeenCalledWith('GQL Extension error: [Foo][Foo][fieldTwo] Oops', {
      caller: 'fieldResolver',
      stack: expect.any(String)
    });
  });

  it('should resolve a string field when a string mapper exists', async () => {
    setMapper({
      fieldTwo: 'stringField'
    });

    const resolved = await resolver(content, {}, ctx, { fieldName: 'fieldTwo' } as any);

    expect(resolved).toEqual('fieldOneValue');
  });

  it('should resolve a string field when no mapper exists', async () => {
    const resolved = await resolver(content, {}, ctx, { fieldName: 'stringField' } as any);

    expect(resolved).toEqual('fieldOneValue');
  });

  it('should resolve a string field from other locale when a string mapper exists', async () => {
    setMapper({
      fieldTwo: 'stringField'
    });

    setLocale('es');

    const resolved = await resolver(content, {}, ctx, { fieldName: 'fieldTwo' } as any);

    expect(resolved).toEqual('fieldOneValueSpanish');
  });

  it('should resolve a string array field when a string mapper exists', async () => {
    setMapper({
      fieldTwo: 'stringArrayField'
    });

    const resolved = await resolver(content, {}, ctx, { fieldName: 'fieldTwo' } as any);

    expect(resolved).toEqual(['value1', 'value2']);
  });

  it('should resolve a reference entry field when a string mapper exists', async () => {
    setMapper({
      fieldTwo: 'referenceField'
    });

    (ctx.loaders.entryLoader.load as jest.Mock<any, any>).mockResolvedValueOnce({ val: 'mockedEntry' });

    const resolved = await resolver(content, {}, ctx, { fieldName: 'fieldTwo' } as any);

    expect(resolved).toEqual({ val: 'mockedEntry' });
  });

  it('should resolve a reference entry array field when a string mapper exists', async () => {
    setMapper({
      fieldTwo: 'referenceArrayField'
    });

    (ctx.loaders.entryLoader.loadMany as jest.Mock<any, any>).mockResolvedValueOnce([
      { val: 'mockedEntry1' },
      { val: 'mockedEntry2' }
    ]);

    const resolved = await resolver(content, {}, ctx, { fieldName: 'fieldTwo' } as any);

    expect(resolved).toEqual([{ val: 'mockedEntry1' }, { val: 'mockedEntry2' }]);
  });

  it('should resolve a reference asset field when a string mapper exists', async () => {
    setMapper({
      fieldTwo: 'assetField'
    });

    (ctx.loaders.assetLoader.load as jest.Mock<any, any>).mockResolvedValueOnce({ val: 'mockedAsset' });

    const resolved = await resolver(content, {}, ctx, { fieldName: 'fieldTwo' } as any);

    expect(resolved).toEqual({ val: 'mockedAsset' });
  });

  it('should resolve a reference asset array field when a string mapper exists', async () => {
    setMapper({
      fieldTwo: 'assetArrayField'
    });

    (ctx.loaders.assetLoader.loadMany as jest.Mock<any, any>).mockResolvedValueOnce([
      { val: 'mockedAsset1' },
      { val: 'mockedAsset2' }
    ]);

    const resolved = await resolver(content, {}, ctx, { fieldName: 'fieldTwo' } as any);

    expect(resolved).toEqual([{ val: 'mockedAsset1' }, { val: 'mockedAsset2' }]);
  });

  it('should resolve a field when a function mapper exists', async () => {
    setMapper({
      fieldTwo: async (content: any) => {
        const str = content.fields.stringField['en-US'];
        return `__${str}__`;
      }
    });

    const resolved = await resolver(content, {}, ctx, { fieldName: 'fieldTwo' } as any);

    expect(resolved).toEqual('__fieldOneValue__');
  });
});
