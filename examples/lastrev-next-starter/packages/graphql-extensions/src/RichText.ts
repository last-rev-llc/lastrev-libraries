import { ApolloContext } from '@last-rev/graphql-contentful-core';

export const mappers = {
  RichText: {
    RichText: {
      json: async (raw: any) => raw,
      links: async (raw: any, _args: any, ctx: ApolloContext) => {
        const entriesLinks = new Map();
        const assetsLinks = new Map();
        const collectLinks = (node: any) => {
          const {
            data: { target },
            content
          } = node;
          // DFS collect children links
          if (content?.length) {
            content.forEach(collectLinks);
          }
          if (target?.sys?.type === 'Link') console.log(target?.sys, target?.sys?.id, node);
          if (target?.sys?.type === 'Link' && target?.sys?.linkType === 'Entry') {
            entriesLinks.set(target?.sys?.id, target);
          }
          if (target?.sys?.type === 'Link' && target?.sys?.linkType === 'Asset') {
            assetsLinks.set(target?.sys?.id, target);
          }
        };
        collectLinks(raw);
        console.log({ entriesLinks, assetsLinks });
        const [entries, assets] = await Promise.all([
          ctx.loaders.entryLoader.loadMany(
            Array.from(entriesLinks.keys()).map((id) => ({ id, preview: !!ctx.preview }))
          ),
          ctx.loaders.assetLoader.loadMany(Array.from(assetsLinks.keys()).map((id) => ({ id, preview: !!ctx.preview })))
        ]);
        return { entries, assets };
      }
    }
  }
};
