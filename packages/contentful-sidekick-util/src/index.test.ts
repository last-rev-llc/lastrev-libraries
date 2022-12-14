import faker from 'faker';
import { camelCase } from 'lodash';
import util from './index';
import startCase from './startCase';

describe('sidekick util', () => {
  it('outputs null if no id or display text is passed in', () => {
    const out = util(undefined, 'something', 'else');
    expect(out).toBe(null);
  });
  it('outputs correct data if everything is passed in', () => {
    const id = faker.random.alphaNumeric(10);
    const field = camelCase(faker.random.words());
    const type = camelCase(faker.random.words());
    const displayText = faker.random.words();
    const out = util(id, field, type, displayText);
    expect(out).not.toBe(null);
    if (out) {
      expect(out['data-csk-entry-id']).toBe(id);
      expect(out['data-csk-entry-field']).toBe(field);
      expect(out['data-csk-entry-type']).toBe(type);
      expect(out['data-csk-entry-display-text']).toBe(displayText);
    }
    // expect(out['data-csk-entry-uuid']).not.toBe(null);
  });
  it('outputs correct data if everything is passed in as object', () => {
    const id = faker.random.alphaNumeric(10);
    const field = camelCase(faker.random.words());
    const type = camelCase(faker.random.words());
    const displayText = faker.random.words();

    const out = util({
      contentId: id,
      fieldName: field,
      contentTypeId: type,
      displayText
    });
    expect(out).not.toBe(null);
    if (out) {
      expect(out['data-csk-entry-id']).toBe(id);
      expect(out['data-csk-entry-field']).toBe(field);
      expect(out['data-csk-entry-type']).toBe(type);
      expect(out['data-csk-entry-display-text']).toBe(displayText);
    }
    // expect(out['data-csk-entry-uuid']).not.toBe(null);
  });

  it('outputs correct data if options is an object and displayText is passed as a second argument', () => {
    const contentId = faker.random.alphaNumeric(10);
    const mappedContentId = faker.random.alphaNumeric(10);
    const contentTypeId = camelCase(faker.random.words());
    const fieldName = camelCase(faker.random.words());
    const displayText = faker.random.words();
    const options = {
      contentId,
      contentTypeId,
      [displayText]: {
        contentId: mappedContentId,
        fieldName
      }
    };
    const out = util(options, displayText);

    expect(out).not.toBe(null);

    if (out) {
      expect(out['data-csk-entry-id']).toBe(mappedContentId);
      expect(out['data-csk-entry-field']).toBe(fieldName);
      expect(out['data-csk-entry-type']).toBe(contentTypeId);
      expect(out['data-csk-entry-display-text']).toBe(startCase(displayText));
    }
    // expect(out['data-csk-entry-uuid']).not.toBe(null);
  });

  it('outputs correct merged data if options is an object and displayText is passed as a second argument', () => {
    const contentId = faker.random.alphaNumeric(10);
    const contentTypeId = camelCase(faker.random.words());
    const options = {
      contentId,
      contentTypeId
    };
    const displayText = faker.random.words();
    const out = util(options, displayText);
    console.log(displayText);
    expect(out).not.toBe(null);

    if (out) {
      expect(out['data-csk-entry-id']).toBe(contentId);
      expect(out['data-csk-entry-field']).toBe(displayText);
      expect(out['data-csk-entry-type']).toBe(contentTypeId);
      expect(out['data-csk-entry-display-text']).toBe(startCase(displayText));
    }
    // expect(out['data-csk-entry-uuid']).not.toBe(null);
  });

  it('outputs display text "Item" if nothing but id is passed in', () => {
    const out = util(faker.random.alphaNumeric(10));
    expect(out).not.toBe(null);
    expect(out ? out['data-csk-entry-display-text'] : null).toBe('Item');
    // expect(out['data-csk-entry-uuid']).not.toBe(null);
  });
  it('outputs correct display text if field is passed in', () => {
    const field = camelCase(faker.random.words());
    const out = util(faker.random.alphaNumeric(10), field);
    expect(out).not.toBe(null);
    expect(out ? out['data-csk-entry-display-text'] : null).toBe(startCase(field));
    // expect(out['data-csk-entry-uuid']).not.toBe(null);
  });
  it('outputs correct display text if field and type are passed in', () => {
    const field = camelCase(faker.random.words());
    const type = camelCase(`${faker.random.words()} hi}`);
    const out = util(faker.random.alphaNumeric(10), field, type);

    expect(out).not.toBe(null);
    expect(out ? out['data-csk-entry-display-text'] : null).toBe(startCase(field));
    // expect(out['data-csk-entry-uuid']).not.toBe(null);
  });
  it('outputs correct display text if type is passed in', () => {
    const type = camelCase(faker.random.words());
    const out = util(faker.random.alphaNumeric(10), undefined, type);
    expect(out).not.toBe(null);
    expect(out ? out['data-csk-entry-display-text'] : null).toBe(startCase(type));
    // expect(out['data-csk-entry-uuid']).not.toBe(null);
  });
});
