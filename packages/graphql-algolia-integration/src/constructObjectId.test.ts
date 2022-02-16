import constructObjectId from './constructObjectId';
import { Entry } from 'contentful';
import { ApolloContext } from '@last-rev/types';

const content = {
  sys: {
    id: 'foo'
  }
} as unknown as Entry<any>;

let context: ApolloContext;

const setContext = (preview: boolean, locale?: string) => {
  context = {
    preview,
    locale,
    defaultLocale: 'en-US'
  } as unknown as ApolloContext;
};

describe('constructObjectId.ts', () => {
  beforeEach(() => {
    setContext(false, 'en-US');
  });

  it('should return the base object ID, with preview:false, no locale, if no additional fields are passed', () => {
    setContext(false);
    const objectID = constructObjectId(content, context);

    expect(objectID).toEqual('foo_en-US_prod');
  });

  it('should return the base object ID, with preview:true, no locale, if no additional fields are passed', () => {
    setContext(true);
    const objectID = constructObjectId(content, context);

    expect(objectID).toEqual('foo_en-US_preview');
  });

  it('should return the base object ID, with preview:false, locale set, if no additional fields are passed', () => {
    setContext(false, 'es');
    const objectID = constructObjectId(content, context);

    expect(objectID).toEqual('foo_es_prod');
  });

  it('should return object ID, with preview:false, locale set, and additional fields are passed', () => {
    setContext(false, 'es');
    const objectID = constructObjectId(content, context, 'some', 'string');

    expect(objectID).toEqual('foo_es_prod_some_string');
  });
});
