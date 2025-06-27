import { generateSchema } from './index';
import { fetchers } from './fetchers';
import { DocumentNode } from 'graphql';
import { ContentType } from '@last-rev/types';

// Mock dependencies
jest.mock('./fetchers', () => ({
  fetchers: jest.fn()
}));

jest.mock('@last-rev/logging', () => ({
  getWinstonLogger: () => ({
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn()
  })
}));

const mockFetchers = fetchers as jest.MockedFunction<typeof fetchers>;

describe('generateSchema', () => {
  const mockContentTypes: ContentType[] = [
    {
      sys: { 
        id: 'page', 
        type: 'ContentType', 
        environment: { sys: { id: 'master', type: 'Link', linkType: 'Environment' } },
        space: { sys: { id: 'space', type: 'Link', linkType: 'Space' } },
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z',
        revision: 1
      },
      displayField: 'title',
      name: 'Page',
      description: 'A content page',
      fields: [
        { 
          id: 'title', 
          name: 'Title', 
          type: 'Symbol', 
          required: true, 
          localized: false,
          disabled: false,
          omitted: false,
          validations: []
        },
        { 
          id: 'slug', 
          name: 'Slug', 
          type: 'Symbol', 
          required: true, 
          localized: false,
          disabled: false,
          omitted: false,
          validations: []
        }
      ]
    }
  ];

  const mockDocumentNode: DocumentNode = {
    kind: 'Document' as any,
    definitions: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchers.mockResolvedValue(mockDocumentNode);
  });

  it('should generate schema with default parameters', async () => {
    const params = {
      source: 'Contentful' as const,
      typeMappings: {},
      contentTypes: mockContentTypes,
      skipReferenceFields: false
    };

    const result = await generateSchema(params);

    expect(mockFetchers).toHaveBeenCalledWith(
      'Contentful',
      {},
      mockContentTypes,
      false
    );
    expect(result).toBe(mockDocumentNode);
  });

  it('should pass through all parameters correctly', async () => {
    const typeMappings = { oldType: 'newType' };
    const params = {
      source: 'Contentful' as const,
      typeMappings,
      contentTypes: mockContentTypes,
      skipReferenceFields: true
    };

    const result = await generateSchema(params);

    expect(mockFetchers).toHaveBeenCalledWith(
      'Contentful',
      typeMappings,
      mockContentTypes,
      true
    );
    expect(result).toBe(mockDocumentNode);
  });

  it('should handle different sources', async () => {
    const params = {
      source: 'Sanity' as const,
      typeMappings: {},
      contentTypes: mockContentTypes,
      skipReferenceFields: false
    };

    const result = await generateSchema(params);

    expect(mockFetchers).toHaveBeenCalledWith(
      'Sanity',
      {},
      mockContentTypes,
      false
    );
    expect(result).toBe(mockDocumentNode);
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Schema generation failed');
    mockFetchers.mockRejectedValue(error);

    const params = {
      source: 'Contentful' as const,
      typeMappings: {},
      contentTypes: mockContentTypes,
      skipReferenceFields: false
    };

    await expect(generateSchema(params)).rejects.toThrow('Schema generation failed');
  });
});