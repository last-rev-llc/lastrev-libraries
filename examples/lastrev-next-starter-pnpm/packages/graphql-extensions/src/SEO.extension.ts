import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { resolveField } from './utils/resolveField';

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

export const resolvers = {
  Page: {
    jsonLd: (page: any, _args: any, ctx: any) => {
      const title = getLocalizedField(page.fields, 'title', ctx);
      const description = getLocalizedField(page.fields, 'description', ctx);
      const JSONLDSchema = {
        '@context': 'https://schema.org',
        'headline': title,
        description
      };

      return JSONLDSchema;
    }
  },
  Blog: {
    jsonLd: (blog: any, _args: any, ctx: any) => {
      const title = resolveField(['title']);
      const description = resolveField(['promoSummary']);
      const image = resolveField(['promoImage', 'featuredMedia']);
      const jsonLDSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'mainEntityOfPage': {
          '@type': 'WebPage'
          // '@id': `${siteUrl}/blogs`
        },
        'headline': title,
        description,
        'image': {
          '@type': 'ImageObject',
          'url': image.file.url
        }
      };
      return jsonLDSchema;
    }
  },
  Person: {
    jsonLd: (person: any, _args: any, ctx: any) => {
      // const title = getLocalizedField(person.fields, 'name', ctx);
      // const description = getLocalizedField(person.fields, 'promoSummary', ctx);
      const jsonLDSchema = {
        // '@context': 'https://schema.org',
        // '@type': 'BlogPosting',
        // 'mainEntityOfPage': {
        //   '@type': 'WebPage'
        //   // '@id': `${siteUrl}/blogs`
        // },
        // 'headline': title,
        // description,
        // 'image': {
        //   '@type': 'ImageObject'
        //   // url: image
        // }
      };
      return jsonLDSchema;
    }
  }
};
