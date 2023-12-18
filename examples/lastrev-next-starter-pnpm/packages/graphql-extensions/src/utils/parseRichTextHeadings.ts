import { BLOCKS, Block, Document, Inline, Node, Text } from '@contentful/rich-text-types';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';

interface Heading {
  nodeType: string;
  text: string;
}

export const parseRichTextHeadings = (richTextContent: Document): Heading[] => {
  const headings: Heading[] = [];

  const extractHeadings = (node: Block | Inline | Text) => {
    if (node.nodeType === BLOCKS.HEADING_1 || node.nodeType === BLOCKS.HEADING_2) {
      const text = documentToPlainTextString(node);
      headings.push({ nodeType: node.nodeType, text });
    }

    if ('content' in node && node.content) {
      node.content.forEach(extractHeadings);
    }
  };

  if (richTextContent && richTextContent.content) {
    richTextContent.content.forEach(extractHeadings);
  }

  return headings;
};

export default parseRichTextHeadings;
