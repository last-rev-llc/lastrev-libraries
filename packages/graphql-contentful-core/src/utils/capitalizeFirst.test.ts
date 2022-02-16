import capitalizeFirst from './capitalizeFirst';

describe('capitalizeFirst.ts', () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalizeFirst('foo')).toEqual('Foo');
  });

  it('should not change the first letter of a capitalized string', () => {
    expect(capitalizeFirst('Foo')).toEqual('Foo');
  });

  it('should convert camelCase to PascalCase', () => {
    expect(capitalizeFirst('fooBar')).toEqual('FooBar');
  });
});
