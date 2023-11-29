import gql from 'graphql-tag';
import type { Mappers } from '@last-rev/types';
import type { ApolloContext } from './types';
import { createRichText, getLocalizedField } from '@last-rev/graphql-contentful-core';

import { pageFooterResolver } from './utils/pageFooterResolver';
import { pageHeaderResolver } from './utils/pageHeaderResolver';
import { pathResolver } from './utils/pathResolver';
import { breadcrumbsResolver } from './utils/breadcrumbsResolver';
import { createType } from './utils/createType';
import { resolveLocalizedField } from './utils/resolveLocalizedField';
import { featuredAssetsResolver } from './utils/featuredAssetsResolver';
import { Asset } from 'contentful';

export const typeDefs = gql`
  extend type PageProperty {
    header: Header
    footer: Footer
    path: String
    body: RichText
    socialLinks: [Link]
    mainImage: Media
    breadcrumbs: [Link]
    hero: Content
    featuredAssets: Collection
    imageCarousel: Collection
  }
`;

export const mappers: Mappers = {
  PageProperty: {
    PageProperty: {
      path: pathResolver,
      header: pageHeaderResolver,
      footer: pageFooterResolver,
      breadcrumbs: breadcrumbsResolver,
      imageCarousel: async (property: any, _args: any, ctx: ApolloContext) => {
        const images: any = (await resolveLocalizedField(property.fields, 'images', ctx)) ?? [];
        if (!images?.length) return null;

        const mediaItems = images.map((mediaItem: Asset) => {
          const mediaUrl = getLocalizedField(mediaItem.fields, 'file', ctx)?.url;
          const linkHref = mediaUrl?.startsWith('//') ? `https:${mediaUrl}` : mediaUrl;
          return createType('Card', {
            media: [mediaItem],
            link: linkHref ? createType('Link', { id: property.id, href: linkHref, target: 'New Window' }) : null
          });
        });

        const mediaItemsLength = mediaItems?.length;

        return createType('Collection', {
          introText: createType('Text', { title: 'Property Gallery' }),
          items: mediaItems,
          carouselBreakpoints: ['Mobile', 'Tablet', 'Desktop'],
          variant: mediaItemsLength <= 2 ? 'twoPerRow' : 'threePerRow',
          itemsVariant: 'media',
          itemsAspectRatio: 'horizontal',
          backgroundColor: 'white'
        });
      },

      featuredAssets: async (property: any, args: any, ctx: ApolloContext) => {
        const items = await featuredAssetsResolver(property, args, ctx);

        const itemsLength = items?.length;

        if (!itemsLength) return null;

        return createType('Collection', {
          introText: createType('Text', { title: 'Featured Case Studies' }),
          items,
          variant: itemsLength <= 2 ? 'twoPerRow' : 'fourPerRow',
          itemsVariant: 'hover',
          itemsAspectRatio: 'horizontal',
          backgroundColor: 'navy',
          inheritTopBGOverlap: true,
          prevBgColor: 'white'
        });
      },

      hero: async (property: any, _args: any, ctx: ApolloContext) =>
        createType('Hero', {
          variant: 'mediaOnRightFullBleed',
          backgroundColor: 'navy',
          title: getLocalizedField(property.fields, 'name', ctx),
          sideImageItems: [getLocalizedField(property.fields, 'mainImage', ctx)]
        })
    },

    Link: {
      text: 'name',
      href: pathResolver
    },

    NavigationItem: {
      text: 'name',
      href: pathResolver
    },

    Card: {
      title: 'name',

      body: async (property: any, _args: any, ctx: ApolloContext) => {
        const promoSummary = getLocalizedField(property.fields, 'promoSummary', ctx);

        if (promoSummary) {
          return await createRichText(promoSummary);
        }
        return null;
      },

      media: async (property: any, _args: any, ctx: ApolloContext) => {
        const promoImage =
          getLocalizedField(property.fields, 'promoImage', ctx) ?? getLocalizedField(property.fields, 'mainImage', ctx);
        if (!promoImage) return null;
        return [promoImage];
      },

      variant: () => 'buttonText',

      link: async (property: any, _args: any, ctx: ApolloContext) => {
        return property;
      },

      actions: async (property: any, args: any, ctx: ApolloContext) => {
        const text = getLocalizedField(property.fields, 'promoLinkText', ctx) ?? 'Read More';
        return [
          createType('Link', {
            id: property.id,
            text,
            icon: 'logo',
            iconPosition: 'Left',
            href: await pathResolver(property, args, ctx),
            variant: 'buttonText'
          })
        ];
      }
    }
  }
};
