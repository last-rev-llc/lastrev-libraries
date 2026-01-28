import jscodeshift from 'jscodeshift';
import { transformGroqQuery } from '../../../codemods/sanity-v2/groq';

// GROQ queries are embedded in JS/TS files as strings
const applyTransform = (source: string): string | null => {
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

  return transformGroqQuery(fileInfo, api, {});
};

describe('groqTransform', () => {
  describe('__i18n_lang removal', () => {
    it('removes __i18n_lang filter from query in string', () => {
      const input = `const query = '*[_type == "page" && __i18n_lang == $locale]';`;
      const output = applyTransform(input);
      expect(output).not.toBeNull();
      // The query itself should not contain __i18n_lang (comments might)
      expect(output).toContain("'*[_type == \"page\"]'");
      expect(output).toContain('WARNING');
    });

    it('handles __i18n_lang with different operators', () => {
      const input = `const query = '*[_type == "page" && __i18n_lang == "en"]';`;
      const output = applyTransform(input);
      expect(output).not.toBeNull();
      expect(output).toContain("'*[_type == \"page\"]'");
    });
  });

  describe('_translations removal', () => {
    it('removes _translations projection', () => {
      const input = `const query = '*[_type == "page"]{..., _translations[]->{...}}';`;
      const output = applyTransform(input);
      expect(output).not.toBeNull();
      // The query should have _translations removed
      expect(output).toContain("'*[_type == \"page\"]{...}'");
    });

    it('removes _translations from select', () => {
      const input = `const query = '*[_type == "page"]{title, _translations}';`;
      const output = applyTransform(input);
      expect(output).not.toBeNull();
      expect(output).toContain("'*[_type == \"page\"]{title}'");
    });
  });

  describe('no changes', () => {
    it('returns null when no i18n patterns found', () => {
      const input = `const query = '*[_type == "page"]{title, slug}';`;
      const output = applyTransform(input);
      expect(output).toBeNull();
    });
  });

  describe('complex queries', () => {
    it('handles queries with multiple conditions', () => {
      const input = `const query = '*[_type == "page" && __i18n_lang == $locale && defined(slug.current)]';`;
      const output = applyTransform(input);
      expect(output).not.toBeNull();
      // The cleaned query should still have the other conditions
      expect(output).toContain('_type == "page"');
      expect(output).toContain('defined(slug.current)');
    });

    it('handles queries with __i18n_refs', () => {
      const input = `const query = '*[_type == "page"]{..., __i18n_refs}';`;
      const output = applyTransform(input);
      expect(output).not.toBeNull();
      // __i18n_refs is a detection pattern that gets flagged in warnings
      expect(output).toContain('WARNING');
    });
  });

  describe('tagged template literals', () => {
    it('transforms groq tagged templates', () => {
      const input = "const query = groq`*[_type == \"page\" && __i18n_lang == $locale]`;";
      const output = applyTransform(input);
      expect(output).not.toBeNull();
      // The query should be transformed
      expect(output).toContain('*[_type == "page"]');
    });
  });
});
