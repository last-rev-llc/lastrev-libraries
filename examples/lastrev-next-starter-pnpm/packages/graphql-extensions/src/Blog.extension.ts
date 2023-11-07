import gql from 'graphql-tag';
import type { Mappers, ApolloContext } from '@last-rev/types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

import { createType } from './utils/createType';
import { pageFooterResolver } from './utils/pageFooterResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pathResolver } from './utils/pathResolver';

import { breadcrumbsResolver } from './utils/breadcrumbsResolver';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { format } from 'date-fns'; // Assuming you use dayjs for date formatting
import { resolveField } from './utils/resolveField';

export const typeDefs = gql`
  extend type Blog {
    header: Header
    footer: Footer
    path: String
    relatedItems: Content
    categories: [CategoryBlog]
    breadcrumbs: [Link]
    author: Person
    hero: Content
  }
`;

// Controls which site the Blogs gets it's global config from
// const BLOGS_SITE_ID = process.env.BLOGS_SITE_ID ?? (process.env.DEFAULT_SITE_ID || process.env.SITE_ID);

// const blogGlobalContentsResolver = async (page: any, _args: any, ctx: ApolloContext) => {
//   // TODO: Make getting a localized resolved link a single function
//   const siteRef: any = getLocalizedField(page.fields, 'site', ctx);
//   const site = await ctx.loaders.entryLoader.load({ id: siteRef?.sys?.id ?? BLOGS_SITE_ID, preview: !!ctx.preview });
//   const siteblogGlobalContents: any = getLocalizedField(site?.fields, 'blogGlobalContents', ctx);
//   return siteblogGlobalContents;
// };
// Utility function to calculate reading time
function calculateReadingTime(richText: any): number {
  const plainText = documentToPlainTextString(richText);
  const wordsPerMinute = 200; // Average reading speed
  const words = plainText.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return readingTime;
}
export const mappers: Mappers = {
  Blog: {
    Blog: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      breadcrumbs: breadcrumbsResolver,
      // contents: blogGlobalContentsResolver,
      // TODO: Erroring out with current content
      // relatedItems: async (blog: any, _args: any, ctx: ApolloContext) =>
      //   createType('Collection', {
      //     introText: createType('Text', { title: 'Related Blogs' }),
      //     items: getLocalizedField(blog.fields, 'relatedItems', ctx),
      //     variant: 'Three Per Row',
      //     itemsVariant: 'Blog'
      //   }),
      hero: async (blog: any, _args: any, ctx: ApolloContext) =>
        createType('Hero', {
          variant: 'default',
          overline: getLocalizedField(blog.fields, 'pubDate', ctx),
          title: getLocalizedField(blog.fields, 'title', ctx),
          sideImageItems: getLocalizedField(blog.fields, 'featuredMedia', ctx)
        })
    },

    Link: {
      text: 'title',
      href: pathResolver
    },

    NavigationItem: {
      text: 'title',
      href: pathResolver
    },
    Card: {
      title: 'title',
      subtitle: async (blog: any, _args: any, ctx: ApolloContext) => {
        const dateValue = getLocalizedField(blog.fields, 'pubDate', ctx); // Get localized field
        const date = dateValue ? format(new Date(dateValue), 'MMMM d, yyyy') : ''; // Format the date with 'date-fns'

        const bodyRichText = getLocalizedField(blog.fields, 'body', ctx); // Get localized field
        const readingTime = calculateReadingTime(bodyRichText); // Calculate reading time
        const authorName = await resolveField('author.name')(blog, _args, ctx);
        // You might want to format the subtitle to include both date and reading time.
        // This is an example format - "January 1, 2023 · 5 min read"
        return `${authorName} ${date ? '· ' + date : ''} · ${readingTime} min read`;
      },
      overline: async (blog: any, _args: any, ctx: ApolloContext) => {
        const categories = await resolveField('categories')(blog, 'categories', ctx);
        return categories?.map((category: any) => getLocalizedField(category.fields, 'title', ctx)).join('/ ');
      },
      body: async (blog: any, _args: any, ctx: ApolloContext) =>
        getLocalizedField(blog.fields, 'promoSummary', ctx)
          ? createRichText(getLocalizedField(blog.fields, 'promoSummary', ctx))
          : null,

      media: async (blog: any, _args: any, ctx: ApolloContext) => {
        const promoImage =
          getLocalizedField(blog.fields, 'promoImage', ctx) ?? getLocalizedField(blog.fields, 'featuredMedia', ctx);
        if (!promoImage) return null;
        return [promoImage];
      },

      variant: () => 'blog',

      link: async (blog: any, _args: any, ctx: ApolloContext) => {
        return blog;
      },
      actions: async (blog: any, _args: any, ctx: ApolloContext) => {
        // Assume `getFullBlogUrl` is a helper to generate the absolute URL to the blog post
        let blogUrl = await pathResolver(blog, _args, ctx);
        blogUrl = `${process.env.DOMAIN}/${blogUrl}`;
        const socialLinks = [
          {
            platform: 'facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`
          },
          {
            platform: 'twitter',
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}`
          },
          {
            platform: 'instagram'
            // Instagram does not allow direct sharing via URL; placeholder if needed
          },
          {
            platform: 'linkedin',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`
          }
        ];

        // Filter out any platforms that don't support URL sharing (like Instagram)
        const actionableLinks = socialLinks
          .filter((link) => link.url)
          .map((link) =>
            createType('Link', {
              id: `${blog.id}-${link.platform}`,
              color: 'black',
              // text: `Share on ${link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}`, // Capitalize platform name
              href: link.url,
              icon: link.platform,
              target: '_blank',
              variant: 'icon'
            })
          );

        return actionableLinks;
      }
    }
  }
};
