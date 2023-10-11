import type { PathRuleConfig } from '@last-rev/types';

export const pathsConfigs: PathRuleConfig = {
  page: {
    rules: [
      { rule: '/:parentPage(page).slug/:slug' },
      { rule: '/:slug' }
      // { rule: '/:__segment__(1).parentPage(page).slug/:parentPage(page).slug/:slug' }
    ],
    // this is a special rule telling us that the root page of the site is a
    // "page" content item, whose "slug" field has the value "/".
    // this bypasses the bulk of the rules engine during bidirectional lookups
    root: { field: 'slug', value: '/' }
    // filter: async ({
    //   pathEntries,
    //   ctx,
    //   matchedRule,
    //   site
    // }: PathFilerFunctionArgs) => {
    //   const item = pathEntries[pathEntries.length - 1]; // The last path segment represents the page we are on.
    //   const excludedLocales = getLocalizedField(item?.fields, 'excludedLocales', ctx) || [];
    //   const targetedSites = getLocalizedField(item?.fields, 'targetedSites', ctx) || [];
    //   // only returns true if the current site is in the targetedSites field
    //   // and the current locale is not in the excludedLocales field
    //   return !excludedLocales.includes(ctx.locale) && targetedSites.includes(site);
    // }
  },
  person: {
    rules: [
      { rule: '/:parentPage(page).slug/:slug' },
      { rule: '/:slug' }
      // { rule: '/:__segment__(1).parentPage(page).slug/:parentPage(page).slug/:slug' }
    ]
    // this is a special rule telling us that the root page of the site is a
    // "page" content item, whose "slug" field has the value "/".
    // this bypasses the bulk of the rules engine during bidirectional lookups
    // root: { field: 'slug', value: '/' },
    // filter: async ({
    //   pathEntries,
    //   ctx,
    //   matchedRule,
    //   site
    // }: PathFilerFunctionArgs) => {
    //   const item = pathEntries[pathEntries.length - 1]; // The last path segment represents the page we are on.
    //   const excludedLocales = getLocalizedField(item?.fields, 'excludedLocales', ctx) || [];
    //   const targetedSites = getLocalizedField(item?.fields, 'targetedSites', ctx) || [];
    //   // only returns true if the current site is in the targetedSites field
    //   // and the current locale is not in the excludedLocales field
    //   return !excludedLocales.includes(ctx.locale) && targetedSites.includes(site);
    // }
  },
  blog: {
    rules: [
      { rule: '/:parentPage(page).slug/:slug' },
      { rule: '/:slug' }
      // { rule: '/:__segment__(1).parentPage(page).slug/:parentPage(page).slug/:slug' }
    ]
    // this is a special rule telling us that the root page of the site is a
    // "page" content item, whose "slug" field has the value "/".
    // this bypasses the bulk of the rules engine during bidirectional lookups
    // root: { field: 'slug', value: '/' },
    // filter: async ({
    //   pathEntries,
    //   ctx,
    //   matchedRule,
    //   site
    // }: PathFilerFunctionArgs) => {
    //   const item = pathEntries[pathEntries.length - 1]; // The last path segment represents the page we are on.
    //   const excludedLocales = getLocalizedField(item?.fields, 'excludedLocales', ctx) || [];
    //   const targetedSites = getLocalizedField(item?.fields, 'targetedSites', ctx) || [];
    //   // only returns true if the current site is in the targetedSites field
    //   // and the current locale is not in the excludedLocales field
    //   return !excludedLocales.includes(ctx.locale) && targetedSites.includes(site);
    // }
  }
  // blogPost: {
  //   rules: [{ rule: '/blogs/:slug' }, { rule: '/blogs/:categories(category).slug/:slug' }],
  //   filter: async ({ pathEntries, ctx, matchedRule, site }) => {
  //     return site === 'SITE_B';
  //   }
  // }
};
