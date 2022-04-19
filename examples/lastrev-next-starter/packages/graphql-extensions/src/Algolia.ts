import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import { constructObjectId } from '@last-rev/graphql-algolia-integration';
import { BLOCKS } from '@contentful/rich-text-types';
import createPermaLink from './utils/createPermaLink';
import parseRichTextField from './utils/parseRichTextField';

export const mappers = {
  Blog: {
    AlgoliaRecord: {
      algoliaObjects: async (blog: any, _args: any, ctx: ApolloContext) => {
        const previewString = ctx.preview ? 'preview' : 'prod';
        const pathReader = ctx.pathReaders?.[previewString];

        const paths = await pathReader?.getPathsByContentId(
          blog.sys.id,
          ctx.locale || ctx.defaultLocale,
          process.env.SITE
        );

        const path = paths && paths.length ? paths[0] : '';
        const url = `${process.env.DOMAIN}${path}`;

        const objects = parseRichTextField(getLocalizedField(blog.fields, 'body', ctx), {
          sectionDelimiter: BLOCKS.HEADING_2
        });

        const title = getLocalizedField(blog.fields, 'title', ctx);

        return objects.map(({ section, content }, objectIndex) => ({
          index: 'blogs',
          data: {
            objectID: constructObjectId(blog, ctx, objectIndex),
            locale: ctx.locale || ctx.defaultLocale,
            preview: !!ctx.preview,
            title,
            section,
            content,
            permalink: `${url}${createPermaLink(section)}`
          }
        }));
      }
    }
  }
};
