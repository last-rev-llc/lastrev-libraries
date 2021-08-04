/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Box from '@material-ui/core/Box';
import styled from '@material-ui/system/styled';
import Typography from '@material-ui/core/Typography';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { SystemCssProperties } from '@material-ui/system/styleFunctionSx';
import keyBy from 'lodash/fp/keyBy';
import Link from '../Link';
import ContentModule from '../ContentModule';
import sidekick from '../../utils/sidekick';

interface Content {
  __typename: string;
  id: string;
}

export interface TextProps {
  id?: string;
  styles?: {
    root?: SystemCssProperties;
  };
  body: RichText;
  sidekickLookup?: any;
  color?: string;
  variant?: string;
  align?: 'left' | 'center' | 'right' | undefined;
}

interface TextLinks {
  entries: Array<Content>;
  assets: Array<Content>;
}
export interface RichText {
  json: any;
  links: TextLinks;
}

const renderText =
  (
    {
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
        | 'body2'
        | undefined;
    },
    {
      color
    }: {
      color:
        | 'inherit'
        | 'initial'
        | 'primary'
        | 'secondary'
        | 'tertiary'
        | 'quartiary'
        | 'pink'
        | 'white'
        | 'error'
        | 'gradient-primary'
        | 'textPrimary'
        | 'textSecondary'
        | undefined;
    }
  ) =>
  (_: any, children: any) => {
    console.log('Render', { children, variant });
    if (children?.length == 1 && children[0] === '') {
      return <br />;
    }
    return (
      <>
        <Typography variant={variant} color={color}>
          {children}
        </Typography>
      </>
    );
  };

const renderOptions = ({ links }: { links: TextLinks }) => {
  console.log('Text: links', links);
  const entries = keyBy('id', links?.entries ?? []);
  // const assets = keyBy('id', links.assets);

  return {
    renderNode: {
      [INLINES.HYPERLINK]: (_: any, children: any) => {
        return (
          <Link
            href={_.data.uri}
            // target={!data?.uri.startsWith('/') && !data?.uri.includes('strong365.com') ? '_blank' : false}
            // className={styles.link}
          >
            {children}
          </Link>
        );
      },
      // [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      //   const id: string = node?.data?.target?.sys?.id;
      //   const entry = assets[id];
      //   return <Media {...entry} />;
      // },
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        const id: string = node?.data?.target?.sys?.id;
        const entry = entries[id];
        return (
          <Box sx={{ py: 2 }}>
            <ContentModule {...entry} />
          </Box>
        );
      },
      [INLINES.EMBEDDED_ENTRY]: (node: any) => {
        const id: string = node?.data?.target?.sys?.id;
        const entry = entries[id];
        console.log('Embed', node, id, entry);
        return <ContentModule {...entry} />;
      },
      [BLOCKS.PARAGRAPH]: renderText({ variant: 'body1' }),
      [BLOCKS.PARAGRAPH]: renderText({ variant: 'body2' }),
      [BLOCKS.HEADING_1]: renderText({ variant: 'h1' }),
      [BLOCKS.HEADING_2]: renderText({ variant: 'h2' }),
      [BLOCKS.HEADING_3]: renderText({ variant: 'h3' }),
      [BLOCKS.HEADING_4]: renderText({ variant: 'h4' }),
      [BLOCKS.HEADING_5]: renderText({ variant: 'h5' }),
      [BLOCKS.HEADING_6]: renderText({ variant: 'h6' })
    }
  };
};

function Text({ body, align = 'left', styles, variant, sidekickLookup }: TextProps) {
  // const { sidekicker } = sidekickInit({ _id, _contentTypeId, internalTitle });
  console.log('Text', { body });
  return (
    <Root {...sidekick(sidekickLookup)} variant={variant} sx={{ ...styles?.root, textAlign: align }}>
      {documentToReactComponents(body?.json, renderOptions({ links: body?.links }))}
    </Root>
  );
}

// RichText.propTypes = RichTextPropTypes;
// RichText.defaultProps = {};

const Root = styled(Box, {
  name: 'Text',
  slot: 'Root',
  shouldForwardProp: (prop) => prop !== 'variant',
  overridesResolver: (_, styles) => ({
    ...styles.root
  })
})<{ variant?: string }>(() => ({}));

export default Text;
