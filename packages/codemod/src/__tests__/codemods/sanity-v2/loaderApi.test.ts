import jscodeshift from 'jscodeshift';
import loaderApiTransform from '../../../codemods/sanity-v2/transforms/loaderApi';

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

  return loaderApiTransform(fileInfo, api, {});
};

describe('loaderApi transform', () => {
  describe('entryLoader -> documentLoader', () => {
    it('transforms ctx.loaders.entryLoader', () => {
      const input = `const entry = await ctx.loaders.entryLoader.load({ id, preview });`;
      const output = applyTransform(input);
      expect(output).toContain('ctx.sanityLoaders.documentLoader');
    });

    it('transforms loaders.entryLoader', () => {
      const input = `const entry = await loaders.entryLoader.load({ id, preview });`;
      const output = applyTransform(input);
      expect(output).toContain('sanityLoaders.documentLoader');
    });

    it('transforms context.loaders.entryLoader', () => {
      const input = `const entry = await context.loaders.entryLoader.load({ id, preview });`;
      const output = applyTransform(input);
      expect(output).toContain('context.sanityLoaders.documentLoader');
    });
  });

  describe('assetLoader -> documentLoader', () => {
    it('transforms assetLoader to documentLoader (unified)', () => {
      const input = `const asset = await ctx.loaders.assetLoader.load({ id, preview });`;
      const output = applyTransform(input);
      expect(output).toContain('ctx.sanityLoaders.documentLoader');
    });
  });

  describe('entriesByContentTypeLoader -> documentsByTypeLoader', () => {
    it('transforms entriesByContentTypeLoader', () => {
      const input = `const entries = await ctx.loaders.entriesByContentTypeLoader.load({ id: typeId, preview });`;
      const output = applyTransform(input);
      expect(output).toContain('ctx.sanityLoaders.documentsByTypeLoader');
    });
  });

  describe('entryByFieldValueLoader -> documentByFieldValueLoader', () => {
    it('transforms entryByFieldValueLoader', () => {
      const input = `const entry = await ctx.loaders.entryByFieldValueLoader.load({ contentType, field, value, preview });`;
      const output = applyTransform(input);
      expect(output).toContain('ctx.sanityLoaders.documentByFieldValueLoader');
    });
  });

  describe('entriesRefByLoader -> documentsRefByLoader', () => {
    it('transforms entriesRefByLoader', () => {
      const input = `const refs = await ctx.loaders.entriesRefByLoader.load({ contentType, field, id, preview });`;
      const output = applyTransform(input);
      expect(output).toContain('ctx.sanityLoaders.documentsRefByLoader');
    });
  });

  describe('fetchAllContentTypes removal', () => {
    it('adds TODO comment for fetchAllContentTypes', () => {
      const input = `const types = await loaders.fetchAllContentTypes(preview);`;
      const output = applyTransform(input);
      expect(output).toContain('TODO');
      expect(output).toContain('fetchAllContentTypes removed');
    });
  });

  describe('no changes', () => {
    it('returns null when no changes needed', () => {
      const input = `const data = await fetchData();`;
      const output = applyTransform(input);
      expect(output).toBeNull();
    });

    it('does not transform non-loader member expressions', () => {
      const input = `const entry = await someObject.entryLoader.load({ id });`;
      const output = applyTransform(input);
      expect(output).toBeNull();
    });
  });

  describe('multiple transforms', () => {
    it('transforms multiple loader calls in the same file', () => {
      const input = `
        const entry = await ctx.loaders.entryLoader.load({ id: entryId, preview });
        const asset = await ctx.loaders.assetLoader.load({ id: assetId, preview });
        const entries = await ctx.loaders.entriesByContentTypeLoader.load({ id: typeId, preview });
      `;
      const output = applyTransform(input);
      expect(output).toContain('ctx.sanityLoaders.documentLoader');
      expect(output).toContain('ctx.sanityLoaders.documentsByTypeLoader');
      // Both entryLoader and assetLoader should become documentLoader
      const documentLoaderCount = (output?.match(/documentLoader/g) || []).length;
      expect(documentLoaderCount).toBe(2);
    });
  });
});
