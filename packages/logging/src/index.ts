import dotenv from 'dotenv';

dotenv.config();

import { loggers, transport, LoggerOptions, format, Logger, transports } from 'winston';
import DatadogWinston from 'datadog-winston';

type LogTransport = 'console' | 'console-one-line' | 'datadog';

const green = (text: string) => `\x1b[32m${text}\x1b[0m`;
const yellow = (text: string) => `\x1b[33m${text}\x1b[0m`;
const red = (text: string) => `\x1b[31m${text}\x1b[0m`;

const wrap = (text: string, level: string) => {
  switch (level) {
    case 'warn':
      return yellow(text);
    case 'error':
      return red(text);
    default:
      return green(text);
  }
};

export const getWinstonConfig = (): LoggerOptions => {
  const logTransport: LogTransport = (process.env.LOG_TRANSPORT ?? 'console') as LogTransport;
  const logLevel = process.env.LOG_LEVEL || 'debug';

  const customConsoleFormatter = ({ level, message, ...rest }: any) => {
    let output = wrap(`[${level}] ${message}`, level);
    if (rest) {
      for (const key in rest) {
        if (logTransport === 'console-one-line') {
          output += ` ${key}: ${rest[key]}`;
        } else {
          output += `\n\t${key}: ${rest[key]}`;
        }
      }
    }
    return output;
  };

  const consoleTransport = new transports.Console({
    format: format.combine(format.timestamp(), format.printf(customConsoleFormatter)),
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
      format: jsonFormatter,
      hostname: process.env.VERCEL_URL, // VERCEL_URL is set by Vercel
      service: process.env.SITE_NAME || process.env.DOMAIN, // SITE_NAME is set by Netlify, DOMAIN is used for Vercel
      ddsource: 'last-rev'
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
