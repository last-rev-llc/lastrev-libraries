/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FilterXSS } from 'xss';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { SystemCssProperties } from '@mui/system/styleFunctionSx';
import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import Typography from '@mui/material/Typography';
import keyBy from 'lodash/fp/keyBy';
import ErrorBoundary from '../ErrorBoundary';
import Link from '../Link';
import ContentModule from '../ContentModule';
import Media, { MediaProps } from '../Media';
import sidekick from '../../utils/sidekick';

interface Content {
  __typename?: string;
  id: string;
}

export interface TextProps {
  __typename?: string;
  id?: string;
  styles?: {
    root?: SystemCssProperties;
  };
  sx?: SystemCssProperties;
  body: RichText;
  sidekickLookup?: any;
  variant?: string;
  align?: 'left' | 'center' | 'right' | undefined;
  renderNode?: any;
}

interface TextLinks {
  entries?: Array<Content>;
  assets?: Array<MediaProps>;
}
export interface RichText {
  json: any;
  links?: TextLinks;
}
const bodyXSS = new FilterXSS({
  whiteList: { div: ['id', 'style'] },
  css: false
});

const isHTML = (x?: any) => x?.includes && x?.includes('<');
const isCmp = (child?: any): any => !!child?.type && typeof child?.type !== 'string';
const containsHTML = (children?: any) => children?.some((child: any) => isHTML(child) || isCmp(child));

const renderText =
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
  (_: any, children: any) => {
    if (children?.length == 1 && children[0] === '') {
      return <br />;
    }
    if (containsHTML(children)) {
      return (
        <Typography variant={variant} data-testid={`Text-${variant}`}>
          {children.map((child: any) => {
            if (isHTML(child)) {
              return (
                <div
                  // We're passing the text through xss which should clean it up for us
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{ __html: bodyXSS.process(children) }}
                />
              );
            }
            if (isCmp(child)) {
              return child;
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

const renderOptions = ({ links, renderNode }: { links?: TextLinks; renderNode?: any }) => {
  const entries = keyBy('id', links?.entries ?? []);
  const assets = keyBy('id', links?.assets ?? []);

  return {
    renderNode: {
      [INLINES.HYPERLINK]: (_: any, children: any) => {
        return (
          <Link href={_.data.uri} data-testid={`Text-${INLINES.HYPERLINK}`}>
            {children}
          </Link>
        );
      },
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const id: string = node?.data?.target?.sys?.id;
        const entry = assets[id];
        return <Media {...entry} testId={`Text-${BLOCKS.EMBEDDED_ASSET}`} />;
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        const id: string = node?.data?.target?.sys?.id;
        const entry = entries[id];
        return (
          <Box sx={{ py: 2 }} data-testid={`Text-${BLOCKS.EMBEDDED_ENTRY}`}>
            <ContentModule {...entry} />
          </Box>
        );
      },
      [INLINES.EMBEDDED_ENTRY]: (node: any) => {
        const id: string = node?.data?.target?.sys?.id;
        const entry = entries[id];
        return (
          <Box sx={{ display: 'inline', px: 2 }} data-testid={`Text-${INLINES.EMBEDDED_ENTRY}`}>
            <ContentModule {...entry} />
          </Box>
        );
      },
      [BLOCKS.PARAGRAPH]: renderText({ variant: 'body1' }),
      [BLOCKS.HEADING_1]: renderText({ variant: 'h1' }),
      [BLOCKS.HEADING_2]: renderText({ variant: 'h2' }),
      [BLOCKS.HEADING_3]: renderText({ variant: 'h3' }),
      [BLOCKS.HEADING_4]: renderText({ variant: 'h4' }),
      [BLOCKS.HEADING_5]: renderText({ variant: 'h5' }),
      [BLOCKS.HEADING_6]: renderText({ variant: 'h6' }),
      ...renderNode
    }
  };
};

function Text({ body, align, styles, variant, sidekickLookup, sx, renderNode, ...props }: TextProps) {
  return (
    <ErrorBoundary>
      <Root
        {...sidekick(sidekickLookup)}
        variant={variant}
        sx={{ textAlign: align, ...sx, ...styles?.root }}
        data-testid="Text-root"
        {...props}
      >
        {documentToReactComponents(body?.json, renderOptions({ links: body?.links, renderNode }))}
      </Root>
    </ErrorBoundary>
  );
}

const Root = styled(Box, {
  name: 'Text',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => [styles.root]
})<{ variant?: string }>(() => ({}));

export default Text;
