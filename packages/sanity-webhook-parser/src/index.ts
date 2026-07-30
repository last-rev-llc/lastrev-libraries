import { ContentType, BaseAsset, BaseEntry } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';

type HasEnv = {
  sys: {
    environment: {
      sys: {
        id: string;
        type: 'Link';
        linkType: 'Environment';
      };
    };
  };
};

export type WebhookBody = (BaseEntry | BaseAsset | ContentType) & HasEnv;
export type WebhookHeaders = Record<string, string>;
export type WebhookParserResult = {
  action: 'update' | 'delete';
  contentStates: ('preview' | 'production')[];
  type: 'Entry' | 'Asset' | 'ContentType';
  env: string;
  itemId: string;
  isTruncated: boolean;
};

const parseWebhook = (config: LastRevAppConfig, body: any, headers: WebhookHeaders): WebhookParserResult => {
  // Extract action from Sanity header
  const operation = headers['sanity-operation']; // 'create', 'update', 'delete'
  let action: 'update' | 'delete';
  switch (operation) {
    case 'delete':
      action = 'delete';
      break;
    case 'create':
    case 'update':
    default:
      action = 'update';
      break;
  }

  // Determine type: Asset or Entry (never ContentType for Sanity, but keep in union)
  let type: 'Entry' | 'Asset' | 'ContentType' = 'Entry';
  if (body?._type === 'image' || body?._type === 'file') type = 'Asset';

  // Get dataset (env) and project id
  const env = headers['sanity-dataset'];
  const projectId = headers['sanity-project-id'];
  if (projectId !== config.sanity.projectId) {
    throw Error('Project id in webhook does not match configuration.');
  }

  // Sanity's default projection is "the whole document after the change", so a
  // delete has no document body at all — the id only arrives in the header.
  const headerId: string | undefined = headers['sanity-document-id'];
  const bodyId: string | undefined = body?._id;
  // Either source is enough: a delete has only the header, while a body-only
  // payload still identifies the draft through its _id.
  const isDraft = !!headerId?.startsWith('drafts.') || !!bodyId?.startsWith('drafts.');
  const rawItemId = headerId || bodyId;
  const itemId = (rawItemId?.startsWith('drafts.') ? rawItemId.substring(7) : rawItemId) ?? '';

  // isTruncated: true if body is empty or has no fields
  const isTruncated = body?._lr_truncated === true;

  // Determine contentStates based on draft status
  const contentStates: ('preview' | 'production')[] = isDraft ? ['preview'] : ['production'];

  return {
    action,
    contentStates,
    type,
    env,
    itemId,
    isTruncated
  };
};

export default parseWebhook;
