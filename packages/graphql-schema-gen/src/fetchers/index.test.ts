import { fetchers } from './index';
import { generateContentfulSchema } from './contentful';
import { ContentType } from '@last-rev/types';
import { gql } from 'graphql-tag';

// Mock dependencies
jest.mock('./contentful', () => ({
  generateContentfulSchema: jest.fn()
}));

jest.mock('graphql-tag', () => ({
  gql: jest.fn()
}));

jest.mock('@last-rev/timer', () => ({
  SimpleTimer: jest.fn().mockImplementation(() => ({
    end: jest.fn().mockReturnValue({ millis: 100 })
  }))
}));

jest.mock('@last-rev/logging', () => ({
  getWinstonLogger: () => ({
    debug: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn()
  })
}));

const mockGenerateContentfulSchema = generateContentfulSchema as jest.MockedFunction<typeof generateContentfulSchema>;
const mockGql = gql as jest.MockedFunction<typeof gql>;

describe('fetchers', () => {
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
        }
      ]
    }
  ];

  const mockTypeMappings = { oldType: 'newType' };
  const mockDocumentNode = { kind: 'Document' as any, definitions: [] };

  beforeEach(() => {
    jest.clearAllMocks();
    mockGenerateContentfulSchema.mockReturnValue(`
  type Page implements Content {
    id: String
    theme: [Theme]
    animation: JSON
    variant: String
    title: String
  }
  `);
    mockGql.mockReturnValue(mockDocumentNode);
  });

  it('should generate schema for Contentful source', async () => {
    const result = await fetchers('Contentful', mockTypeMappings, mockContentTypes, false);

    expect(mockGenerateContentfulSchema).toHaveBeenCalledWith(mockTypeMappings, mockContentTypes, false);
    expect(mockGql).toHaveBeenCalled();
    expect(result).toBe(mockDocumentNode);
  });

  it('should handle skipReferenceFields parameter', async () => {
    await fetchers('Contentful', mockTypeMappings, mockContentTypes, true);

    expect(mockGenerateContentfulSchema).toHaveBeenCalledWith(mockTypeMappings, mockContentTypes, true);
  });

  it('should work with empty type mappings', async () => {
    await fetchers('Contentful', {}, mockContentTypes, false);

    expect(mockGenerateContentfulSchema).toHaveBeenCalledWith({}, mockContentTypes, false);
  });

  it('should work with empty content types', async () => {
    await fetchers('Contentful', mockTypeMappings, [], false);

    expect(mockGenerateContentfulSchema).toHaveBeenCalledWith(mockTypeMappings, [], false);
  });

  it('should handle Sanity source (currently uses Contentful implementation)', async () => {
    const result = await fetchers('Sanity', mockTypeMappings, mockContentTypes, false);

    expect(mockGenerateContentfulSchema).toHaveBeenCalledWith(mockTypeMappings, mockContentTypes, false);
    expect(result).toBe(mockDocumentNode);
  });
});
