import contentfulMapper from './contentful';

const id = 'myContentType';

describe('mappers/contentful.js', () => {
  it('returns "String" for Symbol', () => {
    const out = contentfulMapper('Symbol', { id }, []);
    expect(out).toEqual({
      fieldName: 'MyContentType',
      types: ['String'],
      isArray: false
    });
  });
  it('returns "String" for Text', () => {
    const out = contentfulMapper('Text', { id }, []);
    expect(out).toEqual({
      fieldName: 'MyContentType',
      types: ['String'],
      isArray: false
    });
  });
  it('returns "Number" for Integer', () => {
    const out = contentfulMapper('Integer', { id }, []);
    expect(out).toEqual({
      fieldName: 'MyContentType',
      types: ['Number'],
      isArray: false
    });
  });
  it('returns "Number" for  Number', () => {
    const out = contentfulMapper('Number', { id }, []);
    expect(out).toEqual({
      fieldName: 'MyContentType',
      types: ['Number'],
      isArray: false
    });
  });
  it('returns "Date" for Date', () => {
    const out = contentfulMapper('Date', { id }, []);
    expect(out).toEqual({
      fieldName: 'MyContentType',
      types: ['Date'],
      isArray: false
    });
  });
  it('returns "JSON" for Location', () => {
    const out = contentfulMapper('Location', { id }, []);
    expect(out).toEqual({
      fieldName: 'MyContentType',
      types: ['JSON'],
      isArray: false
    });
  });
  it('returns "JSON" for Object', () => {
    const out = contentfulMapper('Object', { id }, []);
    expect(out).toEqual({
      fieldName: 'MyContentType',
      types: ['JSON'],
      isArray: false
    });
  });
  it('returns "Boolean" for Boolean', () => {
    const out = contentfulMapper('Boolean', { id }, []);
    expect(out).toEqual({
      fieldName: 'MyContentType',
      types: ['Boolean'],
      isArray: false
    });
  });
  it('returns "RichText" for RichText', () => {
    const out = contentfulMapper('RichText', { id }, []);
    expect(out).toEqual({
      fieldName: 'MyContentType',
      types: ['RichText'],
      isArray: false
    });
  });
  it('returns "Media" for Asset Link', () => {
    const out = contentfulMapper('Link', { id, linkType: 'Asset' }, []);
    expect(out).toEqual({
      fieldName: 'MyContentType',
      types: ['Media'],
      isArray: false
    });
  });
  it('returns "JSON" for Entry Link with no validations', () => {
    const out = contentfulMapper('Link', { id, linkType: 'Entry' }, []);
    expect(out).toEqual({
      fieldName: 'MyContentType',
      types: ['JSON'],
      isArray: false
    });
  });
  it('returns the content types for Entry Link with validations', () => {
    const out = contentfulMapper(
      'Link',
      {
        id,
        linkType: 'Entry',
        validations: [
          {
            linkContentType: ['someType1', 'someType2']
          }
        ]
      },
      ['someType1']
    );
    expect(out).toEqual({
      fieldName: 'MyContentType',
      types: ['SomeType1'],
      isArray: false
    });
  });
  it('returns isArray=true for Arrays', () => {
    const out = contentfulMapper('Array', { id, items: { type: 'Symbol' } }, []);
    expect(out).toEqual({
      fieldName: 'MyContentType',
      types: ['String'],
      isArray: true
    });
  });
  it('returns isArray=true and correct content type for Entry Array', () => {
    const out = contentfulMapper(
      'Array',
      {
        id,
        items: {
          type: 'Link',
          linmkType: 'Entry',
          validations: [
            {
              linkContentType: ['someType1', 'someType2']
            }
          ]
        }
      },
      ['someType1']
    );
    expect(out).toEqual({
      fieldName: 'MyContentType',
      types: ['SomeType1'],
      isArray: true
    });
  });
});
