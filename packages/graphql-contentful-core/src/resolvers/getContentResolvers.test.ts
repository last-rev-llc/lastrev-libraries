import { ContentType } from 'contentful';
import getContentResolvers from './getContentResolvers';

describe('getContentResolvers.ts', () => {
  const contentTypes = [
    {
      sys: {
        id: 'foo'
      },
      fields: [
        {
          id: 'fieldOne'
        },
        {
          id: 'fieldTwo'
        }
      ]
    },
    {
      sys: {
        id: 'bar'
      },
      fields: [
        {
          id: 'fieldThree'
        },
        {
          id: 'fieldFour'
        }
      ]
    }
  ] as unknown as ContentType[];

  const typeMappings = {};

  it('returns a resolver for type === displayType, displayType = real, field = real', () => {
    const mappers = {
      Foo: {
        Foo: {
          fieldOne: 'fieldTwo'
        }
      }
    };
    const resolvers = getContentResolvers({
      contentTypes,
      config: { extensions: { mappers, typeMappings } }
    });

    expect(resolvers.Foo.id).toBeDefined();
    expect(resolvers.Foo.sidekickLookup).toBeDefined();
    expect(resolvers.Foo.fieldOne).toBeDefined();
  });

  it('returns a resolver for type === displayType, displayType = real, field = virtual', () => {
    const mappers = {
      Foo: {
        Foo: {
          someField: 'fieldOne'
        }
      }
    };
    const resolvers = getContentResolvers({
      contentTypes,
      config: { extensions: { mappers, typeMappings } }
    });

    expect(resolvers.Foo.id).toBeDefined();
    expect(resolvers.Foo.sidekickLookup).toBeDefined();
    expect(resolvers.Foo.someField).toBeDefined();
  });

  it('returns a resolver for type !== displayType, displayType = real, field = real', () => {
    const mappers = {
      Foo: {
        Bar: {
          fieldThree: 'fieldFour'
        }
      }
    };
    const resolvers = getContentResolvers({
      contentTypes,
      config: { extensions: { mappers, typeMappings } }
    });

    expect(resolvers.Bar.id).toBeDefined();
    expect(resolvers.Bar.sidekickLookup).toBeDefined();
    expect(resolvers.Bar.fieldThree).toBeDefined();
  });

  it('returns a resolver for type !== displayType, displayType = real, field = virtual', () => {
    const mappers = {
      Foo: {
        Bar: {
          someField: 'fieldFour'
        }
      }
    };
    const resolvers = getContentResolvers({
      contentTypes,
      config: { extensions: { mappers, typeMappings } }
    });

    expect(resolvers.Bar.id).toBeDefined();
    expect(resolvers.Bar.sidekickLookup).toBeDefined();
    expect(resolvers.Bar.someField).toBeDefined();
  });

  it('returns a resolver for displayType = virtual, field = virtual', () => {
    const mappers = {
      Foo: {
        Baz: {
          someField: 'fieldOne'
        }
      }
    };
    const resolvers = getContentResolvers({
      contentTypes,
      config: { extensions: { mappers, typeMappings } }
    });

    expect(resolvers.Baz.id).toBeDefined();
    expect(resolvers.Baz.sidekickLookup).toBeDefined();
    expect(resolvers.Baz.someField).toBeDefined();
  });
});
