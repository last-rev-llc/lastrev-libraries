import { getSlug } from './PathUpdater';

describe('getSlug - Sanity', () => {
  it('resolves the localized slug from an i18n array by locale', () => {
    const entry = {
      slug: [
        { _key: 'abc123', language: 'en-US', _type: 'internationalizedArrayStringValue', value: { current: 'home' } },
        { _key: 'def456', language: 'es', _type: 'internationalizedArrayStringValue', value: { current: 'inicio' } }
      ]
    };
    expect(getSlug(entry, 'en-US', true)).toBe('home');
    expect(getSlug(entry, 'es', true)).toBe('inicio');
  });

  it('returns a plain string value directly (non-slug-object value)', () => {
    const entry = {
      slug: [{ _key: 'abc123', language: 'en-US', _type: 'internationalizedArrayStringValue', value: 'home' }]
    };
    expect(getSlug(entry, 'en-US', true)).toBe('home');
  });

  it('returns undefined when no entry matches the requested locale', () => {
    const entry = {
      slug: [
        { _key: 'abc123', language: 'es', _type: 'internationalizedArrayStringValue', value: { current: 'inicio' } }
      ]
    };
    expect(getSlug(entry, 'en-US', true)).toBeUndefined();
  });

  it('returns the raw slug as-is when it is not an i18n array', () => {
    const entry = { slug: { current: 'home' } };
    expect(getSlug(entry, 'en-US', true)).toBe('home');
  });

  it('returns a plain string slug as-is', () => {
    const entry = { slug: 'home' };
    expect(getSlug(entry, 'en-US', true)).toBe('home');
  });

  it('returns undefined when the entry has no slug field', () => {
    const entry = {};
    expect(getSlug(entry, 'en-US', true)).toBeUndefined();
  });

  it('accesses the slug directly when useInternationalizedArrays is false', () => {
    const entry = {
      slug: [
        { _key: 'abc123', language: 'en-US', _type: 'internationalizedArrayStringValue', value: { current: 'home' } }
      ]
    };
    expect(getSlug(entry, 'en-US', true, { useInternationalizedArrays: false })).toBeUndefined();
  });
});

describe('getSlug - Contentful', () => {
  it('resolves entry.fields.slug[locale]', () => {
    const entry = { fields: { slug: { 'en-US': 'home' } } };
    expect(getSlug(entry, 'en-US', false)).toBe('home');
  });
});
