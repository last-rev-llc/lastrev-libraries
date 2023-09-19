import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import SEO from './SEO';
import { seoBaseMock, seoWithAntiFlickerMock, seoWithoutAntiFlickerMock } from './SEO.mock';

const mockedBase = seoBaseMock();
export default {
  title: '1. Global / SEO',
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
              {mockedBase.seo.title.value}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Keywords
            </TableCell>
            <TableCell component="td" scope="row">
              {mockedBase.seo.keywords.value}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Description
            </TableCell>
            <TableCell component="td" scope="row">
              {mockedBase.seo.description.value}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Canonical
            </TableCell>
            <TableCell component="td" scope="row">
              {mockedBase.seo.canonical.value}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Robots
            </TableCell>
            <TableCell component="td" scope="row">
              {mockedBase.seo.robots.value}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
  ],
  argTypes: {}
};

export const Default = { args: { ...seoBaseMock() } };
export const WithAntiFlicker = { args: { ...seoWithAntiFlickerMock() } };
export const WithoutAntiFlicker = { args: { ...seoWithoutAntiFlickerMock() } };
