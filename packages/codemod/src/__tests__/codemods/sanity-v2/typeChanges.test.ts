import jscodeshift from 'jscodeshift';
import typeChangesTransform from '../../../codemods/sanity-v2/transforms/typeChanges';

// Use TypeScript parser for jscodeshift
const j = jscodeshift.withParser('tsx');

const applyTransform = (source: string): string | null => {
  const fileInfo = {
    path: 'test.ts',
    source
  };

  const api = {
    jscodeshift: j,
    j: j,
    stats: () => {},
    report: () => {}
  };

  return typeChangesTransform(fileInfo, api, {});
};

describe('typeChanges transform', () => {
  describe('type renames in imports', () => {
    it('renames Entry import to SanityDocument', () => {
      const input = `import { Entry } from '@last-rev/types';`;
      const output = applyTransform(input);
      expect(output).toContain('SanityDocument');
      expect(output).not.toContain('Entry');
    });

    it('renames BaseEntry import to SanityDocument', () => {
      const input = `import { BaseEntry } from '@last-rev/types';`;
      const output = applyTransform(input);
      expect(output).toContain('SanityDocument');
      expect(output).not.toContain('BaseEntry');
    });

    it('renames Asset import to SanityDocument', () => {
      const input = `import { Asset } from '@last-rev/types';`;
      const output = applyTransform(input);
      expect(output).toContain('SanityDocument');
      expect(output).not.toContain('Asset');
    });

    it('renames ContentfulLoaders import to SanityLoaders', () => {
      const input = `import { ContentfulLoaders } from '@last-rev/types';`;
      const output = applyTransform(input);
      expect(output).toContain('SanityLoaders');
      expect(output).not.toContain('ContentfulLoaders');
    });

    it('renames CmsLoaders import to SanityLoaders', () => {
      const input = `import { CmsLoaders } from '@last-rev/types';`;
      const output = applyTransform(input);
      expect(output).toContain('SanityLoaders');
      expect(output).not.toContain('CmsLoaders');
    });
  });

  describe('multiple types', () => {
    it('handles multiple type imports', () => {
      const input = `import { Entry, Asset, ContentfulLoaders } from '@last-rev/types';`;
      const output = applyTransform(input);
      expect(output).toContain('SanityDocument');
      expect(output).toContain('SanityLoaders');
      expect(output).not.toContain('Entry');
      expect(output).not.toContain('Asset');
      expect(output).not.toContain('ContentfulLoaders');
    });
  });

  describe('no changes', () => {
    it('returns null when no type changes needed', () => {
      const input = `import { SanityDocument } from '@last-rev/types';`;
      const output = applyTransform(input);
      expect(output).toBeNull();
    });

    it('does not transform types from other modules', () => {
      const input = `import { Entry } from './myTypes';`;
      const output = applyTransform(input);
      expect(output).toBeNull();
    });
  });
});
