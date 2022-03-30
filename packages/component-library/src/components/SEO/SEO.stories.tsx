import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import SEO from './SEO';
import mockContent from './SEO.mock';

export default {
  title: 'Components / SEO',
  component: SEO,
  decorators: [
    (storyFn: () => boolean | React.ReactChild | React.ReactFragment | React.ReactPortal) => (
      <Table
        sx={{
          'width': 600,
          'margin': 8,
          'backgroundColor': '#fafafa',
          '& th': {
            fontWeight: 'bold'
          }
        }}>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Title
            </TableCell>
            <TableCell component="td" scope="row">
              {mockContent.title.value}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Keywords
            </TableCell>
            <TableCell component="td" scope="row">
              {mockContent.keywords.value}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Description
            </TableCell>
            <TableCell component="td" scope="row">
              {mockContent.description.value}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Canonical
            </TableCell>
            <TableCell component="td" scope="row">
              {mockContent.canonical.value}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Robots
            </TableCell>
            <TableCell component="td" scope="row">
              {mockContent.robots.value}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  ],
  argTypes: {}
};

const Template = (args: JSX.IntrinsicAttributes) => <SEO {...args} />;
export const Default = Template.bind({});
Default.args = { ...mockContent };
