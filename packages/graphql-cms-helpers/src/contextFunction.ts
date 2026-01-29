import { ContextFunction } from '@apollo/server';
import { ApolloContext } from '@last-rev/types';
import createContext, { CreateContextFuncProps } from './createContext';

const contextFunction: <T extends any[]>(options: CreateContextFuncProps<T>) => ContextFunction<T, ApolloContext> =
  ({ config: origConfig, extractFromArgs }) =>
  async (...args) => {
    const { environment } = extractFromArgs(...args);
    // overrides the environment if it is passed in the query string
    // For Sanity: environment maps to dataset
    // For Contentful: environment maps to env
    const config = environment
      ? origConfig.cms === 'Sanity'
        ? origConfig.clone({ sanity: { dataset: environment } })
        : origConfig.clone({ contentful: { env: environment } })
      : origConfig;
    let contextValue = await createContext({ config });

    if (config.apolloServerOptions.context) {
      const extraContextValue = await config.apolloServerOptions.context(...args);
      contextValue = {
        ...contextValue,
        ...extraContextValue
      };
    }
    return contextValue;
  };

export default contextFunction;
