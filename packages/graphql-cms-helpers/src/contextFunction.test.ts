import contextFunction from './contextFunction';
import LastRevAppConfig from '@last-rev/app-config';
import mockAppConfig from '@last-rev/app-config/src/app-config.mock';

// Mock createContext
jest.mock('./createContext', () => jest.fn().mockResolvedValue({ 
  defaultMockContext: true,
  cms: 'Contentful',
  locales: ['en-US'],
  defaultLocale: 'en-US'
}));

import createContext from './createContext';

const mockCreateContext = createContext as jest.MockedFunction<typeof createContext>;

describe('contextFunction', () => {
  let baseConfig: LastRevAppConfig;

  beforeEach(() => {
    jest.clearAllMocks();
    baseConfig = new LastRevAppConfig(mockAppConfig());
  });

  describe('basic functionality', () => {
    it('should create context function with extractFromArgs', async () => {
      const extractFromArgs = jest.fn().mockReturnValue({ environment: undefined });
      
      const contextFunc = contextFunction({ 
        config: baseConfig, 
        extractFromArgs 
      });

      const result = await contextFunc('arg1', 'arg2');

      expect(extractFromArgs).toHaveBeenCalledWith('arg1', 'arg2');
      expect(mockCreateContext).toHaveBeenCalledWith({ config: baseConfig });
      expect(result).toEqual({
        defaultMockContext: true,
        cms: 'Contentful',
        locales: ['en-US'],
        defaultLocale: 'en-US'
      });
    });

    it('should pass through extracted arguments', async () => {
      const extractFromArgs = jest.fn().mockReturnValue({ environment: undefined });
      
      const contextFunc = contextFunction({ 
        config: baseConfig, 
        extractFromArgs 
      });

      await contextFunc('test1', 'test2', { key: 'value' });

      expect(extractFromArgs).toHaveBeenCalledWith('test1', 'test2', { key: 'value' });
    });
  });

  describe('environment override', () => {
    it('should override environment when provided', async () => {
      const extractFromArgs = jest.fn().mockReturnValue({ environment: 'staging' });
      const cloneSpy = jest.spyOn(baseConfig, 'clone').mockReturnValue(baseConfig);
      
      const contextFunc = contextFunction({ 
        config: baseConfig, 
        extractFromArgs 
      });

      await contextFunc();

      expect(cloneSpy).toHaveBeenCalledWith({ contentful: { env: 'staging' } });
      expect(mockCreateContext).toHaveBeenCalledWith({ config: baseConfig });

      cloneSpy.mockRestore();
    });

    it('should use original config when no environment provided', async () => {
      const extractFromArgs = jest.fn().mockReturnValue({ environment: undefined });
      const cloneSpy = jest.spyOn(baseConfig, 'clone');
      
      const contextFunc = contextFunction({ 
        config: baseConfig, 
        extractFromArgs 
      });

      await contextFunc();

      expect(cloneSpy).not.toHaveBeenCalled();
      expect(mockCreateContext).toHaveBeenCalledWith({ config: baseConfig });
    });

    it('should handle empty string environment', async () => {
      const extractFromArgs = jest.fn().mockReturnValue({ environment: '' });
      const cloneSpy = jest.spyOn(baseConfig, 'clone');
      
      const contextFunc = contextFunction({ 
        config: baseConfig, 
        extractFromArgs 
      });

      await contextFunc();

      expect(cloneSpy).not.toHaveBeenCalled();
      expect(mockCreateContext).toHaveBeenCalledWith({ config: baseConfig });
    });

    it('should handle null environment', async () => {
      const extractFromArgs = jest.fn().mockReturnValue({ environment: null });
      const cloneSpy = jest.spyOn(baseConfig, 'clone');
      
      const contextFunc = contextFunction({ 
        config: baseConfig, 
        extractFromArgs 
      });

      await contextFunc();

      expect(cloneSpy).not.toHaveBeenCalled();
      expect(mockCreateContext).toHaveBeenCalledWith({ config: baseConfig });
    });
  });

  describe('apollo server context integration', () => {
    it('should merge extra context when apolloServerOptions.context exists', async () => {
      const extractFromArgs = jest.fn().mockReturnValue({ environment: undefined });
      const apolloContext = jest.fn().mockResolvedValue({ extraField: 'extraValue' });
      
      const configWithApollo = baseConfig.clone({
        apolloServerOptions: {
          context: apolloContext
        }
      });

      const contextFunc = contextFunction({ 
        config: configWithApollo, 
        extractFromArgs 
      });

      const result = await contextFunc('arg1', 'arg2');

      expect(apolloContext).toHaveBeenCalledWith('arg1', 'arg2');
      expect(result).toEqual({
        defaultMockContext: true,
        cms: 'Contentful',
        locales: ['en-US'],
        defaultLocale: 'en-US',
        extraField: 'extraValue'
      });
    });

    it('should handle apollo context returning undefined', async () => {
      const extractFromArgs = jest.fn().mockReturnValue({ environment: undefined });
      const apolloContext = jest.fn().mockResolvedValue(undefined);
      
      const configWithApollo = baseConfig.clone({
        apolloServerOptions: {
          context: apolloContext
        }
      });

      const contextFunc = contextFunction({ 
        config: configWithApollo, 
        extractFromArgs 
      });

      const result = await contextFunc();

      expect(result).toEqual({
        defaultMockContext: true,
        cms: 'Contentful',
        locales: ['en-US'],
        defaultLocale: 'en-US',
        undefined: undefined
      });
    });

    it('should handle apollo context throwing error', async () => {
      const extractFromArgs = jest.fn().mockReturnValue({ environment: undefined });
      const apolloContext = jest.fn().mockRejectedValue(new Error('Apollo context error'));
      
      const configWithApollo = baseConfig.clone({
        apolloServerOptions: {
          context: apolloContext
        }
      });

      const contextFunc = contextFunction({ 
        config: configWithApollo, 
        extractFromArgs 
      });

      await expect(contextFunc()).rejects.toThrow('Apollo context error');
    });

    it('should not call apollo context when not configured', async () => {
      const extractFromArgs = jest.fn().mockReturnValue({ environment: undefined });
      
      const contextFunc = contextFunction({ 
        config: baseConfig, 
        extractFromArgs 
      });

      const result = await contextFunc();

      expect(result).toEqual({
        defaultMockContext: true,
        cms: 'Contentful',
        locales: ['en-US'],
        defaultLocale: 'en-US'
      });
    });
  });

  describe('combined scenarios', () => {
    it('should handle environment override with apollo context', async () => {
      const extractFromArgs = jest.fn().mockReturnValue({ environment: 'production' });
      const apolloContext = jest.fn().mockResolvedValue({ userId: '123' });
      
      const configWithApollo = new LastRevAppConfig({
        ...baseConfig.config,
        apolloServerOptions: {
          context: apolloContext
        }
      });
      
      const cloneSpy = jest.spyOn(configWithApollo, 'clone').mockReturnValue(configWithApollo);

      const contextFunc = contextFunction({ 
        config: configWithApollo, 
        extractFromArgs 
      });

      const result = await contextFunc('request', 'response');

      expect(cloneSpy).toHaveBeenCalledWith({ contentful: { env: 'production' } });
      expect(apolloContext).toHaveBeenCalledWith('request', 'response');
      expect(result).toEqual({
        defaultMockContext: true,
        cms: 'Contentful',
        locales: ['en-US'],
        defaultLocale: 'en-US',
        userId: '123'
      });

      cloneSpy.mockRestore();
    });
  });

  describe('error handling', () => {
    it('should propagate createContext errors', async () => {
      const extractFromArgs = jest.fn().mockReturnValue({ environment: undefined });
      mockCreateContext.mockRejectedValue(new Error('Create context failed'));
      
      const contextFunc = contextFunction({ 
        config: baseConfig, 
        extractFromArgs 
      });

      await expect(contextFunc()).rejects.toThrow('Create context failed');
    });

    it('should propagate extractFromArgs errors', async () => {
      const extractFromArgs = jest.fn().mockImplementation(() => {
        throw new Error('Extract args failed');
      });
      
      const contextFunc = contextFunction({ 
        config: baseConfig, 
        extractFromArgs 
      });

      await expect(contextFunc()).rejects.toThrow('Extract args failed');
    });
  });
});