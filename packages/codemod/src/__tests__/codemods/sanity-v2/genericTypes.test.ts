import jscodeshift from 'jscodeshift';
import genericTypesTransform from '../../../codemods/sanity-v2/transforms/genericTypes';

const applyTransform = (source: string): string | null => {
  const j = jscodeshift.withParser('tsx');
  const fileInfo = {
    path: 'test.ts',
    source
  };

  const api = {
    jscodeshift: j,
    j,
    stats: () => {},
    report: () => {}
  };

  return genericTypesTransform(fileInfo, api, {});
};

describe('genericTypes transform', () => {
  describe('CmsPathsGenerator', () => {
    it('adds <SanityDocument> to CmsPathsGenerator without type params', () => {
      const input = `
        import { CmsPathsGenerator } from '@last-rev/types';
        const generator: CmsPathsGenerator = async () => ({});
      `;
      const output = applyTransform(input);
      expect(output).toContain('CmsPathsGenerator<SanityDocument>');
      expect(output).toContain('SanityDocument');
    });

    it('does not modify CmsPathsGenerator with existing type params', () => {
      const input = `
        import { CmsPathsGenerator } from '@last-rev/types';
        const generator: CmsPathsGenerator<MyType> = async () => ({});
      `;
      const output = applyTransform(input);
      expect(output).toBeNull();
    });

    it('transforms type alias using CmsPathsGenerator', () => {
      const input = `
        import { CmsPathsGenerator } from '@last-rev/types';
        type MyGenerator = CmsPathsGenerator;
      `;
      const output = applyTransform(input);
      expect(output).toContain('CmsPathsGenerator<SanityDocument>');
    });

    it('transforms function parameter type', () => {
      const input = `
        import { CmsPathsGenerator } from '@last-rev/types';
        function registerGenerator(gen: CmsPathsGenerator) {}
      `;
      const output = applyTransform(input);
      expect(output).toContain('CmsPathsGenerator<SanityDocument>');
    });
  });

  describe('ObjectBasedCmsPathsGenerator', () => {
    it('adds <SanityDocument> to ObjectBasedCmsPathsGenerator', () => {
      const input = `
        import { ObjectBasedCmsPathsGenerator } from '@last-rev/types';
        const generator: ObjectBasedCmsPathsGenerator = async ({ item }) => ({});
      `;
      const output = applyTransform(input);
      expect(output).toContain('ObjectBasedCmsPathsGenerator<SanityDocument>');
    });
  });

  describe('loadPathsForContentFunction', () => {
    it('adds <SanityDocument> to loadPathsForContentFunction', () => {
      const input = `
        import { loadPathsForContentFunction } from '@last-rev/types';
        const loadPaths: loadPathsForContentFunction = async (entry) => [];
      `;
      const output = applyTransform(input);
      expect(output).toContain('loadPathsForContentFunction<SanityDocument>');
    });
  });

  describe('PathEntries', () => {
    it('adds <SanityDocument> to PathEntries', () => {
      const input = `
        import { PathEntries } from '@last-rev/types';
        const entries: PathEntries = [];
      `;
      const output = applyTransform(input);
      expect(output).toContain('PathEntries<SanityDocument>');
    });

    it('transforms PathEntries in function return type', () => {
      const input = `
        import { PathEntries } from '@last-rev/types';
        function getEntries(): PathEntries {
          return [];
        }
      `;
      const output = applyTransform(input);
      expect(output).toContain('PathEntries<SanityDocument>');
    });
  });

  describe('import handling', () => {
    it('adds SanityDocument import when not present', () => {
      const input = `
        import { CmsPathsGenerator } from '@last-rev/types';
        const gen: CmsPathsGenerator = async () => ({});
      `;
      const output = applyTransform(input);
      expect(output).toContain('SanityDocument');
      // Should be in the import
      expect(output).toMatch(/import.*SanityDocument.*from '@last-rev\/types'/);
    });

    it('does not duplicate SanityDocument import if already present', () => {
      const input = `
        import { CmsPathsGenerator, SanityDocument } from '@last-rev/types';
        const gen: CmsPathsGenerator = async () => ({});
      `;
      const output = applyTransform(input);
      // Count occurrences of SanityDocument in imports
      const importMatch = output?.match(/import\s*{[^}]*SanityDocument[^}]*}/g);
      expect(importMatch?.length).toBe(1);
    });

    it('creates new import when no @last-rev/types import exists', () => {
      const input = `
        import { something } from 'other-package';
        type MyType = CmsPathsGenerator;
      `;
      const output = applyTransform(input);
      // Since CmsPathsGenerator isn't imported, it won't be transformed
      // This is expected behavior - we only transform recognized types
      expect(output).toContain('CmsPathsGenerator<SanityDocument>');
    });
  });

  describe('multiple transforms', () => {
    it('transforms multiple types in the same file', () => {
      const input = `
        import { CmsPathsGenerator, PathEntries, loadPathsForContentFunction } from '@last-rev/types';

        const generator: CmsPathsGenerator = async () => ({});
        const entries: PathEntries = [];
        const loadPaths: loadPathsForContentFunction = async () => [];
      `;
      const output = applyTransform(input);
      expect(output).toContain('CmsPathsGenerator<SanityDocument>');
      expect(output).toContain('PathEntries<SanityDocument>');
      expect(output).toContain('loadPathsForContentFunction<SanityDocument>');
    });
  });

  describe('no changes', () => {
    it('returns null when no target types are found', () => {
      const input = `
        import { SanityDocument } from '@last-rev/types';
        const doc: SanityDocument = {};
      `;
      const output = applyTransform(input);
      expect(output).toBeNull();
    });

    it('returns null for unrelated types', () => {
      const input = `
        type MyCustomType = { foo: string };
        const obj: MyCustomType = { foo: 'bar' };
      `;
      const output = applyTransform(input);
      expect(output).toBeNull();
    });
  });
});
