import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from './types';
import { constructObjectId } from '@last-rev/graphql-algolia-integration';
import { pathResolver } from './utils/pathResolver';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { generateCard } from './utils/generateCard';
import { getLink } from './utils/getLink';

const index = 'test127';

export const mappers = {
  Blog: {
    AlgoliaRecord: {
      algoliaObjects: async (blog: any, args: any, ctx: ApolloContext) => {
        const path = pathResolver(blog, args, ctx);

        if (!path) return [];

        const title = getLocalizedField(blog.fields, 'title', ctx);
        const pubDate = getLocalizedField(blog.fields, 'pubDate', ctx);
        const body = getLocalizedField(blog.fields, 'body', ctx);
        const summary = getLocalizedField(blog.fields, 'promoSummary', ctx) ?? '';
        const promoImage =
          getLocalizedField(blog.fields, 'promoImage', ctx) ?? getLocalizedField(blog.fields, 'featuredMedia', ctx);

        const entries: any[] = [];

        const contentType = blog.sys.contentType.sys.id;

        const link = await getLink(blog, args, ctx);

        const card = generateCard({ id: blog.sys.id, title, summary, link, media: promoImage, entries });

        let pubDateTimestamp;

        try {
          pubDateTimestamp = new Date(pubDate).getTime();
        } catch (err) {}

        return [
          {
            index,
            data: {
              objectID: constructObjectId(blog, ctx),
              locale: ctx.locale || ctx.defaultLocale,
              preview: !!ctx.preview,
              title,
              pubDate,
              pubDateTimestamp,
              body: documentToPlainTextString(body),
              summary,
              promoImage,
              path,
              contentType: ['all', contentType],
              link,
              card
            }
          }
        ];
      }
    }
  },
  Person: {
    AlgoliaRecord: {
      algoliaObjects: async (person: any, args: any, ctx: ApolloContext) => {
        const path = pathResolver(person, args, ctx);

        if (!path) return [];

        const title = getLocalizedField(person.fields, 'title', ctx);
        const subtitle = getLocalizedField(person.fields, 'jobTitle', ctx);
        const body = getLocalizedField(person.fields, 'body', ctx);
        const summary = getLocalizedField(person.fields, 'promoSummary', ctx) ?? '';
        const promoImage =
          getLocalizedField(person.fields, 'promoImage', ctx) ?? getLocalizedField(person.fields, 'mainImage', ctx);

        const entries: any[] = [];

        const contentType = person.sys.contentType.sys.id;

        const link = await getLink(person, args, ctx);

        const card = generateCard({ id: person.sys.id, title, subtitle, summary, link, media: promoImage, entries });

        return [
          {
            index,
            data: {
              objectID: constructObjectId(person, ctx),
              locale: ctx.locale || ctx.defaultLocale,
              preview: !!ctx.preview,
              title,
              subtitle,
              body: documentToPlainTextString(body),
              summary,
              promoImage,
              path,
              contentType: ['all', contentType],
              link,
              card
            }
          }
        ];
      }
    }
  },
  Page: {
    AlgoliaRecord: {
      algoliaObjects: async (page: any, args: any, ctx: ApolloContext) => {
        const path = pathResolver(page, args, ctx);

        if (!path) return [];

        const title = getLocalizedField(page.fields, 'title', ctx);
        const body = getLocalizedField(page.fields, 'body', ctx);
        const summary = getLocalizedField(page.fields, 'promoSummary', ctx) ?? '';
        const promoImage =
          getLocalizedField(page.fields, 'promoImage', ctx) ?? getLocalizedField(page.fields, 'mainImage', ctx);

        const entries: any[] = [];

        const contentType = page.sys.contentType.sys.id;

        const link = await getLink(page, args, ctx);

        const card = generateCard({ id: page.sys.id, title, summary, link, media: promoImage, entries });

        return [
          {
            index,
            data: {
              objectID: constructObjectId(page, ctx),
              locale: ctx.locale || ctx.defaultLocale,
              preview: !!ctx.preview,
              title,
              body: documentToPlainTextString(body),
              summary,
              promoImage,
              path,
              contentType: ['all', contentType],
              link,
              card
            }
          }
        ];
      }
    }
  },
  PageProperty: {
    AlgoliaRecord: {
      algoliaObjects: async (property: any, args: any, ctx: ApolloContext) => {
        const path = pathResolver(property, args, ctx);

        if (!path) return [];

        const title = getLocalizedField(property.fields, 'name', ctx);
        const summary = getLocalizedField(property.fields, 'promoSummary', ctx) ?? '';
        const promoImage =
          getLocalizedField(property.fields, 'promoImage', ctx) ?? getLocalizedField(property.fields, 'mainImage', ctx);

        const entries: any[] = [];

        const contentType = property.sys.contentType.sys.id;

        const link = await getLink(property, args, ctx);

        const card = generateCard({ id: property.sys.id, title, summary, link, media: promoImage, entries });

        return [
          {
            index,
            data: {
              objectID: constructObjectId(property, ctx),
              locale: ctx.locale || ctx.defaultLocale,
              preview: !!ctx.preview,
              title,
              summary,
              promoImage,
              path,
              contentType: ['all', contentType],
              link,
              card
            }
          }
        ];
      }
    }
  }
};
