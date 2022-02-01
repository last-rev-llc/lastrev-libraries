import React from 'react';
import LRText, { TextProps } from '@last-rev/component-library/dist/components/Text/Text';
import Typography from '@mui/material/Typography';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import keyBy from 'lodash/keyBy';

const renderNodeOptions = ({ links }: { links?: any }) => {
  const entries = keyBy(links?.entries ?? [], 'id');
  const assets = keyBy(links?.assets ?? [], 'id');

  return {
      [BLOCKS.HEADING_2]: (node: any, children: any) => (
        <Typography id={node.data.id} variant="h2" data-scrollspy>
          {children}
        </Typography>
      ),
      [BLOCKS.HEADING_3]: (node: any, children: any) => (
        <Typography id={node.data.id} variant="h3">
          {children}
        </Typography>
      ),
      [BLOCKS.EMBEDDED_ENTRY]: (node: any) => {
        const id: string = node?.data?.target?.sys?.id;
        const entry = entries[id];
        return <ContentModule {...entry} data-testid={`Texts-${BLOCKS.EMBEDDED_ENTRY}`} />;
      },
      [INLINES.EMBEDDED_ENTRY]: (node: any) => {
        const id: string = node?.data?.target?.sys?.id;
        const entry = entries[id];
        return <ContentModule {...entry} data-testid={`Texts-${INLINES.EMBEDDED_ENTRY}`} />;
      },
      [INLINES.ASSET_HYPERLINK]: (node: any) => {
        const id: string = node?.data?.target?.sys?.id;
        const asset = assets[id];
        const content = node?.content[0]?.value;

        return <ContentModule {...asset} data-testid={`Texts-${INLINES.ASSET_HYPERLINK}`}>{content}</ContentModule>;
      },
      [INLINES.ENTRY_HYPERLINK]: (node: any) => {
        const id: string = node?.data?.target?.sys?.id;
        const entry = entries[id];
        const content = node?.content[0]?.value;

        return <ContentModule {...entry} data-testid={`Texts-${INLINES.ENTRY_HYPERLINK}`}>{content}</ContentModule>;
      },
      [INLINES.HYPERLINK]: (node: any) => {
        const id: string = node?.data?.target?.sys?.id;
        const entry = entries[id];
        const content = node?.content[0]?.value;

        return <ContentModule {...entry} data-testid={`Texts-${INLINES.HYPERLINK}`}>{content}</ContentModule>;
      }
  };
};

const Text = (props: TextProps) => <LRText {...props} renderNode={renderNodeOptions({ links: props?.body?.links })} />;
export default Text;
