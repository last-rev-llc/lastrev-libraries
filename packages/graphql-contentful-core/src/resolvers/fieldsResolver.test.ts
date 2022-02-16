import fieldsResolver from './fieldsResolver';

describe('fieldsResolver.ts', () => {
  it('should create resolvers for all fields', () => {
    const resolver = fieldsResolver('Foo', ['bar', 'baz']);

    expect(resolver?.bar).toBeDefined();
    expect(resolver?.baz).toBeDefined();
  });
});
