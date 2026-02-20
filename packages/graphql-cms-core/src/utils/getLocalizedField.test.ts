import { ApolloContext, CmsEntry } from '@last-rev/types';
import getLocalizedField, { getSanityField } from './getLocalizedField';

const createSanityCtx = (overrides?: Partial<ApolloContext>): ApolloContext =>
  ({
    cms: 'Sanity',
    locale: 'en-US',
    defaultLocale: 'en-US',
    sanityConfig: {
      useInternationalizedArrays: true,
      fallbackToDefaultLocale: false
    },
    ...overrides
  }) as unknown as ApolloContext;

const asDoc = (fields: Record<string, any>) => fields as unknown as CmsEntry;

describe('getLocalizedField - Sanity i18n arrays', () => {
  it('returns localized value when value property is present', () => {
    const doc = asDoc({
      title: [
        { _key: 'en-US', _type: 'internationalizedArrayStringValue', value: 'Hello' },
        { _key: 'es', _type: 'internationalizedArrayStringValue', value: 'Hola' }
      ]
    });
    const ctx = createSanityCtx();
    expect(getLocalizedField(doc, 'title', ctx)).toBe('Hello');
  });

  it('returns localized value for non-default locale', () => {
    const doc = asDoc({
      title: [
        { _key: 'en-US', _type: 'internationalizedArrayStringValue', value: 'Hello' },
        { _key: 'es', _type: 'internationalizedArrayStringValue', value: 'Hola' }
      ]
    });
    const ctx = createSanityCtx({ locale: 'es' });
    expect(getLocalizedField(doc, 'title', ctx)).toBe('Hola');
  });

  it('returns null when i18n array entry has no value property (only _key and _type)', () => {
    const doc = asDoc({
      title: [{ _key: 'en-US', _type: 'internationalizedArrayStringValue' }]
    });
    const ctx = createSanityCtx();
    expect(getLocalizedField(doc, 'title', ctx)).toBeNull();
  });

  it('returns null when i18n array has entries for other locales but not the requested one', () => {
    const doc = asDoc({
      title: [{ _key: 'es', _type: 'internationalizedArrayStringValue' }]
    });
    const ctx = createSanityCtx({ locale: 'en-US' });
    expect(getLocalizedField(doc, 'title', ctx)).toBeNull();
  });

  it('returns null for internationalizedArrayReferenceValue with no value', () => {
    const doc = asDoc({
      image: [{ _key: 'en-US', _type: 'internationalizedArrayReferenceValue' }]
    });
    const ctx = createSanityCtx();
    expect(getLocalizedField(doc, 'image', ctx)).toBeNull();
  });

  it('returns null when fallback is disabled and requested locale has no value but default does', () => {
    const doc = asDoc({
      title: [
        { _key: 'es', _type: 'internationalizedArrayStringValue' },
        { _key: 'en-US', _type: 'internationalizedArrayStringValue', value: 'Default value' }
      ]
    });
    const ctx = createSanityCtx({ locale: 'es' });
    expect(getLocalizedField(doc, 'title', ctx)).toBeNull();
  });

  it('falls back to default locale when configured and primary locale has no value', () => {
    const doc = asDoc({
      title: [
        { _key: 'es', _type: 'internationalizedArrayStringValue' },
        { _key: 'en-US', _type: 'internationalizedArrayStringValue', value: 'Fallback' }
      ]
    });
    const ctx = createSanityCtx({
      locale: 'es',
      sanityConfig: {
        useInternationalizedArrays: true,
        fallbackToDefaultLocale: true
      }
    } as Partial<ApolloContext>);
    expect(getLocalizedField(doc, 'title', ctx)).toBe('Fallback');
  });

  it('returns null when fallback is enabled but both locales have no value', () => {
    const doc = asDoc({
      title: [
        { _key: 'es', _type: 'internationalizedArrayStringValue' },
        { _key: 'en-US', _type: 'internationalizedArrayStringValue' }
      ]
    });
    const ctx = createSanityCtx({
      locale: 'es',
      sanityConfig: {
        useInternationalizedArrays: true,
        fallbackToDefaultLocale: true
      }
    } as Partial<ApolloContext>);
    expect(getLocalizedField(doc, 'title', ctx)).toBeNull();
  });

  it('returns array as-is when items have _key and value but non-i18n _type', () => {
    const options = [
      { _key: 'en-US', _type: 'option', value: 'Option A' },
      { _key: 'es', _type: 'option', value: 'Option B' }
    ];
    const doc = asDoc({ options });
    const ctx = createSanityCtx();
    expect(getLocalizedField(doc, 'options', ctx)).toEqual(options);
  });

  it('returns regular Sanity array as-is (non-i18n _type)', () => {
    const items = [
      { _key: 'abc123', _type: 'block', text: 'hello' },
      { _key: 'def456', _type: 'block', text: 'world' }
    ];
    const doc = asDoc({ items });
    const ctx = createSanityCtx();
    expect(getLocalizedField(doc, 'items', ctx)).toEqual(items);
  });

  it('returns non-array field value as-is', () => {
    const doc = asDoc({ title: 'Direct string' });
    const ctx = createSanityCtx();
    expect(getLocalizedField(doc, 'title', ctx)).toBe('Direct string');
  });

  it('returns null for undefined field', () => {
    const doc = asDoc({});
    const ctx = createSanityCtx();
    expect(getLocalizedField(doc, 'missing', ctx)).toBeNull();
  });

  it('returns null for null doc', () => {
    const ctx = createSanityCtx();
    expect(getSanityField(null, 'title', ctx)).toBeNull();
  });

  it('returns field as-is when useInternationalizedArrays is false', () => {
    const titleArray = [{ _key: 'en-US', _type: 'internationalizedArrayStringValue' }];
    const doc = asDoc({ title: titleArray });
    const ctx = createSanityCtx({
      sanityConfig: {
        useInternationalizedArrays: false,
        fallbackToDefaultLocale: false
      }
    } as Partial<ApolloContext>);
    expect(getLocalizedField(doc, 'title', ctx)).toEqual(titleArray);
  });
});
