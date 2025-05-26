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
    const keyParts: string[] = [config.cms];
    if (config.cms === 'Sanity') {
      keyParts.push(config.sanity.projectId, config.sanity.dataset);
    } else {
      keyParts.push(config.contentful.spaceId, config.contentful.env);
    }
    const key = JSON.stringify(keyParts);
    if (!this.schemaMap[key]) {
      this.schemaMap[key] = await buildSchema(config);
    }
    return this.schemaMap[key];
  };
}
