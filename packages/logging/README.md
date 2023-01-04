# @last-rev/logging

This package provides a few functions that will give the user an instance of a [Winston](https://www.npmjs.com/package/winston) logger wich logs to the console, and optionally sennds logs to datadog.

## Environmennt

The logging library expects some ennvironment variables to be present in order to correctly set up the logger:

- `CONTENTFUL_SPACE_ID` - The Contentful space ID
- `CONTENTFUL_ENV` - The Contentful Environment ID
- `LOG_LEVEL` [`optional`] - The log level to filter logs by (lowercase) [`error`,`warn`,`info`,`debug`,`silly`] - defaults to `debug`
- `SITE` [optional] - if a `SITE` var is used to determine which site to publish the app to, include this.
- `DATADOG_API_KEY` [optional] - If you wish to forward logs to datadog, set this variable
- `DATADOG_LOG_LEVEL` [optional] - If sending logs to [Datadog](https://www.datadoghq.com/), use this to determine which level logs get sent to Datadog. For example, you may set the `LOG_LEVEL` to `debug`, but `DATADOG_LOG_LEVEL` to `info`, which will only send logs of level `info` and above to Datadog. If this is not set, this will be set to the same as the console log level.

## Instantiation and usage

The standard way to use the library is to call `getWinstonLogger` to get the logger insntance, passing in some variables to add additional context info to the logger.

Once instantiated inn a module, simply call the logger using the desired log level. Additional data can be passed in as a second object. Best practive is to always pass in the name of the calling function, as `caller`, and if you are logging a thrown error, pass in the `stack`. These two properties will be sent to Datadog if they exist.

```typescript
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  // This can be any object that will add metadata to all calls to this logger instance,
  // but the best practices are below:
  package: 'graphql-contentful-core', // name of the package this module is located in
  module: 'fieldResolver' // name of the specific module
  strategy: 'Redis' // If this is a package that applies a specific strategy, use that here
});

const someFunc = () => {
  timer = new Time();
  await delay(); // do something that takes time here
  logger.debug('Something happened', {
    caller: 'someFunc',
    elapsedMs: timer.end().millis
  });
  try {
    throw Error('Throwinng an error here');
  } catch (e: any) {
    logger.error(e.message, {
      caller: 'someFunc',
      stack: e.stack
    });
    // this example above will send the log with the message above, as well as the:
    // spaceId, env, site, package, module, caller, and stack to datadog if configured to send remote logs
  }
};
```

## Metadata Best Practices

These are the fields we suggest adding to the metadata:

- `caller` - The name of the function the log statement is called from
- `elapsedMs` - if You are logging something that takes time, it is suggested to use an instance of `@last-rev/timer` to capture timing around it and log it here in milliseconds
- `itemsAttempted` - if you are making a request with a defined number of keys, enter that number here
- `itemsSuccessful` - If the request returned and there is a number of items returned, enter that here
- `query` - if you wish to capture a specific query
- `stack` - The stack trace from an `Error` object (get this with `err.stack`)
- `strategy` - a specific strategy that is being used (may be best used in the logger instantiation, so it is appended to all logger calls)
- `package` - the name of the packge you are logging from (best used in the logger instantiation, so it is appended to all logger calls)
- `module` - the name of the module you are logging from (best used in the logger instantiation, so it is appended to all logger calls)
