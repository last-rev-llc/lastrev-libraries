import jscodeshift from 'jscodeshift';
import utilityMigrationTransform from '../../../codemods/sanity-v2/transforms/utilityMigration';

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

  return utilityMigrationTransform(fileInfo, api, {});
};

describe('utilityMigration transform', () => {
  describe('getLocalizedField - remove .fields access', () => {
    it('transforms getLocalizedField(entry.fields, ...) -> getLocalizedField(entry, ...)', () => {
      const input = `const title = getLocalizedField(entry.fields, 'title', ctx);`;
      const output = applyTransform(input);
      expect(output).toContain("getLocalizedField(entry, 'title', ctx)");
      expect(output).not.toContain('.fields');
    });

    it('transforms getLocalizedField(entry?.fields, ...) -> getLocalizedField(entry, ...)', () => {
      const input = `const author = getLocalizedField(blog?.fields, 'author', ctx);`;
      const output = applyTransform(input);
      expect(output).toContain("getLocalizedField(blog, 'author', ctx)");
      expect(output).not.toContain('?.fields');
    });

    it('transforms nested object access', () => {
      const input = `const value = getLocalizedField(content.data.fields, 'value', ctx);`;
      const output = applyTransform(input);
      expect(output).toContain("getLocalizedField(content.data, 'value', ctx)");
    });
  });

  describe('getSanityField - remove .fields access', () => {
    it('transforms getSanityField(entry.fields, ...) -> getSanityField(entry, ...)', () => {
      const input = `const title = getSanityField(entry.fields, 'title', ctx);`;
      const output = applyTransform(input);
      expect(output).toContain("getSanityField(entry, 'title', ctx)");
    });

    it('transforms getSanityField(entry?.fields, ...)', () => {
      const input = `const body = getSanityField(doc?.fields, 'body', ctx);`;
      const output = applyTransform(input);
      expect(output).toContain("getSanityField(doc, 'body', ctx)");
    });
  });

  describe('direct field access - remove .fields nesting', () => {
    it('transforms entry.fields.title -> entry.title', () => {
      const input = `const title = entry.fields.title;`;
      const output = applyTransform(input);
      expect(output).toContain('entry.title');
      expect(output).not.toContain('entry.fields.title');
    });

    it('transforms entry?.fields.title -> entry?.title', () => {
      const input = `const title = entry?.fields.title;`;
      const output = applyTransform(input);
      expect(output).toContain('entry?.title');
    });

    it('transforms nested access content.fields.body', () => {
      const input = `const body = content.fields.body;`;
      const output = applyTransform(input);
      expect(output).toContain('content.body');
    });
  });

  describe('destructuring - remove .fields', () => {
    it('transforms const { field } = entry.fields', () => {
      const input = `const { title, body } = entry.fields;`;
      const output = applyTransform(input);
      expect(output).toContain('const { title, body } = entry;');
      expect(output).not.toContain('.fields');
    });

    it('transforms const { field } = entry?.fields', () => {
      const input = `const { author } = blog?.fields;`;
      const output = applyTransform(input);
      expect(output).toContain('const { author } = blog;');
    });
  });

  describe('no changes', () => {
    it('returns null when no changes needed', () => {
      const input = `const data = getLocalizedField(entry, 'title', ctx);`;
      const output = applyTransform(input);
      expect(output).toBeNull();
    });

    it('does not transform unrelated function calls', () => {
      const input = `const value = someOtherFunction(obj.fields, 'key');`;
      const output = applyTransform(input);
      expect(output).toBeNull();
    });

    it('does not transform non-fields member access', () => {
      const input = `const id = entry.sys.id;`;
      const output = applyTransform(input);
      expect(output).toBeNull();
    });
  });

  describe('multiple transforms', () => {
    it('handles multiple utility calls in the same file', () => {
      const input = `
        const title = getLocalizedField(entry.fields, 'title', ctx);
        const body = getLocalizedField(entry?.fields, 'body', ctx);
        const author = entry.fields.author;
        const { image } = content.fields;
      `;
      const output = applyTransform(input);
      expect(output).not.toContain('.fields');
      expect(output).toContain("getLocalizedField(entry, 'title', ctx)");
      expect(output).toContain("getLocalizedField(entry, 'body', ctx)");
    });
  });
});
