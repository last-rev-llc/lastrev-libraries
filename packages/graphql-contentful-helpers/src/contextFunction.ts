import { ContextFunction } from '@apollo/server';
import { ApolloContext } from '@last-rev/types';
import createContext, { CreateContextProps } from './createContext';

const contextFunction: (options: CreateContextProps) => ContextFunction<ApolloContext> =
  (createContextProps) =>
  async (...args) => {
    let contextValue = await createContext(createContextProps);

    if (createContextProps.config.apolloServerOptions.context) {
      const extraContextValue = await createContextProps.config.apolloServerOptions.context(...args);
      contextValue = {
        ...contextValue,
        ...extraContextValue
      };
    }
    return contextValue;
  };

export default contextFunction;
