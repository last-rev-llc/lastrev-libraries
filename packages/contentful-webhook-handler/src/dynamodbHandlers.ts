import LastRevAppConfig from '@last-rev/app-config';
import { Handlers } from './types';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDB, QueryCommandOutput } from '@aws-sdk/client-dynamodb';
import { updateAllPaths } from '@last-rev/contentful-path-util';
import { createContext } from '@last-rev/graphql-contentful-helpers';
import { assetHasUrl, createContentfulClients } from './helpers';
import { Entry } from 'contentful';
import { map } from 'lodash';

export const createDynamoDbHandlers = (config: LastRevAppConfig): Handlers => {
  const pk = (preview: boolean) =>
    `${config.contentful.spaceId}:${config.contentful.env}:${preview ? 'preview' : 'production'}`;

  const dynamoDB = DynamoDBDocument.from(
    new DynamoDB({
      region: config.dynamodb.region,
      credentials: {
        accessKeyId: config.dynamodb.accessKeyId,
        secretAccessKey: config.dynamodb.secretAccessKey
      }
    })
  );

  const { contentfulPreviewClient, contentfulProdClient } = createContentfulClients(config);

  const getAll = async ({
    params,
    results = []
  }: {
    params: any;
    results?: any[];
  }): Promise<QueryCommandOutput['Items']> => {
    const data = await dynamoDB.query(params);
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
        dynamoDB.delete({
          TableName: config.dynamodb.tableName,
          Key: { pk: item.pk, sk: item.sk }
        })
      )
    );

    // refresh content models
    const putRequests = contentTypes.map((data) => ({
      PutRequest: {
        Item: {
          pk: pk(isPreview),
          sk: `content_types:${data.sys.id}`,
          data
        }
      }
    }));

    await dynamoDB.batchWrite({
      RequestItems: {
        [config.dynamodb.tableName]: putRequests
      }
    });
  };

  const refreshEntriesByContentType = async (contentTypeId: string, isPreview: boolean) => {
    const client = isPreview ? contentfulPreviewClient : contentfulProdClient;

    const makeRequest = async (skip: number = 0, existing: Entry<any>[] = []): Promise<Entry<any>[]> => {
      const results = await client.getEntries({
        content_type: contentTypeId,
        locale: '*',
        include: 0,
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
        dynamoDB.delete({
          TableName: config.dynamodb.tableName,
          Key: { pk: item.pk, sk: item.sk }
        })
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
        await dynamoDB.put({
          TableName: config.dynamodb.tableName,
          Item: {
            pk: pk(isPreview),
            sk: `entries:${id}`,
            type,
            data
          }
        });
      })
    );
  };

  const putData = async (data: any, isPreview: boolean, sk: string, type?: string) => {
    return await dynamoDB.put({
      TableName: config.dynamodb.tableName,
      Item: {
        pk: pk(isPreview),
        sk,
        type,
        data
      }
    });
  };

  const delData = async (isPreview: boolean, sk: string) => {
    return await dynamoDB.delete({
      TableName: config.dynamodb.tableName,
      Key: {
        pk: pk(isPreview),
        sk
      }
    });
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
      const context = await createContext({ config });
      await updateAllPaths({ config, updateForPreview, updateForProd, context });
    }
  };
};
