import { ApolloContext, SanityDocument } from '@last-rev/types';
import getDefaultFieldValue from './getDefaultFieldValue';

const createSanityCtx = (overrides?: Partial<ApolloContext>): ApolloContext =>
  ({
    cms: 'Sanity',
    defaultLocale: 'en-US',
    sanityConfig: {
      useInternationalizedArrays: true
    },
    ...overrides
  } as unknown as ApolloContext);

describe('getDefaultFieldValue - Sanity', () => {
  it('returns the default-locale value from an i18n array', () => {
    const doc = {
      title: [
        { _key: 'abc123', language: 'en-US', _type: 'internationalizedArrayStringValue', value: 'Hello' },
        { _key: 'def456', language: 'es', _type: 'internationalizedArrayStringValue', value: 'Hola' }
      ]
    } as unknown as SanityDocument;
    const ctx = createSanityCtx();
    expect(getDefaultFieldValue(doc, 'title', ctx)).toBe('Hello');
  });

  it('returns null when the default locale has no matching entry', () => {
    const doc = {
      title: [{ _key: 'def456', language: 'es', _type: 'internationalizedArrayStringValue', value: 'Hola' }]
    } as unknown as SanityDocument;
    const ctx = createSanityCtx();
    expect(getDefaultFieldValue(doc, 'title', ctx)).toBeNull();
  });

  it('returns the field as-is when useInternationalizedArrays is false', () => {
    const titleArray = [{ _key: 'abc123', language: 'en-US', _type: 'internationalizedArrayStringValue', value: 'Hello' }];
    const doc = { title: titleArray } as unknown as SanityDocument;
    const ctx = createSanityCtx({ sanityConfig: { useInternationalizedArrays: false } });
    expect(getDefaultFieldValue(doc, 'title', ctx)).toEqual(titleArray);
  });

  it('returns non-array field values as-is', () => {
    const doc = { title: 'Direct string' } as unknown as SanityDocument;
    const ctx = createSanityCtx();
    expect(getDefaultFieldValue(doc, 'title', ctx)).toBe('Direct string');
  });
});

describe('getDefaultFieldValue - Contentful', () => {
  it('reads item.fields[fieldName][defaultLocale] when a default locale string is passed', () => {
    const item = { fields: { title: { 'en-US': 'Hello' } } };
    expect(getDefaultFieldValue(item as any, 'title', 'en-US')).toBe('Hello');
  });

  it('reads item.fields[fieldName][ctx.defaultLocale] when an ApolloContext is passed', () => {
    const item = { fields: { title: { 'en-US': 'Hello' } } };
    const ctx = { cms: 'Contentful', defaultLocale: 'en-US' } as unknown as ApolloContext;
    expect(getDefaultFieldValue(item as any, 'title', ctx)).toBe('Hello');
  });
});
