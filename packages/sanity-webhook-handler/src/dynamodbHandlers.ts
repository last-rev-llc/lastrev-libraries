import LastRevAppConfig from '@last-rev/app-config';
import { Handlers } from './types';
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { createContext } from '@last-rev/graphql-contentful-helpers';
import { updateAllPaths } from '@last-rev/contentful-path-util';

export const createDynamoDbHandlers = (config: LastRevAppConfig): Handlers => {
  const pk = () => `${config.sanity.projectId}:${config.sanity.dataset}`;

  const dynamoDB = DynamoDBDocument.from(
    new DynamoDB({
      region: config.dynamodb.region,
      credentials: {
        accessKeyId: config.dynamodb.accessKeyId,
        secretAccessKey: config.dynamodb.secretAccessKey
      }
    })
  );

  const putData = async (data: any, sk: string) => {
    await dynamoDB.put({
      TableName: config.dynamodb.tableName,
      Item: {
        pk: pk(),
        sk,
        data
      }
    });
  };

  const delData = async (sk: string) => {
    await dynamoDB.delete({
      TableName: config.dynamodb.tableName,
      Key: { pk: pk(), sk }
    });
  };

  return {
    entry: async (command) => {
      const { data } = command;
      const sk = `entries:${data._id}`;
      if (command.action === 'update') {
        await putData(data, sk);
      } else if (command.action === 'delete') {
        await delData(sk);
      }
    },
    asset: async () => {},
    contentType: async () => {},
    paths: async (updateForPreview, updateForProd) => {
      const context = await createContext({ config });
      await updateAllPaths({ config, updateForPreview, updateForProd, context });
    }
  };
};
