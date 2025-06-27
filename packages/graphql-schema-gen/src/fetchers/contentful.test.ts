import { generateContentfulSchema } from './contentful';
import { ContentType, Field } from '@last-rev/types';

describe('generateContentfulSchema', () => {
  // Helper to create valid field objects
  const createField = (field: Partial<Field>): Field =>
    ({
      disabled: false,
      omitted: false,
      validations: [],
      required: false,
      localized: false,
      ...field
    } as Field);

  // Helper to create valid ContentType objects
  const createContentType = (id: string, name: string, fields: Field[]): ContentType => ({
    sys: {
      id,
      type: 'ContentType',
      environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } },
      space: { sys: { id: 'space', type: 'Link', linkType: 'Space' } },
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
      revision: 1
    },
    displayField: 'title',
    name,
    description: `${name} description`,
    fields
  });
  describe('basic schema generation', () => {
    it('should generate schema for a simple page type', () => {
      const contentTypes: ContentType[] = [
        createContentType('page', 'Page', [
          createField({ id: 'title', name: 'Title', type: 'Symbol', required: true }),
          createField({ id: 'slug', name: 'Slug', type: 'Symbol', required: true }),
          createField({ id: 'body', name: 'Body', type: 'Text' })
        ])
      ];

      const result = generateContentfulSchema({}, contentTypes, false);

      expect(result).toContain('type Page implements Content');
      expect(result).toContain('id: String');
      expect(result).toContain('theme: [Theme]');
      expect(result).toContain('lr__path__: String');
      expect(result).toContain('title: String');
      expect(result).toContain('body: String');
      // slug should be in reserved fields for pages
      expect(result.match(/\bslug: String\b/g)?.length).toBe(1);
    });

    it('should generate schema for a non-page content type', () => {
      const contentTypes: ContentType[] = [
        createContentType('blogPost', 'Blog Post', [
          createField({ id: 'title', name: 'Title', type: 'Symbol', required: true }),
          createField({ id: 'content', name: 'Content', type: 'RichText' })
        ])
      ];

      const result = generateContentfulSchema({}, contentTypes, false);

      expect(result).toContain('type BlogPost implements Content');
      expect(result).toContain('title: String');
      expect(result).toContain('content: RichText');
      expect(result).not.toContain('lr__path__: String');
    });

    it('should handle type mappings', () => {
      const contentTypes: ContentType[] = [
        createContentType('oldTypeName', 'Old Type', [
          createField({ id: 'title', name: 'Title', type: 'Symbol', required: true })
        ])
      ];

      const typeMappings = { oldTypeName: 'newTypeName' };
      const result = generateContentfulSchema(typeMappings, contentTypes, false);

      expect(result).toContain('type NewTypeName implements Content');
      expect(result).not.toContain('type OldTypeName');
    });
  });

  describe('field type mapping', () => {
    const createContentTypeWithField = (field: Partial<Field>): ContentType =>
      createContentType('testType', 'Test Type', [createField(field)]);

    it('should map Symbol fields to String', () => {
      const result = generateContentfulSchema(
        {},
        [createContentTypeWithField({ id: 'testField', name: 'Test', type: 'Symbol' })],
        false
      );
      expect(result).toContain('testField: String');
    });

    it('should map Text fields to String', () => {
      const result = generateContentfulSchema(
        {},
        [createContentTypeWithField({ id: 'testField', name: 'Test', type: 'Text' })],
        false
      );
      expect(result).toContain('testField: String');
    });

    it('should map Integer fields to Int', () => {
      const result = generateContentfulSchema(
        {},
        [createContentTypeWithField({ id: 'testField', name: 'Test', type: 'Integer' })],
        false
      );
      expect(result).toContain('testField: Int');
    });

    it('should map Number fields to Float', () => {
      const result = generateContentfulSchema(
        {},
        [createContentTypeWithField({ id: 'testField', name: 'Test', type: 'Number' })],
        false
      );
      expect(result).toContain('testField: Float');
    });

    it('should map Date fields to Date', () => {
      const result = generateContentfulSchema(
        {},
        [createContentTypeWithField({ id: 'testField', name: 'Test', type: 'Date' })],
        false
      );
      expect(result).toContain('testField: Date');
    });

    it('should map Location fields to Location', () => {
      const result = generateContentfulSchema(
        {},
        [createContentTypeWithField({ id: 'testField', name: 'Test', type: 'Location' })],
        false
      );
      expect(result).toContain('testField: Location');
    });

    it('should map Object fields to JSON', () => {
      const result = generateContentfulSchema(
        {},
        [createContentTypeWithField({ id: 'testField', name: 'Test', type: 'Object' })],
        false
      );
      expect(result).toContain('testField: JSON');
    });

    it('should map Boolean fields to Boolean', () => {
      const result = generateContentfulSchema(
        {},
        [createContentTypeWithField({ id: 'testField', name: 'Test', type: 'Boolean' })],
        false
      );
      expect(result).toContain('testField: Boolean');
    });

    it('should map RichText fields to RichText', () => {
      const result = generateContentfulSchema(
        {},
        [createContentTypeWithField({ id: 'testField', name: 'Test', type: 'RichText' })],
        false
      );
      expect(result).toContain('testField: RichText');
    });

    it('should map Link Asset fields to Media', () => {
      const result = generateContentfulSchema(
        {},
        [
          createContentTypeWithField({
            id: 'testField',
            name: 'Test',
            type: 'Link',
            linkType: 'Asset'
          })
        ],
        false
      );
      expect(result).toContain('testField: Media');
    });

    it('should map Link Entry fields to Content', () => {
      const result = generateContentfulSchema(
        {},
        [
          createContentTypeWithField({
            id: 'testField',
            name: 'Test',
            type: 'Link',
            linkType: 'Entry'
          })
        ],
        false
      );
      expect(result).toContain('testField: Content');
    });

    it('should map Array fields correctly', () => {
      const result = generateContentfulSchema(
        {},
        [
          createContentTypeWithField({
            id: 'testField',
            name: 'Test',
            type: 'Array',
            items: { type: 'Symbol', linkType: undefined }
          })
        ],
        false
      );
      expect(result).toContain('testField: [String]');
    });

    it('should map Array of Links correctly', () => {
      const result = generateContentfulSchema(
        {},
        [
          createContentTypeWithField({
            id: 'testField',
            name: 'Test',
            type: 'Array',
            items: { type: 'Link', linkType: 'Entry' }
          })
        ],
        false
      );
      expect(result).toContain('testField: [Content]');
    });

    it('should default unknown types to String', () => {
      const result = generateContentfulSchema(
        {},
        [
          createContentTypeWithField({
            id: 'testField',
            name: 'Test',
            type: 'UnknownType' as any
          })
        ],
        false
      );
      expect(result).toContain('testField: String');
    });
  });

  describe('skipReferenceFields', () => {
    it('should skip reference fields when skipReferenceFields is true', () => {
      const contentTypes: ContentType[] = [
        createContentType('article', 'Article', [
          createField({ id: 'title', name: 'Title', type: 'Symbol', required: true }),
          createField({ id: 'author', name: 'Author', type: 'Link', linkType: 'Entry' }),
          createField({
            id: 'relatedArticles',
            name: 'Related',
            type: 'Array',
            items: { type: 'Link', linkType: 'Entry' }
          })
        ])
      ];

      const result = generateContentfulSchema({}, contentTypes, true);

      expect(result).toContain('title: String');
      expect(result).not.toContain('author: Content');
      expect(result).not.toContain('relatedArticles: [Content]');
    });

    it('should include reference fields when skipReferenceFields is false', () => {
      const contentTypes: ContentType[] = [
        createContentType('article', 'Article', [
          createField({ id: 'title', name: 'Title', type: 'Symbol', required: true }),
          createField({ id: 'author', name: 'Author', type: 'Link', linkType: 'Entry' }),
          createField({
            id: 'relatedArticles',
            name: 'Related',
            type: 'Array',
            items: { type: 'Link', linkType: 'Entry' }
          })
        ])
      ];

      const result = generateContentfulSchema({}, contentTypes, false);

      expect(result).toContain('title: String');
      expect(result).toContain('author: Content');
      expect(result).toContain('relatedArticles: [Content]');
    });
  });

  describe('reserved fields', () => {
    it('should not duplicate reserved fields', () => {
      const contentTypes: ContentType[] = [
        createContentType('page', 'Page', [
          createField({ id: 'id', name: 'ID', type: 'Symbol', required: true }),
          createField({ id: 'theme', name: 'Theme', type: 'Array', items: { type: 'Symbol', linkType: undefined } }),
          createField({ id: 'slug', name: 'Slug', type: 'Symbol', required: true })
        ])
      ];

      const result = generateContentfulSchema({}, contentTypes, false);

      // Check that reserved fields appear only once
      expect((result.match(/\bid: String\b/g) || []).length).toBe(1);
      expect((result.match(/theme: \[Theme\]/g) || []).length).toBe(1);
      expect((result.match(/\bslug: String\b/g) || []).length).toBe(1);
    });
  });

  describe('multiple content types', () => {
    it('should handle multiple content types with proper separation', () => {
      const contentTypes: ContentType[] = [
        createContentType('page', 'Page', [
          createField({ id: 'title', name: 'Title', type: 'Symbol', required: true }),
          createField({ id: 'slug', name: 'Slug', type: 'Symbol', required: true })
        ]),
        createContentType('blogPost', 'Blog Post', [
          createField({ id: 'title', name: 'Title', type: 'Symbol', required: true }),
          createField({ id: 'content', name: 'Content', type: 'RichText' })
        ])
      ];

      const result = generateContentfulSchema({}, contentTypes, false);

      expect(result).toContain('type Page implements Content');
      expect(result).toContain('type BlogPost implements Content');
    });
  });
});
