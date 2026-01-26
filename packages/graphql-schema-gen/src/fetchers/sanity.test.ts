import { generateSanitySchema } from './sanity';

describe('generateSanitySchema', () => {
  describe('document types', () => {
    it('should generate type implementing Content with reserved fields', () => {
      const schemas = [{ name: 'page', type: 'document' }];
      const result = generateSanitySchema({}, schemas);

      expect(result).toContain('type Page implements Content');
      expect(result).toContain('sidekickLookup: JSON');
      expect(result).toContain('id: String');
      expect(result).toContain('theme: [Theme]');
      expect(result).toContain('animation: JSON');
    });

    it('should apply type mappings', () => {
      const schemas = [{ name: 'blogPost', type: 'document' }];
      const typeMappings = { blogPost: 'Article' };
      const result = generateSanitySchema(typeMappings, schemas);

      expect(result).toContain('type Article implements Content');
    });

    it('should uppercase first letter of type name', () => {
      const schemas = [{ name: 'myPage', type: 'document' }];
      const result = generateSanitySchema({}, schemas);

      expect(result).toContain('type MyPage implements Content');
    });
  });

  describe('object types', () => {
    it('should generate simple type with _key field only', () => {
      const schemas = [{ name: 'hero', type: 'object' }];
      const result = generateSanitySchema({}, schemas);

      expect(result).toContain('type Hero {');
      expect(result).toContain('_key: String');
      expect(result).not.toContain('implements Content');
    });

    it('should apply type mappings to objects', () => {
      const schemas = [{ name: 'heroSection', type: 'object' }];
      const typeMappings = { heroSection: 'Hero' };
      const result = generateSanitySchema(typeMappings, schemas);

      expect(result).toContain('type Hero {');
    });
  });

  describe('mixed types', () => {
    it('should handle both documents and objects', () => {
      const schemas = [
        { name: 'page', type: 'document' },
        { name: 'hero', type: 'object' },
        { name: 'blog', type: 'document' }
      ];
      const result = generateSanitySchema({}, schemas);

      expect(result).toContain('type Page implements Content');
      expect(result).toContain('type Blog implements Content');
      expect(result).toContain('type Hero {');
      expect(result).toContain('_key: String');
    });

    it('should separate documents and objects in output', () => {
      const schemas = [
        { name: 'page', type: 'document' },
        { name: 'hero', type: 'object' }
      ];
      const result = generateSanitySchema({}, schemas);

      // Documents should come before objects
      const pageIndex = result.indexOf('type Page');
      const heroIndex = result.indexOf('type Hero');
      expect(pageIndex).toBeLessThan(heroIndex);
    });
  });

  describe('edge cases', () => {
    it('should handle empty schemas array', () => {
      const result = generateSanitySchema({}, []);
      expect(result).toBe('\n\n');
    });

    it('should handle only documents', () => {
      const schemas = [{ name: 'page', type: 'document' }];
      const result = generateSanitySchema({}, schemas);

      expect(result).toContain('type Page implements Content');
    });

    it('should handle only objects', () => {
      const schemas = [{ name: 'hero', type: 'object' }];
      const result = generateSanitySchema({}, schemas);

      expect(result).toContain('type Hero {');
    });

    it('should filter unknown types', () => {
      const schemas = [
        { name: 'page', type: 'document' },
        { name: 'unknown', type: 'customType' }
      ];
      const result = generateSanitySchema({}, schemas);

      expect(result).toContain('type Page');
      expect(result).not.toContain('type Unknown');
    });
  });
});
