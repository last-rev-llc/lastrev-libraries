import { ApolloContext, Mappers } from '@last-rev/types';
import { Entry } from 'contentful';

export const mappers: Mappers = {
  RichText: {
    RichText: {
      json: async (raw: any) => raw,
      links: async (raw: any, _args: any, ctx: ApolloContext) => {
        const entriesLinks = new Map();
        const assetsLinks = new Map();
        const entryHyperlinks = new Set();
        const collectLinks = (node: any) => {
          const {
            data: { target },
            nodeType,
            content
          } = node;
          // DFS collect children links
          if (content?.length) {
            content.forEach(collectLinks);
          }

          if (target?.sys?.type === 'Link') {
            if (nodeType === 'entry-hyperlink') {
              entryHyperlinks.add(target?.sys?.id);
            }

            if (target?.sys?.linkType === 'Entry') {
              entriesLinks.set(target?.sys?.id, target);
            } else if (target?.sys?.linkType === 'Asset') {
              assetsLinks.set(target?.sys?.id, target);
            }
          }
        };

        collectLinks(raw);

        const [entries, assets] = await Promise.all([
          ctx.loaders.entryLoader.loadMany(
            Array.from(entriesLinks.keys()).map((id) => ({ id, preview: !!ctx.preview }))
          ),
          ctx.loaders.assetLoader.loadMany(Array.from(assetsLinks.keys()).map((id) => ({ id, preview: !!ctx.preview })))
        ]);

        // Loop through entries and if included in hyperlinks will change type to a "Link" to utilize mappers for that type
        const tidiedEntries = await entries.map(async (entry: Entry<any> | Error | null) => {
          if (!entry) return entry;

          const id = (entry as any)?.sys?.id;

          if (entryHyperlinks.has(id)) {
            // @ts-ignore
            entry.__typename = 'Link';
          }

          return entry;
        });

        return {
          entries: [...tidiedEntries],
          assets
        };
      }
    }
  }
};