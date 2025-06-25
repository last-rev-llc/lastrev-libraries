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
  throw new Error('Unsupported CMS');
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
  }

  if (!result) {
    logger.error('Unsupported CMS', { caller: 'handleWebhook' });
    return;
  }

  const { type, action, contentStates, env, itemId, isTruncated } = result;

  if (!supportedActions.includes(action) || !contentStates.length || !supportedTypes.includes(type)) return;

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

  const data =
    type === 'ContentType' || (isTruncated && action !== 'delete') ? await getData(config, type, env, itemId) : body;

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
};
