import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Document } from '@contentful/rich-text-types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import { Entry } from 'contentful';

const collectLinks = (node: any) => {
  const entriesLinks: any[] = [];
  const {
    data: { target },
    content
  } = node;
  // DFS collect children links
  if (content?.length) {
    content.forEach(collectLinks);
  }
  if (target?.sys?.type === 'Link' && target?.sys?.linkType === 'Entry') {
    entriesLinks.push(target);
  }
  return entriesLinks;
};

async function parseEntry(entry: any, ctx: ApolloContext) {
  if (!entry || !entry?.sys?.id) return '';
  switch (entry.sys.contentType.sys.id) {
    case 'section': {
      const contentIds = (getLocalizedField(entry.fields, 'contents', ctx) || []).map((c: Entry<any>) => c.sys.id);
      const loaded = await ctx.loaders.entryLoader.loadMany(
        contentIds.map((id: string) => ({ id, preview: !!ctx.preview }))
      );
      const parsed: string[] = await Promise.all(
        loaded.filter((l) => !!(l as Entry<any>)?.sys?.id).map((e) => parseEntry(e as Entry<any>, ctx))
      );
      return parsed.join(' ');
    }
    case 'text': {
      const body = getLocalizedField(entry.fields, 'body', ctx);
      return await parseRichTextField(body, ctx);
    }
    case 'table': {
      return getLocalizedField(entry.fields, 'table', ctx) || '';
    }
    default:
      return '';
  }
}

async function parseRichTextField(richText: Document | any | undefined, ctx: ApolloContext): Promise<string> {
  if (!richText) return '';

  const entriesLinks = collectLinks(richText);

  const entries = await ctx.loaders.entryLoader.loadMany(entriesLinks.map((id) => ({ id, preview: !!ctx.preview })));

  const entryVals = await Promise.all(entries.map(async (r) => parseEntry(r, ctx)));

  return [documentToPlainTextString(richText), ...entryVals].join(' ');
}

export default parseRichTextField;
