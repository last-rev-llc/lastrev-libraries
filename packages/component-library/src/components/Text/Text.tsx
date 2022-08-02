/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';

import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import BLOCKS from './BLOCKS';
import INLINES from './INLINES';
import ErrorBoundary from '../ErrorBoundary';
import ContentModule from '../ContentModule';

import { TextLinks, TextProps } from './Text.types';
import sidekick from '@last-rev/contentful-sidekick-util';

const keyBy = (key: string, xs: any[]) => xs.filter(Boolean).reduce((acc, x) => ({ ...acc, [x[key]]: x }), {});

// TODO: Move body XSS to data layer

const isHTML = (x?: any) => x?.includes && x?.includes('<');
const isCmp = (child?: any): any => !!child?.type && typeof child?.type !== 'string';
const containsHTML = (children?: any) => children?.some((child: any) => isHTML(child) || isCmp(child));

const renderTypography =
  ({
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
  (node: any, children: any) => {
    if (children?.length === 1 && children[0] === '') {
      return <br />;
    }
    if (containsHTML(children)) {
      const hasEmbed = node?.content?.some((child: any) => child.nodeType?.includes('embedded'));
      return (
        // Use div as Typograph to use the correct styles and avoid invalid DOM nesting when there embedded entries
        <Typography variant={variant} {...(hasEmbed && { component: 'span' })} data-testid={`Text-${variant}`}>
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
        </Typography>
      );
    }

    return (
      <>
        <Typography variant={variant} data-testid={`Text-${variant}`}>
          {children}
        </Typography>
      </>
    );
  };

const createRenderOptions = ({ links, renderNode, renderText }: { links?: TextLinks } & Options) => {
  const entries = keyBy('id', links?.entries ?? []);
  const assets = keyBy('id', links?.assets ?? []);

  return {
    renderNode: {
      [INLINES.HYPERLINK]: (_: any, children: any) => {
        return (
          <ContentModule __typename="Link" href={_.data.uri} data-testid={`Text-${INLINES.HYPERLINK}`}>
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
            data-testid="Text-asset-hyperlink"
          >
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
          <EmbeddedRoot component="span" sx={{ display: 'block' }} data-testid={`Text-${BLOCKS.EMBEDDED_ENTRY}`}>
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
      ...renderNode
    },
    // Adds ability to override renderText through options
    renderText: (text: any) => {
      if (renderText) return renderText(text);

      return text;
    }
  };
};

function Text({ body, align, styles, variant, sidekickLookup, sx, renderNode, renderOptions, ...props }: TextProps) {
  return (
    <ErrorBoundary>
      <Root
        {...sidekick(sidekickLookup)}
        variant={variant}
        sx={{ textAlign: align, ...sx, ...styles?.root }}
        data-testid="Text-root"
        {...props}
      >
        {documentToReactComponents(
          body?.json,
          createRenderOptions({ links: body?.links, renderNode, ...renderOptions })
        )}
      </Root>
    </ErrorBoundary>
  );
}

// Support for \n in text
const Root = styled(Box, {
  name: 'Text',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>`
  white-space: pre-wrap;
`;

const EmbeddedRoot = styled(Box, {
  name: 'Text',
  slot: 'EmbeddedRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.embeddedRoot]
})<{ variant?: string }>(() => ({}));

const InlineRoot = styled(Box, {
  name: 'Text',
  slot: 'InlineRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.inlineRoot]
})<{ variant?: string }>(() => ({}));

const TableRoot = styled(TableContainer, {
  name: 'Text',
  slot: 'TableRoot',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.tableRoot]
})<{ variant?: string }>(() => ({}));

export default Text;
