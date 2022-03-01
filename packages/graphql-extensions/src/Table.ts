import gql from 'graphql-tag';
import { getLocalizedField } from '@last-rev/graphql-contentful-core';
import { ApolloContext, Mappers } from '@last-rev/types';
import { richTextFromMarkdown } from '@contentful/rich-text-from-markdown';
import { MarkdownNode } from '@contentful/rich-text-from-markdown/dist/types/types';

export const typeDefs = gql`
  extend type Table {
    richText: RichText
  }
`;

interface ImageNode extends MarkdownNode {
  alt: string;
  url: string;
  type: 'image';
}

export const mappers: Mappers = {
  Table: {
    Table: {
      richText: async (item: any, _args: any, ctx: ApolloContext) => {
        const tableValue: any = getLocalizedField(item.fields, 'table', ctx);
        if (tableValue) {
          const richTextMd = await richTextFromMarkdown(tableValue, ((node: MarkdownNode) => {
            // Render <br> tags
            if (node.type === 'html') {
              return  {
                nodeType: 'paragraph',
                data: {},
                content: [
                  {
                    nodeType: 'text',
                    value: '',
                    marks: [],
                    data: {}
                  }
                ]
              };
            }
            if (node.type === 'image') {
              const { alt, url, type } = node as ImageNode;
              return {
                nodeType: 'markdown-image',
                content: [],
                data: { alt, url, type }
              };
            }
            return null;
          }) as any);
          if (!richTextMd.content[0]) return;
          const [_title, headLimiter] = tableValue.trim().split('\n');
          if (headLimiter.includes('| ---')) {
            const table = richTextMd.content[0];
            if (table.nodeType === 'table') {
              const tableHead: any = table.content[0];
              tableHead.nodeType = 'table-header';
              tableHead.content.forEach((cell: any) => {
                cell.nodeType = 'table-header-cell';
              });
            }
          }
          return richTextMd;
        }
        return tableValue;
      }
    }
  }
};
