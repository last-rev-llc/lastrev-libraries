import { createHandlers } from './handlers';
import { createRedisHandlers } from './redisHandlers';
import { createDynamoDbHandlers } from './dynamodbHandlers';
import LastRevAppConfig from '@last-rev/app-config';
import mockAppConfig from '@last-rev/app-config/src/app-config.mock';

// Mock the handler modules
jest.mock('./redisHandlers');
jest.mock('./dynamodbHandlers');

const mockCreateRedisHandlers = createRedisHandlers as jest.MockedFunction<typeof createRedisHandlers>;
const mockCreateDynamoDbHandlers = createDynamoDbHandlers as jest.MockedFunction<typeof createDynamoDbHandlers>;

describe('handlers', () => {
  let mockHandlers: any;
  let baseConfig: LastRevAppConfig;

  beforeEach(() => {
    jest.clearAllMocks();

    mockHandlers = {
      asset: jest.fn(),
      entry: jest.fn(),
      contentType: jest.fn(),
      paths: jest.fn()
    };

    mockCreateRedisHandlers.mockReturnValue(mockHandlers);
    mockCreateDynamoDbHandlers.mockReturnValue(mockHandlers);

    baseConfig = new LastRevAppConfig(mockAppConfig());
  });

  describe('createHandlers', () => {
    it('should create Redis handlers when cache strategy is redis', () => {
      const config = baseConfig.clone({ cmsCacheStrategy: 'redis' });

      const result = createHandlers(config);

      expect(mockCreateRedisHandlers).toHaveBeenCalledWith(config);
      expect(result).toBe(mockHandlers);
    });

    it('should create DynamoDB handlers when cache strategy is dynamodb', () => {
      const config = baseConfig.clone({ cmsCacheStrategy: 'dynamodb' });

      const result = createHandlers(config);

      expect(mockCreateDynamoDbHandlers).toHaveBeenCalledWith(config);
      expect(result).toBe(mockHandlers);
    });

    it('should throw error when cache strategy is none', () => {
      const config = baseConfig.clone({ cmsCacheStrategy: 'none' });

      expect(() => createHandlers(config)).toThrow('cmsCacheStrategy "none" does not need a webhook handler');
    });
  });
});
