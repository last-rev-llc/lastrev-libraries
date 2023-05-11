import { getWinstonConfig, getWinstonLogger } from './index';
import { transports, loggers, Logger } from 'winston';
import DatadogWinston from 'datadog-winston';

describe('getWinstonConfig', () => {
  beforeEach(() => {
    delete process.env.LOG_LEVEL;
    delete process.env.LOG_TRANSPORT;
    delete process.env.DATADOG_API_KEY;
  });
  it('should return a LoggerOptions object with the correct log level', () => {
    process.env.LOG_LEVEL = 'info';
    const config = getWinstonConfig();
    expect(config.level).toBe('info');
  });

  it('should return a LoggerOptions object with a console transport by default', () => {
    const config = getWinstonConfig();
    expect(config.transports).toHaveLength(1);
    expect((config.transports as any[])[0]).toBeInstanceOf(transports.Console);
  });

  it('should return a LoggerOptions object with a Datadog transport if the DATADOG_API_KEY is set', () => {
    process.env.DATADOG_API_KEY = 'foo';
    const config = getWinstonConfig();
    expect(config.transports).toHaveLength(2);
    expect((config.transports as any[])[1]).toBeInstanceOf(DatadogWinston);
  });

  it('should return a LoggerOptions object with a console transport if the LOG_TRANSPORT is set to "console-one-line"', () => {
    process.env.LOG_TRANSPORT = 'console-one-line';
    const config = getWinstonConfig();
    expect(config.transports).toHaveLength(1);
    expect((config.transports as any[])[0]).toBeInstanceOf(transports.Console);
  });
});

describe('getWinstonLogger', () => {
  it('should return a logger with the correct child options if provided', () => {
    const mockLogger = {
      foo: 'bar'
    } as unknown as Logger;

    jest.spyOn(loggers.get('lastrev'), 'child').mockImplementation(() => mockLogger);
    const logger = getWinstonLogger({ package: 'foo', module: 'bar' });

    // Assert that the .child method was called with the correct options
    expect(loggers.get('lastrev').child).toHaveBeenCalledWith({ package: 'foo', module: 'bar' });

    // Assert that the returned logger is the mock logger we created
    expect(logger).toBe(mockLogger);
    jest.resetAllMocks();
  });

  it('should return the same logger instance if called multiple times', () => {
    const logger1 = getWinstonLogger();
    const logger2 = getWinstonLogger();
    expect(logger1).toBe(logger2);
  });
});
