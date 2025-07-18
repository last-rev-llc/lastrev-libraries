import { createClient as createContentfulClient } from 'contentful';
import { createClient as createSanityClient } from '@sanity/client';
import { ContentTypeCollection, BaseAsset, BaseEntry } from '@last-rev/types';
import { map } from 'lodash';
import LastRevAppConfig from '@last-rev/app-config';
import { ProcessCommand } from './types';
import { createHandlers } from './handlers';
import { parseWebhook as parseContentfulWebhook, type WebhookParserResult } from '@last-rev/contentful-webhook-parser';
import parseSanityWebhook from '@last-rev/sanity-webhook-parser';
import { getWinstonLogger } from '@last-rev/logging';
import jwt from 'jsonwebtoken';
import { convertSanityDoc } from '@last-rev/sanity-mapper';

export const supportedTypes = ['Entry', 'Asset', 'ContentType'];
export const supportedActions = ['update', 'delete'];

const logger = getWinstonLogger({
  package: 'cms-webhook-handler',
  module: 'index'
});

const getData = async (
  config: LastRevAppConfig,
  type: 'Entry' | 'Asset' | 'ContentType',
  env: string,
  itemId: string
) => {
  if (config.cms === 'Contentful') {
    const client = createContentfulClient({
      space: config.contentful.spaceId,
      accessToken: config.contentful.usePreview
        ? config.contentful.contentPreviewToken
        : config.contentful.contentDeliveryToken,
      host: config.contentful.usePreview ? 'preview.contentful.com' : 'cdn.contentful.com',
      environment: env
    }).withoutLinkResolution.withAllLocales;

    switch (type) {
      case 'Entry':
        return client.getEntry(itemId, {
          include: 0
        });
      case 'Asset':
        return client.getAsset(itemId);
      case 'ContentType':
        return client.getContentTypes();
    }
  } else if (config.cms === 'Sanity') {
    const locales = config.sanity.supportedLanguages.map((locale) => locale.id);
    const defaultLocale = locales[0];
    const client = createSanityClient({
      projectId: config.sanity.projectId,
      dataset: env,
      apiVersion: '2024-03-18'
    });

    let doc: any;
    doc = await client.fetch(
      `*[_id == $id && (!defined(__i18n_lang) || __i18n_lang == $defaultLocale)]{
      ...,
      "_translations": *[
        _type == "translation.metadata" &&
        references(^._id)
      ].translations[]{
        "doc": value->{
          ...
        }
      }[doc.__i18n_lang != $defaultLocale && defined(doc)]
    }`,
      { id: itemId, defaultLocale }
    );
    return convertSanityDoc(doc, defaultLocale, locales);
  }

  // Provide clear error message for debugging unsupported CMS types
  const supportedCMS = ['Contentful', 'Sanity'];
  const currentCMS = config.cms || 'undefined';
  logger.error(`Unsupported CMS type: ${currentCMS}`, {
    caller: 'getData',
    supportedTypes: supportedCMS,
    requestedType: currentCMS,
    type,
    env,
    itemId
  });
  throw new Error(`Unsupported CMS type: ${currentCMS}. Supported CMS types are: ${supportedCMS.join(', ')}`);
};

export const handleWebhook = async (config: LastRevAppConfig, body: any, headers: Record<string, string>) => {
  const token = headers['authorization']?.split(' ')[1];

  let result: WebhookParserResult | undefined;

  switch (config.cms) {
    case 'Contentful':
      result = parseContentfulWebhook(config, body, headers);
      break;
    case 'Sanity':
      result = parseSanityWebhook(config, body, headers);
      break;
    default:
      // Graceful degradation for unsupported CMS types
      const supportedCMS = ['Contentful', 'Sanity'];
      const currentCMS = config.cms || 'undefined';
      logger.error(`Unsupported CMS type in webhook handler: ${currentCMS}`, {
        caller: 'handleWebhook',
        supportedTypes: supportedCMS,
        requestedType: currentCMS,
        bodyType: typeof body,
        hasHeaders: !!headers
      });
      return {
        error: `Unsupported CMS type: ${currentCMS}. Supported CMS types are: ${supportedCMS.join(', ')}`,
        supportedTypes: supportedCMS
      };
  }

  if (!result) {
    const cmsType = config.cms || 'unknown';
    logger.error(`Failed to parse webhook for CMS: ${cmsType}`, {
      caller: 'handleWebhook',
      cmsType,
      bodyType: typeof body,
      hasHeaders: !!headers
    });
    return {
      error: `Failed to parse webhook for CMS: ${cmsType}`,
      details: 'Check webhook payload format and headers'
    };
  }

  const { type, action, contentStates, env, itemId, isTruncated } = result;

  if (!supportedActions.includes(action) || !contentStates.length || !supportedTypes.includes(type)) {
    logger.warn('Webhook skipped due to unsupported action, type, or empty content states', {
      caller: 'handleWebhook',
      action,
      type,
      contentStatesCount: contentStates.length,
      supportedActions,
      supportedTypes,
      isActionSupported: supportedActions.includes(action),
      isTypeSupported: supportedTypes.includes(type),
      hasContentStates: contentStates.length > 0
    });
    return {
      skipped: true,
      reason: 'Unsupported action, type, or empty content states',
      details: {
        action,
        type,
        contentStatesCount: contentStates.length,
        supportedActions,
        supportedTypes
      }
    };
  }

  if (env !== config.contentful.env && config.cms === 'Contentful') {
    config = config.clone({ contentful: { env } });
  } else if (env !== config.sanity.dataset && config.cms === 'Sanity') {
    config = config.clone({ sanity: { dataset: env } });
  }

  const handlers = createHandlers(config);

  // if signing secret is provided, decode the token and verify it
  if (config.jwtSigningSecret) {
    try {
      if (!token) throw Error('No authorization token provided.');
      const decoded = (await jwt.verify(token, config.jwtSigningSecret)) as jwt.JwtPayload;
      if (decoded?.spaceId !== config.contentful.spaceId) {
        throw new Error('Invalid spaceId in JWT Token');
      }
    } catch (e: any) {
      logger.error(e.message, {
        caller: 'handleWebhook',
        stack: e.stack
      });
      throw e;
    }
  }

  let data;
  try {
    data =
      type === 'ContentType' || (isTruncated && action !== 'delete')
        ? await getData(config, type, env, itemId)
        : config.cms === 'Sanity'
        ? convertSanityDoc(
            body,
            config.sanity.supportedLanguages[0].id,
            config.sanity.supportedLanguages.map((l) => l.id)
          )
        : body;
  } catch (error: any) {
    logger.error('Failed to retrieve data from CMS', {
      caller: 'handleWebhook',
      error: error.message,
      stack: error.stack,
      type,
      env,
      itemId,
      cms: config.cms
    });
    throw new Error(`Failed to retrieve data from CMS: ${error.message}`);
  }

  await Promise.all(
    map(contentStates, async (env) => {
      try {
        const command = {
          isPreview: env === 'preview',
          action: action,
          data
        };
        switch (type) {
          case 'Asset':
            await handlers.asset(command as ProcessCommand<BaseAsset>);
            break;
          case 'Entry':
            await handlers.entry(command as ProcessCommand<BaseEntry>);
            break;
          case 'ContentType':
            await handlers.contentType(command as ProcessCommand<ContentTypeCollection>);
            break;
          default:
            logger.debug(`Unsupported type! ${type}`, { caller: 'handleWebhook' });
        }
      } catch (err: any) {
        logger.error(`Error handling webhook: ${err.message}`, {
          caller: 'handleWebhook',
          stack: err.stack
        });
        throw err;
      }
    })
  );

  await handlers.paths(contentStates.includes('preview'), contentStates.includes('production'));

  return {
    success: true,
    processed: {
      type,
      action,
      itemId,
      env,
      contentStates
    }
  };
};
