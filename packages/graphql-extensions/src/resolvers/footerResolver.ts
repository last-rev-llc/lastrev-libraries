import { ApolloContext } from '@last-rev/types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';

const SITE_ID = process.env.DEFAULT_SITE_ID;

const footerResolver = async (page: any, _args: any, ctx: ApolloContext) => {
    const footer: any = getLocalizedField(page?.fields, 'footer', ctx);
  
    if (footer) return footer
    
    // TODO Improve redirecting to a field inside a referenced field
    const siteRef: any = getLocalizedField(page.fields, 'site', ctx);
    const site = await ctx.loaders.entryLoader.load({ id: siteRef?.sys?.id ?? SITE_ID, preview: !!ctx.preview });
    const siteFooter: any = getLocalizedField(site?.fields, 'footer', ctx);
  
    
    return siteFooter;
  };

  export default footerResolver;