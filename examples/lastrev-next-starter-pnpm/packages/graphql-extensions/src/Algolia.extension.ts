import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from './types';

import { constructObjectId } from '@last-rev/graphql-algolia-integration';
import { pathResolver } from './utils/pathResolver';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { generateCard } from './utils/generateCard';
import { getLink } from './utils/getLink';
import { getMedia } from './utils/getMedia';
import { getSysContentTypeName } from './utils/getSysContentTypeName';
import { pruneEmpty } from './utils/pruneEmpty';

const index = 'contentful';

export const mappers = {
  Blog: {
    AlgoliaRecord: {
      algoliaObjects: async (blog: any, args: any, ctx: ApolloContext) => {
        const path = await pathResolver(blog, args, ctx);

        if (!path) return [];

        const title = getLocalizedField(blog.fields, 'title', ctx);
        const pubDate = getLocalizedField(blog.fields, 'pubDate', ctx);
        const body = getLocalizedField(blog.fields, 'body', ctx);
        const summary = getLocalizedField(blog.fields, 'promoSummary', ctx);
        const promoImageRef =
          getLocalizedField(blog.fields, 'promoImage', ctx) ?? getLocalizedField(blog.fields, 'featuredMedia', ctx);
        const promoImage = await getMedia(promoImageRef, ctx);
        const entries: any[] = [];

        const contentType = getSysContentTypeName(blog);

        const link = await getLink(blog, args, ctx);

        const card = await generateCard({
          id: blog.sys.id,
          overline: 'News',
          title,
          summary,
          link,
          media: promoImage,
          entries,
          ctx
        });

        let pubDateTimestamp;

        try {
          pubDateTimestamp = new Date(pubDate).getTime();
        } catch (err) {}

        return [
          {
            index,
            data: pruneEmpty({
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
              contentType,
              link,
              card
            })
          }
        ];
      }
    }
  },
  Person: {
    AlgoliaRecord: {
      algoliaObjects: async (person: any, args: any, ctx: ApolloContext) => {
        const path = await pathResolver(person, args, ctx);

        if (!path) return [];

        const title = getLocalizedField(person.fields, 'name', ctx);
        const subtitle = getLocalizedField(person.fields, 'jobTitle', ctx);
        const body = getLocalizedField(person.fields, 'body', ctx);
        const summary = getLocalizedField(person.fields, 'promoSummary', ctx);
        const promoImageRef =
          getLocalizedField(person.fields, 'promoImage', ctx) ?? getLocalizedField(person.fields, 'mainImage', ctx);
        const promoImage = await getMedia(promoImageRef, ctx);
        const entries: any[] = [];

        const contentType = getSysContentTypeName(person);

        const link = await getLink(person, args, ctx);

        const card = await generateCard({
          id: person.sys.id,
          overline: 'Our Team',
          title,
          subtitle,
          summary,
          link,
          media: promoImage,
          entries,
          ctx
        });

        const areaOfExpertise = getLocalizedField(person.fields, 'areaOfExpertise', ctx);
        return [
          pruneEmpty({
            index,
            data: {
              objectID: constructObjectId(person, ctx),
              locale: ctx.locale || ctx.defaultLocale,
              preview: !!ctx.preview,
              title,
              subtitle,
              body: documentToPlainTextString(body),
              areaOfExpertise,
              summary,
              promoImage,
              path,
              contentType,
              link,
              card
            }
          })
        ];
      }
    }
  },
  Page: {
    AlgoliaRecord: {
      algoliaObjects: async (page: any, args: any, ctx: ApolloContext) => {
        const path = await pathResolver(page, args, ctx);

        if (!path) return [];

        const title = getLocalizedField(page.fields, 'title', ctx);
        const body = getLocalizedField(page.fields, 'body', ctx);
        const summary = getLocalizedField(page.fields, 'promoSummary', ctx);
        const promoImage = await getMedia(getLocalizedField(page.fields, 'promoImage', ctx), ctx);
        const contentType = getSysContentTypeName(page);
        const link = await getLink(page, args, ctx);
        const entries: any[] = [];

        const card = await generateCard({
          id: page.sys.id,
          overline: 'Page',
          title,
          summary,
          link,
          media: promoImage,
          entries,
          ctx
        });

        return [
          {
            index,
            data: pruneEmpty({
              objectID: constructObjectId(page, ctx),
              locale: ctx.locale || ctx.defaultLocale,
              preview: !!ctx.preview,
              title,
              body: documentToPlainTextString(body),
              summary,
              path,
              contentType,
              link,
              card
            })
          }
        ];
      }
    }
  },
  PageProperty: {
    AlgoliaRecord: {
      algoliaObjects: async (property: any, args: any, ctx: ApolloContext) => {
        const path = await pathResolver(property, args, ctx);

        if (!path) return [];

        const title = getLocalizedField(property.fields, 'name', ctx);
        const summary = getLocalizedField(property.fields, 'promoSummary', ctx);
        const promoImageRef =
          getLocalizedField(property.fields, 'promoImage', ctx) ?? getLocalizedField(property.fields, 'mainImage', ctx);
        const promoImage = await getMedia(promoImageRef, ctx);
        const entries: any[] = [];

        const contentType = getSysContentTypeName(property);

        const link = await getLink(property, args, ctx);

        const card = await generateCard({
          id: property.sys.id,
          overline: 'Case Study',
          title,
          summary,
          link,
          media: promoImage,
          entries,
          ctx
        });

        return [
          {
            index,
            data: pruneEmpty({
              objectID: constructObjectId(property, ctx),
              locale: ctx.locale || ctx.defaultLocale,
              preview: !!ctx.preview,
              title,
              summary,
              promoImage,
              path,
              contentType,
              link,
              card
            })
          }
        ];
      }
    }
  }
};
