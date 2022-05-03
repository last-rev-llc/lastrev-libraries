import React from 'react';
import keyBy from 'lodash/keyBy';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Box from '@mui/material/Box';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import ContentModule from '@last-rev/component-library/dist/components/ContentModule';
import LRText, { TextProps } from '@last-rev/component-library/dist/components/Text';
import Media from '@last-rev/component-library/dist/components/Media';

export type { TextProps, TextClassKey, TextClasses } from '@last-rev/component-library/dist/components/Text';

/**
 * Purpose of this local <Text /> is:
 * - Add ids and data-scrollspy attributes to H2 for article page links
 * - Render <br> tags from Markdown
 * - Parse MUI Table elements
 */

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
    'html': (node: any, _children: any) => {
      return node.data.value;
    },
    'markdown-image': (node: any) => {
      return <Media file={{ url: node?.data?.url }} title={node?.data?.alt} />;
    },
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

      return (
        <ContentModule {...asset} data-testid={`Texts-${INLINES.ASSET_HYPERLINK}`}>
          {content}
        </ContentModule>
      );
    },
    [INLINES.ENTRY_HYPERLINK]: (node: any) => {
      const id: string = node?.data?.target?.sys?.id;
      const entry = entries[id];
      const content = node?.content[0]?.value;

      return (
        <ContentModule {...entry} data-testid={`Texts-${INLINES.ENTRY_HYPERLINK}`}>
          {content}
        </ContentModule>
      );
    },
    [BLOCKS.TABLE]: (node: any, children: any) => {
      let header;
      if (node.content[0].nodeType === 'table-header') {
        header = children[0];
        children = children.slice(1);
      }
      return (
        <TableContainer>
          <Table>
            {header ? header : null}
            <TableBody>{children}</TableBody>
          </Table>
        </TableContainer>
      );
    },
    'table-header': (_: any, children: any) => {
      return (
        <TableHead>
          <TableRow>{children}</TableRow>
        </TableHead>
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
    [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
      const id: string = node?.data?.target?.sys?.id;
      const entry = assets[id];

      return (
        <Box textAlign="center">
          <ContentModule
            {...entry}
            sx={{
              maxWidth: entry?.file?.width ? `${entry.file.width}px` : 'none'
            }}
            data-testid={`Text-${BLOCKS.EMBEDDED_ASSET}`}
          />
        </Box>
      );
    }
  };
};

const Text = (props: TextProps) => {
  const renderNode = React.useMemo(() => renderNodeOptions({ links: props?.body?.links }), [props]);
  return <LRText {...props} renderNode={renderNode} />;
};

export default Text;
