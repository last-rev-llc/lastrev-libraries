import type { Mappers } from '@last-rev/types';
import type { ApolloContext } from './types';
import type { Entry, RichTextContent } from 'contentful';
import { FilterXSS } from 'xss';
import { isHTML } from './utils/isHTML';

const ALLOWED_TAGS = ['div', 'span'];
const ALLOWED_ATTRIBUTES = ['id', 'style'];
const bodyXSS = new FilterXSS({
  whiteList: { ...ALLOWED_TAGS.reduce((accum, key) => ({ ...accum, [key]: ALLOWED_ATTRIBUTES }), {}) },
  // stripIgnoreTagBody: ['script'],
  css: false
});

// const __html = React.useMemo(() => bodyXSS.process(children), [children]);
export const mappers: Mappers = {
  RichText: {
    RichText: {
      json: async (raw: RichTextContent) => {
        let sanitized = raw; // Sanitize RichText Contentful JSOn
        // It will add extra empty lines almost all the times
        const { content } = sanitized;
        if (content) {
          const last = content[content.length - 1];
          if (
            last?.nodeType === 'paragraph' &&
            last.content &&
            last.content.length == 1 &&
            last.content[0].value == ''
          ) {
            content.pop();
          }
          sanitized = {
            ...sanitized,
            content
          };
        }
        const traverseRichText = (node: any) => {
          // DFS collect children links
          if (node?.content?.length) {
            node.content.forEach(traverseRichText);
          }
          if (isHTML(node?.value)) {
            node.value = bodyXSS.process(node.value);
          }
        };

        traverseRichText(sanitized);
        return raw;
      },
      links: async (raw: any, _args: any, ctx: ApolloContext) => {
        const entriesLinks = new Map();
        const assetsLinks = new Map();
        const entryHyperlinks = new Set();
        const traverseRichText = (node: any) => {
          const { data, nodeType, content } = node;
          const target = data?.target;
          // DFS collect children links
          if (content?.length) {
            content.forEach(traverseRichText);
          }

          if (target?.sys?.type === 'Link') {
            if (nodeType === 'entry-hyperlink') {
              entryHyperlinks.add(target?.sys?.id);
            }
            if (nodeType === 'asset-hyperlink') {
              entryHyperlinks.add(target?.sys?.id);
            }

            if (target?.sys?.linkType === 'Entry') {
              entriesLinks.set(target?.sys?.id, target);
            } else if (target?.sys?.linkType === 'Asset') {
              assetsLinks.set(target?.sys?.id, target);
            }
          }
        };

        traverseRichText(raw);

        const [entries, assets] = await Promise.all([
          ctx.loaders.entryLoader.loadMany(
            Array.from(entriesLinks.keys()).map((id) => ({ id, preview: !!ctx.preview }))
          ),
          ctx.loaders.assetLoader.loadMany(Array.from(assetsLinks.keys()).map((id) => ({ id, preview: !!ctx.preview })))
        ]);

        // Loop through entries and if included in hyperlinks will change type to a "Link" to utilize mappers for that type
        const tidiedEntries = await entries.filter(Boolean).map(async (entry: Entry<any> | Error | null) => {
          if (!entry) return entry;

          const id = (entry as any)?.sys?.id;

          if (entryHyperlinks.has(id)) {
            return {
              ...entry,
              __typename: 'Link'
            };
          }

          return entry;
        });

        return {
          entries: [...tidiedEntries].filter(Boolean),
          assets: assets.filter(Boolean)
        };
      }
    }
  }
};
