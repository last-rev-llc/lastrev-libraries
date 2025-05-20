import { createClient } from '@sanity/client';
import { map } from 'lodash';
import LastRevAppConfig from '@last-rev/app-config';
import { ProcessCommand } from './types';
import { createHandlers } from './handlers';
import { getWinstonLogger } from '@last-rev/logging';

const logger = getWinstonLogger({
  package: 'sanity-webhook-handler',
  module: 'index'
});

type WebhookIds = { created?: string[]; updated?: string[]; deleted?: string[] };

type WebhookBody = { ids?: WebhookIds };

const handleWebhook = async (config: LastRevAppConfig, body: WebhookBody) => {
  const sanityCfg = (config as any).sanity || {};

  const client = createClient({
    projectId: sanityCfg.projectId,
    dataset: sanityCfg.dataset,
    apiVersion: sanityCfg.apiVersion || '2021-10-21',
    token: sanityCfg.token,
    useCdn: false
  });

  const handlers = createHandlers(config);

  const processDoc = async (id: string, action: 'update' | 'delete') => {
    try {
      let data: any = { _id: id };
      if (action === 'update') {
        const doc = await client.getDocument(id);
        if (!doc) return;
        data = doc;
      }
      await handlers.entry({ isPreview: false, action, data } as ProcessCommand<any>);
    } catch (err: any) {
      logger.error(`Error processing document ${id}: ${err.message}`, { caller: 'handleWebhook', stack: err.stack });
    }
  };

  const ids = body.ids || {};
  await Promise.all(
    [
      ...(ids.created || []).map((id) => processDoc(id, 'update')),
      ...(ids.updated || []).map((id) => processDoc(id, 'update')),
      ...(ids.deleted || []).map((id) => processDoc(id, 'delete'))
    ]
  );

  await handlers.paths(true, true);
};

export default handleWebhook;
