import { sideKickLookupResolver } from './sideKickLookupResolver';
import content from './contentItem.mock';
import { ApolloContext, TypeMapper } from '@last-rev/types';

describe('sideKickLookupResolver.ts', () => {
  const resolver = sideKickLookupResolver('Foo', {});

  const ctx = {
    mappers: {},
    typeMappings: {},
    defaultLocale: 'en-US',
    locale: 'en-US'
  } as unknown as ApolloContext;

  beforeEach(() => {
    ctx.mappers = {};
  });

  const setMapper = (newMapper: TypeMapper) => {
    ctx.mappers = {
      Foo: {
        Foo: newMapper
      }
    };
  };

  it('maps the correct string mapper to a content field', async () => {
    setMapper({
      fieldTwo: 'fieldOne'
    });

    const resolved = await resolver(content, {}, ctx, {});

    expect(resolved).toEqual({
      fieldTwo: { contentId: '1', contentTypeId: 'foo', fieldName: 'fieldOne' },
      contentId: '1',
      contentTypeId: 'foo'
    });
  });

  it('maps all content fields when no mapper is used', async () => {
    const resolved = await resolver(content, {}, ctx, {});

    expect(resolved).toEqual({
      stringField: { contentId: '1', contentTypeId: 'foo', fieldName: 'stringField' },
      stringArrayField: {
        contentId: '1',
        contentTypeId: 'foo',
        fieldName: 'stringArrayField'
      },
      referenceField: { contentId: '1', contentTypeId: 'foo', fieldName: 'referenceField' },
      assetField: { contentId: '1', contentTypeId: 'foo', fieldName: 'assetField' },
      referenceArrayField: {
        contentId: '1',
        contentTypeId: 'foo',
        fieldName: 'referenceArrayField'
      },
      assetArrayField: {
        contentId: '1',
        contentTypeId: 'foo',
        fieldName: 'assetArrayField'
      },
      contentId: '1',
      contentTypeId: 'foo'
    });
  });

  it('returns an empty object if item is not really content', async () => {
    const resolved = await resolver({ some: 'other object ' }, {}, ctx, {});

    expect(resolved).toEqual({ contentId: '', contentTypeId: '' });
  });
});
