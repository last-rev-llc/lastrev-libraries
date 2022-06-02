import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Block, Inline, BLOCKS, Document, Text } from '@contentful/rich-text-types';

type AlgoliaRichTextContent = {
  section?: string;
  content: string;
};

type RichTextParseConfig = {
  sectionDelimiter: BLOCKS.HEADING_2;
};

const parseNode = (node: Block | Inline | Text, results: AlgoliaRichTextContent[], config: RichTextParseConfig) => {
  let section: string = '';

  const stack: (Block | Inline | Text)[] = [];

  stack.push(node);

  while (stack.length > 0) {
    // Get the next node to search.
    const node = stack.pop() as Block | Inline | Text;

    let content: string | undefined;

    if (node.nodeType === config.sectionDelimiter) {
      // if (contents.length) {
      //   results.push({ section, contents });
      //   contents = [];
      // }
      const textString = documentToPlainTextString(node);
      section = textString;
    } else if (node.nodeType === BLOCKS.DOCUMENT) {
      stack.push(...node.content.reverse());
    } else if (node.nodeType === 'text') {
      // node.value?.length && contents.push(node.value);
      if (node.value?.length) {
        content = node.value;
      }
    } else {
      const text = documentToPlainTextString(node);
      // text?.length && contents.push(text);
      if (text?.length) {
        content = text;
      }
    }

    if (content) {
      results.push({ section, content });
    }
  }

  // if (contents.length) {
  //   results.push({ section, contents });
  // }
};

const parseRichTextField = (richText: Document | undefined, config: RichTextParseConfig) => {
  if (!richText) return [];
  const results: AlgoliaRichTextContent[] = [];
  parseNode(richText, results, config);

  return results;
};

export default parseRichTextField;
