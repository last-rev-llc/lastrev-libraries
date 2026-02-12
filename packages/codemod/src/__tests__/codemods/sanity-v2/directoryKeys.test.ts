import jscodeshift from 'jscodeshift';
import directoryKeysTransform from '../../../codemods/sanity-v2/transforms/directoryKeys';

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

  return directoryKeysTransform(fileInfo, api, {});
};

describe('directoryKeys transform', () => {
  describe('directory path changes', () => {
    it('replaces entries directory with documents', () => {
      const input = `
const dir = path.join(root, 'entries');
      `;
      const output = applyTransform(input);
      expect(output).toContain("'documents'");
      expect(output).not.toContain("'entries'");
    });

    it('replaces assets directory with documents', () => {
      const input = `
const dir = path.join(root, 'assets');
      `;
      const output = applyTransform(input);
      expect(output).toContain("'documents'");
      expect(output).not.toContain("'assets'");
    });
  });

  describe('redis key changes', () => {
    it('replaces entry_ids_by_content_type with document_ids_by_type', () => {
      const input = `
const key = 'entry_ids_by_content_type';
      `;
      const output = applyTransform(input);
      expect(output).toContain("'document_ids_by_type'");
      expect(output).not.toContain("'entry_ids_by_content_type'");
    });

    it('replaces entries: prefix with documents:', () => {
      const input = `
const key = \`entries:\${id}\`;
      `;
      const output = applyTransform(input);
      expect(output).toContain('documents:');
      expect(output).not.toContain('entries:');
    });

    it('replaces assets: prefix with documents:', () => {
      const input = `
const key = \`assets:\${id}\`;
      `;
      const output = applyTransform(input);
      expect(output).toContain('documents:');
      expect(output).not.toContain('assets:');
    });
  });

  describe('no changes', () => {
    it('returns null when no changes needed', () => {
      const input = `
const dir = path.join(root, 'documents');
const key = 'document_ids_by_type';
      `;
      const output = applyTransform(input);
      expect(output).toBeNull();
    });

    it('does not transform partial matches', () => {
      const input = `
const str = 'my_entries_list';
      `;
      const output = applyTransform(input);
      // Should not transform since 'entries' is part of a larger word
      expect(output).toBeNull();
    });
  });

  describe('multiple replacements', () => {
    it('handles multiple directory and key replacements', () => {
      const input = `
const entriesDir = path.join(root, 'entries');
const assetsDir = path.join(root, 'assets');
const key = 'entry_ids_by_content_type';
      `;
      const output = applyTransform(input);
      expect(output).toContain("path.join(root, 'documents')");
      expect(output).toContain("'document_ids_by_type'");
      expect(output).not.toContain("'entries'");
      expect(output).not.toContain("'assets'");
    });
  });
});
