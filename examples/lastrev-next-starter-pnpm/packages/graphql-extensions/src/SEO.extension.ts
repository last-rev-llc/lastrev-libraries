import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { resolveField } from './utils/resolveField';
import type { BlogPosting as LdBlogPosting, Person as LdPerson, WebPage as LdWebPage } from 'schema-dts';
import { pathResolver } from './utils/pathResolver';

export const typeDefs = gql`
  extend type Page {
    jsonLd: JSON
  }
  extend type Blog {
    jsonLd: JSON
  }
  extend type Person {
    jsonLd: JSON
  }
  extend type Card {
    jsonLd: JSON
  }
`;

export const resolvers: any = {
  Page: {
    jsonLd: async (page: any, args: any, ctx: any) => {
      const title = getLocalizedField(page.fields, 'title', ctx);
      const description = getLocalizedField(page.fields, 'description', ctx);
      const pageUrl = await pathResolver(page, args, ctx);
      const seo = resolveField('seo');

      const jsonLDSchema: LdWebPage = {
        // '@context': 'https://schema.org',
        'headline': title,
        description,
        '@type': 'WebPage',
        '@id': `${pageUrl}/#page`,
        'url': pageUrl,
        'inLanguage': ctx.locale

        // TODO:
        // 'isPartOf': {
        //   '@id': 'https://my.site/#site'
        // }
        // 'about': { '@id': 'https://my.site/#alyssa' },
        // 'mainEntity': { '@id': 'https://my.site/#alyssa' }
      };

      // TODO: This should be the same as on the page
      if (seo['title']?.value) jsonLDSchema.name = seo['name']?.value;

      return jsonLDSchema as unknown as JSON;
    }
  },
  Blog: {
    jsonLd: async (blog: any, args: any, ctx: any) => {
      const title = getLocalizedField(blog.fields, 'title', ctx);
      const description = getLocalizedField(blog.fields, 'promoSummary', ctx);
      // const body =  = resolveField(['body']);
      const seo = getLocalizedField(blog.fields, 'seo', ctx);
      const authorRef = getLocalizedField(blog.fields, 'author', ctx);
      const author = await ctx.loaders.entryLoader.load({ id: authorRef?.sys?.id, preview: !!ctx.preview });
      const datePublished = getLocalizedField(blog.fields, 'pubDate', ctx);
      const blogUrl = await pathResolver(blog, args, ctx);

      // TODO: Need to get this globally
      // const publisher = resolveField('pubDate');
      // 'publisher': {
      //   '@type': 'Organization',
      //   'name': 'Publisher Name',
      //   'logo': {
      //     '@type': 'ImageObject',
      //     'url': 'https://example.com/logo.png',
      //     'width': 600,
      //     'height': 60
      //   }
      // },

      // TODO: Update to be more dynamic somehow?
      const dateModified = resolveField('pubDate');

      const imageRef =
        getLocalizedField(blog.fields, 'promoImage', ctx) ?? getLocalizedField(blog.fields, 'featuredMedia', ctx);
      const image = await ctx.loaders.assetLoader.load({ id: imageRef?.sys?.id, preview: !!ctx.preview });

      const jsonLDSchema: LdBlogPosting = {
        '@type': 'BlogPosting',
        'headline': 'Title of the Blog Post',
        datePublished,
        dateModified,
        // publisher

        // Need to
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': blogUrl
        }
      };

      if (title) jsonLDSchema.headline = title;

      if (description) jsonLDSchema.description = description;

      //TODO: How to get string versiom here without rendering?   Similar to Algolia?   Will also increase page size
      //if (body) jsonLDSchema.articleBody = body;

      if (description) jsonLDSchema.description = description;

      if (image?.fields) {
        jsonLDSchema.image = {
          '@type': 'ImageObject',
          'url': image.fields.file.url,
          'width': image.fields.file.width,
          'height': image.fields.file.height
        };
      }

      if (author?.name) {
        jsonLDSchema.author = {
          '@type': 'Person',
          'name': author.name
        };
      }

      if (seo['keywords']?.value) jsonLDSchema.keywords = seo['keywords']?.value;

      console.log({ jsonLDSchema });

      return jsonLDSchema as unknown as JSON;
    }
  },
  Person: {
    jsonLd: (person: any, _args: any, ctx: any) => {
      // const title = getLocalizedField(person.fields, 'name', ctx);
      // const description = getLocalizedField(person.fields, 'promoSummary', ctx);
      // const jsonLDSchema = {
      //   // '@context': 'https://schema.org',
      //   // '@type': 'BlogPosting',
      //   // 'mainEntityOfPage': {
      //   //   '@type': 'WebPage'
      //   //   // '@id': `${siteUrl}/blogs`
      //   // },
      //   // 'headline': title,
      //   // description,
      //   // 'image': {
      //   //   '@type': 'ImageObject'
      //   //   // url: image
      //   // }
      // };
      // return jsonLDSchema as unknown as JSON;
      return {};
    }
  }
};
