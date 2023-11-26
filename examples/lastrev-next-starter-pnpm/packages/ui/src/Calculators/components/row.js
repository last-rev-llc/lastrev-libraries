/* eslint-disable react/display-name */
import React from 'react';
import styled from 'styled-components';
import responsive from '../utils/responsive';
import css from '../utils/style-helper';

const RowComponent = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  // align-items: flex-start;
  // justify-content: flex-start;
  position: relative;

  ${(p) =>
    css([
      [
        p.sameHeightChildren,
        `
      align-items: inherit !important;
    `
      ],

      [
        p.double,
        `
      &>div {
        width: 100%;
        &:first-child {
          padding-right: 10px;
          ${responsive.mobilePlus`
            padding-right: 0;
          `}
        }
        &:nth-child(2) {
          padding-left: 10px;
          ${responsive.mobilePlus`
            padding-left: 0;
          `}
        }
      }
    `
      ],

      [
        p.noWidth,
        `
      max-width: fit-content;
    `
      ],

      [
        p.spaceBetween,
        `
      justify-content: space-between;
    `
      ],

      [
        p.alignCenter,
        `
      align-items: center;
    `
      ],

      [
        p.noBasis,
        `
      flex-basis: 0;
      flex-grow: 1;
    `
      ],

      [
        p.wrap,
        `
      flex-wrap: wrap;
    `
      ],

      [
        !p.noWrap,
        `
      ${responsive.mobilePlus`
        flex-wrap: wrap;
      `}
    `
      ],

      [
        p.center,
        `
      justify-content: center;
    `
      ],

      [
        p.right,
        `
      justify-content: flex-end;
    `
      ],

      [
        p.noMobileWrap,
        `
      ${responsive.mobilePlus`
        flex-wrap: no-wrap;
      `}
    `
      ],

      [
        p.evenColumnResponsive,
        `
      ${responsive.desktopPlus`
        flex-wrap: wrap;
      `}
    `
      ],

      [
        p.wrapPoint,
        `
      ${
        p.wrapPoint &&
        responsive[p.wrapPoint]`
        flex-wrap: wrap;
        justify-content: center;
      `
      }
    `
      ],

      [
        p.wrapper,
        `
      ${p.wrapper}
      margin: 0 auto;
    `
      ]
    ])}
`;

const Row = React.forwardRef((props, ref) => <RowComponent ref={ref} {...props} />);

export default Row;
