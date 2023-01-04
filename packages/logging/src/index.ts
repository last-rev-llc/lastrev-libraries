import dotenv from 'dotenv';

dotenv.config();

import { loggers, transport, LoggerOptions, format, Logger, transports } from 'winston';
import DatadogWinston from 'datadog-winston';

export const getWinstonConfig = (): LoggerOptions => {
  const logLevel = process.env.LOG_LEVEL || 'debug';

  const consoleTransport = new transports.Console({
    format: format.simple(),
    level: logLevel
  });

  const transportsArray: transport[] = [consoleTransport];

  if (process.env.DATADOG_API_KEY) {
    const metadataFormatter = format((info, opts) => {
      return {
        ...info,
        ...opts
      };
    });

    // Combine the JSON formatter with the custom metadata formatter
    const jsonFormatter = format.combine(
      format.json(),
      metadataFormatter({
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        environment: process.env.CONTENTFUL_ENV,
        site: process.env.SITE
      })
    );

    const datadogTransport = new DatadogWinston({
      apiKey: process.env.DATADOG_API_KEY,
      level: process.env.DATADOG_LOG_LEVEL || logLevel,
      format: jsonFormatter
      // hostname: 'my_machine',
      // service: 'my_service',
      // ddsource: 'nodejs',
      // ddtags: 'foo:bar,boo:baz'
    });

    transportsArray.push(datadogTransport);
  }

  return {
    level: logLevel,
    transports: transportsArray
  };
};

export const getWinstonLogger = (childOptions?: any): Logger => {
  if (!loggers.has('lastrev')) {
    loggers.add('lastrev', getWinstonConfig());
  }
  return childOptions ? loggers.get('lastrev').child(childOptions) : loggers.get('lastrev');
};
