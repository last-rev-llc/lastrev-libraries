import LastRevAppConfig from '@last-rev/app-config';
import { Handlers } from './types';
import AWS from 'aws-sdk';
import { updateAllPaths } from '@last-rev/contentful-path-util';
import { createContext, createLoaders } from '@last-rev/graphql-contentful-helpers';
import { assetHasUrl, createContentfulClients } from './helpers';
import { Entry } from 'contentful';
import { map } from 'lodash';

export const createDynamoDbHandlers = (config: LastRevAppConfig): Handlers => {
  AWS.config.update({
    region: config.dynamodb.region,
    accessKeyId: config.dynamodb.accessKeyId,
    secretAccessKey: config.dynamodb.secretAccessKey
  });

  const pk = (preview: boolean) =>
    `${config.contentful.spaceId}:${config.contentful.env}:${preview ? 'preview' : 'production'}`;

  const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: config.dynamodb.region
  });

  const { contentfulPreviewClient, contentfulProdClient } = createContentfulClients(config);

  const getAll = async ({
    params,
    results = []
  }: {
    params: any;
    results?: any[];
  }): Promise<AWS.DynamoDB.DocumentClient.ItemList> => {
    const data = await dynamoDB.query(params).promise();
    if (data.LastEvaluatedKey) {
      return await getAll({
        params: { ...params, ExclusiveStartKey: data.LastEvaluatedKey },
        results: [...results, ...(data.Items || [])]
      });
    }
    return [...results, ...(data.Items as [])];
  };

  const refreshContentTypes = async (isPreview: boolean) => {
    const client = isPreview ? contentfulPreviewClient : contentfulProdClient;

    const { items: contentTypes } = await client.getContentTypes();

    // get all content models
    const itemsToDelete = await getAll({
      params: {
        TableName: config.dynamodb.tableName,
        KeyConditionExpression: '#pk = :pk and begins_with(#sk, :ct)',
        ExpressionAttributeNames: {
          '#pk': 'pk',
          '#sk': 'sk'
        },
        ProjectionExpression: ['pk', 'sk'],
        ExpressionAttributeValues: {
          ':pk': pk(isPreview),
          ':ct': 'content_types'
        }
      }
    });

    // delete all content models
    await Promise.all(
      map(itemsToDelete, async (item) =>
        dynamoDB
          .delete({
            TableName: config.dynamodb.tableName,
            Key: { pk: item.pk, sk: item.sk }
          })
          .promise()
      )
    );

    // refresh content models
    await Promise.all(
      map(contentTypes, async (data) =>
        dynamoDB
          .put({
            TableName: config.dynamodb.tableName,
            Item: {
              pk: pk(isPreview),
              sk: `content_types:${data.sys.id}`,
              data
            }
          })
          .promise()
      )
    );
  };

  const refreshEntriesByContentType = async (contentTypeId: string, isPreview: boolean) => {
    const client = isPreview ? contentfulPreviewClient : contentfulProdClient;

    const makeRequest = async (skip: number = 0, existing: Entry<any>[] = []): Promise<Entry<any>[]> => {
      const results = await client.getEntries({
        content_type: contentTypeId,
        skip,
        limit: 1000
      });

      const { items = [], total } = results;

      existing.push(...items);
      if (existing.length === total) {
        return existing;
      }
      return makeRequest(skip + 1000, existing);
    };

    const entries = await makeRequest();

    // get all items of existing content type
    const itemsToDelete = await getAll({
      params: {
        TableName: config.dynamodb.tableName,
        KeyConditionExpression: '#pk = :pk and #type = :type',
        ExpressionAttributeNames: {
          '#pk': 'pk',
          '#type': 'type'
        },
        ExpressionAttributeValues: {
          ':pk': pk(isPreview),
          ':type': contentTypeId
        },
        ProjectionExpression: ['pk', 'sk'],
        IndexName: 'pkTypeIndex'
      }
    });

    // delete all items of existing content type
    await Promise.all(
      map(itemsToDelete, async (item) =>
        dynamoDB
          .delete({
            TableName: config.dynamodb.tableName,
            Key: { pk: item.pk, sk: item.sk }
          })
          .promise()
      )
    );

    // re-populate all items of existing content type
    await Promise.all(
      map(entries, async (data) => {
        const {
          sys: {
            id,
            contentType: {
              sys: { id: type }
            }
          }
        } = data;
        await dynamoDB
          .put({
            TableName: config.dynamodb.tableName,
            Item: {
              pk: pk(isPreview),
              sk: `entries:${id}`,
              type,
              data
            }
          })
          .promise();
      })
    );
  };

  const putData = async (data: any, isPreview: boolean, sk: string, type?: string) => {
    return await dynamoDB
      .put({
        TableName: config.dynamodb.tableName,
        Item: {
          pk: pk(isPreview),
          sk,
          type,
          data
        }
      })
      .promise();
  };

  const delData = async (isPreview: boolean, sk: string) => {
    return await dynamoDB
      .delete({
        TableName: config.dynamodb.tableName,
        Key: {
          pk: pk(isPreview),
          sk
        }
      })
      .promise();
  };

  return {
    entry: async (command) => {
      const { data, isPreview } = command;
      // wether the entry is published or not, we need to refresh all entries of this type
      await refreshEntriesByContentType(data.sys.contentType.sys.id, isPreview);
    },
    asset: async (command) => {
      const { data, isPreview } = command;
      const sk = `assets:${data.sys.id}`;
      if (command.action === 'update') {
        if (assetHasUrl(data)) {
          await putData(data, isPreview, sk);
        } else {
          // Asset must be deleted because the content was not ready in contentful
          await delData(isPreview, sk);
        }
      } else if (command.action === 'delete') {
        await delData(isPreview, sk);
      }
    },
    contentType: async (command) => refreshContentTypes(command.isPreview),
    paths: async (updateForPreview, updateForProd) => {
      const loaders = createLoaders(config);
      const context = await createContext(config, loaders);
      await updateAllPaths({ config, updateForPreview, updateForProd, context });
    }
  };
};
