import LastRevAppConfig from '@last-rev/app-config';
import buildSchema from './buildSchema';
import { GraphQLSchema } from 'graphql';

export default class SchemaCache {
  private schemaMap: Record<string, GraphQLSchema> = {};
  private static instance: SchemaCache;

  private constructor() {}

  public static getInstance = () => {
    if (!SchemaCache.instance) {
      SchemaCache.instance = new SchemaCache();
    }
    return SchemaCache.instance;
  };

  public getSchema = async (config: LastRevAppConfig) => {
    const key = JSON.stringify([config.contentful.spaceId, config.contentful.env]);
    if (!this.schemaMap[key]) {
      this.schemaMap[key] = await buildSchema(config);
    }
    return this.schemaMap[key];
  };
}
