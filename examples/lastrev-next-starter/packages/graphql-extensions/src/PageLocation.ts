import gql from 'graphql-tag';
import { ContentfulLoaders, ContentfulPathsConfigs, ContentfulPathsGenerator } from '@last-rev/graphql-contentful-core';
import { get, has } from 'lodash';

// export const typeMappings = {
//   landingPage: 'page'
// };

// export const mappers = {
//   Page: {
//     Page: {
//       contents: 'sections'
//     }
//   }
// };

export const typeDefs = gql`
  extend type PageLocation {
    locationCategory: [CategoryLocationType]
  }
`;

// const pageLocation: ContentfulPathsGenerator = async (
//   resolvedItem: any,
//   loaders: ContentfulLoaders,
//   defaultLocale: string,
//   _locales: string[],
//   preview: boolean = false,
//   site?: string
// ) => {
//   const id = resolvedItem.sys.id;

//   let path = `/${resolvedItem.fields.slug[defaultLocale]}`;

//   if (!!resolvedItem.fields.hideFromWeb[defaultLocale]) {
//     return {};
//   }

//   if (
//     site &&
//     resolvedItem.fields.targetedSites?[defaultLocale] &&
//     resolvedItem.fields.targetedSites?[defaultLocale].indexOf(site) === -1
//   ) {
//     return {};
//   }

//   if (!path) return {};

//   let topItem = resolvedItem;

//   while (topItem && topItem.fields.parentLocation[defaultLocale]) {
//     topItem = await loaders.entryLoader.load({ id: topItem.sys.id, preview });

//     if (topItem) {
//       if (!!topItem.fields.hideFromWeb[defaultLocale]) {
//         return {};
//       }
//       if (
//         site &&
//         topItem.fields.targetedSites?[defaultLocale] &&
//         topItem.fields.targetedSites?[defaultLocale].indexOf(site) === -1
//       ) {
//         return {};
//       }
//       path = `/${topItem.fields.slug[defaultLocale]}${path}`;
//     }
//   }

//   path = `/locations${path}`;

//   return {
//     [path]: id
//   };
// };

const pageGeneral: ContentfulPathsGenerator = async (
  resolvedItem: any,
  loaders: ContentfulLoaders,
  defaultLocale: string,
  _locales: string[],
  preview: boolean = false,
  site?: string
) => {
  const id = resolvedItem.sys.id;

  const slug = get(resolvedItem, ['fields', 'slug', defaultLocale]);

  if (!slug) return {};

  let path = `/${slug}`;

  if (!!get(resolvedItem, ['fields', 'hideFromWeb', defaultLocale], false)) {
    return {};
  }

  if (
    site &&
    has(resolvedItem, ['fields', 'siteTarget', defaultLocale]) &&
    get(resolvedItem, ['fields', 'siteTarget', defaultLocale]).indexOf(site) === -1
  ) {
    return {};
  }

  let topItem = resolvedItem;

  while (topItem && has(topItem, ['fields', 'parentPage', defaultLocale])) {
    topItem = await loaders.entryLoader.load({
      id: get(topItem, ['fields', 'parentPage', defaultLocale]).sys.id,
      preview
    });

    if (topItem) {
      if (!!get(topItem, ['fields', 'hideFromWeb', defaultLocale], false)) {
        return {};
      }
      if (
        (site &&
          has(topItem, ['fields', 'siteTarget', defaultLocale]) &&
          get(topItem, ['fields', 'siteTarget', defaultLocale]).indexOf(site) === -1) ||
        !has(topItem, ['fields', 'slug', defaultLocale])
      ) {
        return {};
      }
      path = `/${get(topItem, ['fields', 'slug', defaultLocale])}${path}`;
    }
  }

  return {
    [path]: id
  };
};

export const pathsConfigs: ContentfulPathsConfigs = {
  pageGeneral
};
