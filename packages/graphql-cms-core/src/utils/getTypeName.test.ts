import { TypeMappings, ContentType } from '@last-rev/types';
import getTypeName from './getTypeName';

describe('getTypeName.ts', () => {
  let typeMappings: TypeMappings = {};
  beforeEach(() => {
    typeMappings = {};
  });
  it('should get the typename from a content type ID when no mapping is defined', () => {
    const contentTypeId = 'foo';
    const typeName = getTypeName(contentTypeId, typeMappings);
    expect(typeName).toEqual('Foo');
  });

  it('should get the typename from a content type ID when a mapping is defined', () => {
    const contentTypeId = 'foo';
    typeMappings = {
      foo: 'bar'
    };
    const typeName = getTypeName(contentTypeId, typeMappings);
    expect(typeName).toEqual('Bar');
  });

  it('should get the typename from a content type when no mapping is defined', () => {
    const contentType = { sys: { id: 'foo' } } as unknown as ContentType;
    const typeName = getTypeName(contentType, typeMappings);
    expect(typeName).toEqual('Foo');
  });

  it('should get the typename from a content type when a mapping is defined', () => {
    const contentType = { sys: { id: 'foo' } } as unknown as ContentType;
    typeMappings = {
      foo: 'bar'
    };
    const typeName = getTypeName(contentType, typeMappings);
    expect(typeName).toEqual('Bar');
  });
});
