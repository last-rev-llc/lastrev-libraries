import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import type { ApolloContext } from './types';
import { constructObjectId } from '@last-rev/graphql-algolia-integration';
import { pathResolver } from './utils/pathResolver';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { generateCard } from './utils/generateCard';
import { getLink } from './utils/getLink';
// import gql from 'graphql-tag';

// export const typeDefs = gql`
//   extend type AlgoliaObject {
//     introText: Text
//     mediaItems: [Media]
//     actions: [Link]
//     link: Link
//     supplementalContent: Content
//     backgroundImage: Media
//   }
// `;

const index = 'contentful';

export const mappers = {
  // Page: {
  //   AlgoliaRecord: {
  //     algoliaObjects: async (page: any, args: any, ctx: ApolloContext) => {
  //       const referencedIds: Set<string> = new Set([page.sys.id]);

  //       // ...

  //       const title = getLocalizedField(item.fields, 'title', ctx);
  //       // TODO: get rendered page content as body
  //       // const body = getLocalizedField(item.fields, 'contents', ctx);
  //       const body = title;
  //       const summary = body;
  //       const entries: any[] = [];

  //       return [
  //         {
  //           index: process.env.ALGOLIA_INDEX_NAME,
  //           objectId: constructObjectId(page, ctx),
  //           referencedIds: Array.from(referencedIds),
  //           additionalFields: {
  //             locale: ctx.locale || ctx.defaultLocale,
  //             preview: !!ctx.preview,
  //             title,
  //             summary,
  //             contentBody,
  //             path,
  //             categories,
  //             categoryLinks,
  //             translatedInLocale,
  //             tags
  //           }
  //         }
  //       ];
  //     }
  //   }
  // },

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
  }
};
