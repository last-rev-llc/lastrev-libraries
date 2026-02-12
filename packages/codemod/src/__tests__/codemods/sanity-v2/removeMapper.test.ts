import jscodeshift from 'jscodeshift';
import removeMapperTransform from '../../../codemods/sanity-v2/transforms/removeMapper';

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

  return removeMapperTransform(fileInfo, api, {});
};

describe('removeMapper transform', () => {
  describe('import removal', () => {
    it('removes import from @last-rev/sanity-mapper', () => {
      const input = `
import { convertSanityDoc, mapSanityTypesToContentfulTypes } from '@last-rev/sanity-mapper';

const entry = convertSanityDoc(doc);
      `;
      const output = applyTransform(input);
      expect(output).not.toContain("from '@last-rev/sanity-mapper'");
      expect(output).not.toContain('import');
    });

    it('removes single import from @last-rev/sanity-mapper', () => {
      const input = `
import { convertSanityDoc } from '@last-rev/sanity-mapper';

const entry = convertSanityDoc(doc);
      `;
      const output = applyTransform(input);
      expect(output).not.toContain("from '@last-rev/sanity-mapper'");
    });
  });

  describe('convertSanityDoc replacement', () => {
    it('replaces convertSanityDoc(doc) with doc', () => {
      const input = `
import { convertSanityDoc } from '@last-rev/sanity-mapper';

const sanityDoc = await fetchDocument(id);
const entry = convertSanityDoc(sanityDoc);
      `;
      const output = applyTransform(input);
      expect(output).not.toContain('convertSanityDoc(sanityDoc)');
      // The call should be replaced with just the argument
      expect(output).toContain('const entry = sanityDoc');
    });

    it('handles convertSanityDoc in async/await', () => {
      const input = `
import { convertSanityDoc } from '@last-rev/sanity-mapper';

async function getEntry(id) {
  const doc = await loader.load(id);
  return convertSanityDoc(doc);
}
      `;
      const output = applyTransform(input);
      expect(output).not.toContain('convertSanityDoc');
      expect(output).toContain('return doc');
    });
  });

  describe('mapSanityTypesToContentfulTypes replacement', () => {
    it('replaces mapSanityTypesToContentfulTypes(types) with types', () => {
      const input = `
import { mapSanityTypesToContentfulTypes } from '@last-rev/sanity-mapper';

const schemaTypes = getSchemaTypes();
const contentTypes = mapSanityTypesToContentfulTypes(schemaTypes);
      `;
      const output = applyTransform(input);
      expect(output).not.toContain('mapSanityTypesToContentfulTypes');
      expect(output).toContain('const contentTypes = schemaTypes');
    });
  });

  describe('processTranslations replacement', () => {
    it('replaces processTranslations(doc) with doc', () => {
      const input = `
import { processTranslations } from '@last-rev/sanity-mapper';

const doc = await fetchDocument(id);
const processed = processTranslations(doc);
      `;
      const output = applyTransform(input);
      expect(output).not.toContain('processTranslations');
      expect(output).toContain('const processed = doc');
    });
  });

  describe('no changes', () => {
    it('returns null when no sanity-mapper imports', () => {
      const input = `
import { something } from '@last-rev/types';

const data = await fetchData();
      `;
      const output = applyTransform(input);
      expect(output).toBeNull();
    });

    it('does not transform functions with same name from other modules', () => {
      const input = `
import { convertSanityDoc } from './myUtils';

const entry = convertSanityDoc(doc);
      `;
      const output = applyTransform(input);
      // Should not transform since it's from a different module
      expect(output).toBeNull();
    });
  });

  describe('member expression access', () => {
    it('handles mapper.convertSanityDoc(doc)', () => {
      const input = `
const mapper = require('@last-rev/sanity-mapper');
const entry = mapper.convertSanityDoc(doc);
      `;
      const output = applyTransform(input);
      // The call expression is replaced with the argument
      expect(output).toContain('const entry = doc');
      // The require statement is also removed
      expect(output).not.toContain('@last-rev/sanity-mapper');
    });
  });
});
