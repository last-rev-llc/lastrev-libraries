import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Document } from '@contentful/rich-text-types';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext } from '@last-rev/types';
import { Entry } from 'contentful';

const collectLinks = (node: any) => {
  let entriesLinks: any[] = [];
  const { content } = node;

  for (var i = 0; i < content?.length; i++) {
    if (content[i]?.data?.target?.sys?.type === 'Link' && content[i]?.data?.target?.sys?.linkType === 'Entry') {
      entriesLinks.push(content[i]?.data?.target?.sys?.id);
    } else if (Array.isArray(content[i].content)) {
      entriesLinks = entriesLinks.concat(collectLinks(content[i]));
    }
  }
  return entriesLinks;
};

async function parseEntry(entry: any, ctx: ApolloContext) {
  if (!entry || !entry?.sys?.id) return '';
  switch (entry.sys.contentType.sys.id) {
    case 'section': {
      const contentIds = (getLocalizedField(entry.fields, 'contents', ctx) || []).map((c: any) => c.sys.id);
      const loaded = await ctx.loaders.entryLoader.loadMany(
        contentIds.map((id: string) => ({ id, preview: !!ctx.preview }))
      );
      const parsed: string[] = await Promise.all(
        loaded.filter((l) => !!(l as any)?.sys?.id).map((e) => parseEntry(e as any, ctx))
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

async function parseRichTextField(richText: Document | any | undefined, ctx: ApolloContext): Promise<Array<string>> {
  if (!richText) return [''];

  const entriesLinks = collectLinks(richText);

  const entries = await ctx.loaders.entryLoader.loadMany(entriesLinks.map((id) => ({ id, preview: !!ctx.preview })));

  const entryVals = await Promise.all(entries.map(async (r) => parseEntry(r, ctx)));

  return [documentToPlainTextString(richText), ...entryVals];
}

export default parseRichTextField;
