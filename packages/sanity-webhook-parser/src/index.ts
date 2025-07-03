import { ContentType, BaseAsset, BaseEntry } from '@last-rev/types';
import LastRevAppConfig from '@last-rev/app-config';
import { convertSanityDoc } from '@last-rev/sanity-mapper';

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

  let itemId = headers['sanity-document-id'] || body?._id;
  if (itemId?.startsWith('drafts.')) itemId = itemId.substring(7);

  // isTruncated: true if body is empty or has no fields
  const isTruncated = body?._lr_truncated === true;

  // Determine contentStates based on draft status
  let contentStates: ('preview' | 'production')[] = [];
  if (body?._id?.startsWith('drafts.')) contentStates = ['preview'];
  else contentStates = ['production'];

  // Get defaultLocale from config.sanity.supportedLanguages
  const locales = config.sanity.supportedLanguages.map((locale) => locale.id);
  const defaultLocale = locales[0];

  // Convert doc
  convertSanityDoc(body, defaultLocale, locales);

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
