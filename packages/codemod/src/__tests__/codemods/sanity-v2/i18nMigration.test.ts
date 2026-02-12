import jscodeshift from 'jscodeshift';
import i18nMigrationTransform from '../../../codemods/sanity-v2/transforms/i18nMigration';

const applyTransform = (
  source: string,
  options: { useInternationalizedArrays?: boolean; fallbackToDefaultLocale?: boolean } = {}
): string | null => {
  const fileInfo = {
    path: 'test.ts',
    source
  };

  const api = {
    jscodeshift,
    j: jscodeshift,
    stats: () => {},
    report: () => {}
  };

  return i18nMigrationTransform(fileInfo, api, options);
};

describe('i18nMigration transform', () => {
  describe('__i18n_lang property access', () => {
    it('adds TODO comment for __i18n_lang usage', () => {
      const input = `
const lang = doc.__i18n_lang;
      `;
      const output = applyTransform(input);
      expect(output).toContain('TODO');
      expect(output).toContain('i18n');
    });

    it('handles __i18n_lang in conditionals', () => {
      const input = `
if (doc.__i18n_lang === locale) {
  return doc.title;
}
      `;
      const output = applyTransform(input);
      expect(output).toContain('TODO');
    });
  });

  describe('_translations property access', () => {
    it('adds TODO comment for _translations usage', () => {
      const input = `
const translations = doc._translations;
      `;
      const output = applyTransform(input);
      expect(output).toContain('TODO');
      expect(output).toContain('translation');
    });
  });

  describe('no changes', () => {
    it('returns null when no i18n patterns found', () => {
      const input = `
const title = doc.title;
const id = doc._id;
      `;
      const output = applyTransform(input);
      expect(output).toBeNull();
    });
  });

  describe('with internationalized arrays option', () => {
    it('suggests getLocalizedField when useInternationalizedArrays is true', () => {
      const input = `
const lang = doc.__i18n_lang;
const title = doc.title;
      `;
      const output = applyTransform(input, { useInternationalizedArrays: true });
      expect(output).toContain('getLocalizedField');
    });
  });

  describe('multiple i18n patterns', () => {
    it('handles multiple i18n patterns in the same file', () => {
      const input = `
const lang = doc.__i18n_lang;
const translations = doc._translations;
const value = doc.__i18n_lang === 'en' ? doc.title : doc._translations[0].title;
      `;
      const output = applyTransform(input);
      expect(output).not.toBeNull();
      // Should have comments for all patterns
      expect(output).toContain('TODO');
    });
  });
});
