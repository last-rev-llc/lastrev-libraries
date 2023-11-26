/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import dynamic from 'next/dynamic';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const TableContainer = dynamic(() => import('@mui/material/TableContainer'));
const Table = dynamic(() => import('@mui/material/Table'));
const TableHead = dynamic(() => import('@mui/material/TableHead'));
const TableBody = dynamic(() => import('@mui/material/TableBody'));
const TableRow = dynamic(() => import('@mui/material/TableRow'));
const TableCell = dynamic(() => import('@mui/material/TableCell'));

import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import BLOCKS from './BLOCKS';
import INLINES from './INLINES';

import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import type { RichTextProps } from './RichText.types';
import sidekick from '@last-rev/contentful-sidekick-util';
import { RichTextLinks } from '../../../graphql-sdk/src/types';
import { MARKS } from './ReactRichTextRenderer';
import { Box } from '@mui/material';

const keyBy = (key: string, xs: any[]) => xs.filter(Boolean).reduce((acc, x) => ({ ...acc, [x[key]]: x }), {});

// TODO: Move body XSS to data layer

const isHTML = (x?: any) => x?.includes && x?.includes('<');
const isCmp = (child?: any): any => !!child?.type && typeof child?.type !== 'string';
const containsHTML = (children?: any) => children?.some((child: any) => isHTML(child) || isCmp(child));

const renderTypography = ({
  variant
}: {
  variant:
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'overline'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | undefined;
}) =>
  function RichTextTypography(node: any, children: any) {
    if (children?.length === 1 && children[0] === '') {
      return <br />;
    }
    if (containsHTML(children)) {
      const hasEmbed = node?.content?.some((child: any) => child.nodeType?.includes('embedded'));
      return (
        // Use div as Typograph to use the correct styles and avoid invalid DOM nesting when there embedded entries
        <TypographyRoot
          id={node.data.id}
          variant={variant}
          {...(hasEmbed && { component: 'span' })}
          data-testid={`Text-${variant}`}>
          {children.map((child: any) => {
            if (isHTML(child)) {
              return (
                <Typography
                  component="span"
                  variant={variant}
                  data-testid={`Text-html-${variant}`}
                  dangerouslySetInnerHTML={{ __html: child }}
                />
              );
            }
            return child;
          })}
        </TypographyRoot>
      );
    }

    return (
      <>
        <TypographyRoot id={node.data.id} variant={variant} data-testid={`Text-${variant}`}>
          {children}
        </TypographyRoot>
      </>
    );
  };

const createRenderOptions = ({ links, renderNode, renderMark, renderText }: { links?: RichTextLinks } & Options) => {
  const entries = keyBy('id', links?.entries ?? []);
  const assets = keyBy('id', links?.assets ?? []);

  return {
    renderNode: {
      [INLINES.HYPERLINK]: (node: any, children: any) => {
        return (
          <ContentModule __typename="Link" href={node.data.uri} data-testid={`Text-${INLINES.HYPERLINK}`}>
            {children}
          </ContentModule>
        );
      },
      [INLINES.ENTRY_HYPERLINK]: (node: any) => {
        const id: string = node?.data?.target?.sys?.id;
        const entry = entries[id];
        const content = node?.content[0]?.value;

        return <ContentModule {...entry} data-testid={`Texts-${INLINES.ENTRY_HYPERLINK}`} text={content} />;
      },
      [INLINES.ASSET_HYPERLINK]: (node: any, children: any) => {
        const id: string = node?.data?.target?.sys?.id;
        const entry = assets[id];
        return (
          <ContentModule
            __typename="Link"
            href={entry?.file?.url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="Text-asset-hyperlink">
            {children}
          </ContentModule>
        );
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const id: string = node?.data?.target?.sys?.id;
        const entry = assets[id];
        return <ContentModule {...entry} testId={`Text-${BLOCKS.EMBEDDED_ASSET}`} />;
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        const id: string = node?.data?.target?.sys?.id;
        const entry = entries[id];
        return (
          <EmbeddedRoot
            component="span"
            sx={{ display: 'block', mt: 1, mb: 1 }}
            data-testid={`Text-${BLOCKS.EMBEDDED_ENTRY}`}>
            <ContentModule {...entry} />
          </EmbeddedRoot>
        );
      },
      [INLINES.EMBEDDED_ENTRY]: (node: any) => {
        const id: string = node?.data?.target?.sys?.id;
        const entry = entries[id];
        return (
          <InlineRoot component="span" sx={{ display: 'inline' }} data-testid={`Text-${INLINES.EMBEDDED_ENTRY}`}>
            <ContentModule {...entry} />
          </InlineRoot>
        );
      },
      [BLOCKS.PARAGRAPH]: renderTypography({ variant: 'body1' }),
      [BLOCKS.HEADING_1]: renderTypography({ variant: 'h1' }),
      [BLOCKS.HEADING_2]: renderTypography({ variant: 'h2' }),
      [BLOCKS.HEADING_3]: renderTypography({ variant: 'h3' }),
      [BLOCKS.HEADING_4]: renderTypography({ variant: 'h4' }),
      [BLOCKS.HEADING_5]: renderTypography({ variant: 'h5' }),
      [BLOCKS.HEADING_6]: renderTypography({ variant: 'h6' }),
      [BLOCKS.TABLE]: (node: any, children: any) => {
        let header;

        // Native contentful support
        if (node.content[0].nodeType === 'table-row') {
          if (node.content[0].content[0].nodeType === 'table-header-cell') {
            header = children[0];
            children = children.slice(1);
          }
        }

        return (
          <TableRoot>
            <Table>
              <TableHead>{header ? header : null}</TableHead>
              <TableBody>{children}</TableBody>
            </Table>
          </TableRoot>
        );
      },
      [BLOCKS.TABLE_HEADER_CELL]: (_: any, children: any) => {
        return <TableCell>{children}</TableCell>;
      },
      [BLOCKS.TABLE_ROW]: (_: any, children: any) => {
        return <TableRow>{children}</TableRow>;
      },
      [BLOCKS.TABLE_CELL]: (_: any, children: any) => {
        return <TableCell>{children}</TableCell>;
      },
      // [BLOCKS.UL_LIST]: (node: any, children: any) => {
      //   return <UnorderedList variant={node?.data?.variant}>{children}</UnorderedList>;
      // },
      ...renderNode
    },
    // Adds ability to override renderText through options
    renderText: (text: any) => {
      if (renderText) return renderText(text);

      return text;
    },
    renderMark: {
      // [MARKS.COLOR]: (text: any, { value }: Mark) => (
      //   <Box
      //     component="span"
      //     color={(theme) =>
      //       value && theme.palette[value as keyof Palette]
      //         ? (theme.palette[value as keyof Palette] as PaletteColor).main
      //         : undefined
      //     }>
      //     {text}
      //   </Box>
      // ),
      // [MARKS.TYPOGRAPHY]: (text: any, mark: any) => (
      //   <Typography component="span" variant={mark.value}>
      //     {text}
      //   </Typography>
      // ),
      [MARKS.HIGHLIGHT]: (text: any) => <mark>{text}</mark>,
      ...renderMark
    }
  };
};

const RichText = ({
  body,
  align,
  variant,
  sidekickLookup,
  sx,
  renderNode,
  renderMark,
  renderOptions,
  ...props
}: RichTextProps) => {
  return (
    <ErrorBoundary>
      <Root
        {...sidekick(sidekickLookup)}
        variant={variant}
        // sx={{ textAlign: align, ...sx, ...styles?.root }} // TODO
        data-testid="RichText-root"
        {...props}>
        {documentToReactComponents(
          body?.json,
          createRenderOptions({ links: body?.links, renderNode, renderMark, ...renderOptions })
        )}
      </Root>
    </ErrorBoundary>
  );
};

const Root = styled('div', {
  name: 'RichText',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'ownerState',
  overridesResolver: (_, styles) => [styles.root, styles.richTextContent]
})<{ variant?: string }>`
  white-space: pre-wrap;
  display: contents;
`;
const TypographyRoot = styled(Typography, {
  name: 'Text',
  slot: 'TypographyRoot',
  overridesResolver: (_, styles) => [styles.typographyRoot]
})(() => ({
  b: {
    '.MuiTypography-root, .MuiTypography-root *': {
      fontWeight: 700
    }
  }
}));
const EmbeddedRoot = styled('div', {
  name: 'RichText',
  slot: 'EmbeddedRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.embeddedRoot]
})<{ variant?: string }>``;

const InlineRoot = styled('span', {
  name: 'RichText',
  slot: 'InlineRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.inlineRoot]
})<{ variant?: string }>``;

const TableRoot = styled(TableContainer, {
  name: 'RichText',
  slot: 'TableRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.tableRoot]
})<{ variant?: string }>``;

export default RichText;
