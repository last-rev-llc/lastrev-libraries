import React from 'react';
import styled from 'styled-components';
import responsive from '../utils/responsive';
import css from '../utils/style-helper';

const SectionWrapper = styled.section`
  position: relative;
  max-width: 1240px;
  width: 85%;
  margin: 0 auto;
  padding: 0 20px;
  ${responsive.tablet`
    width: 100%;
  `}

  ${(p) =>
    css([
      [
        p.full,
        `
      max-width: 100% !important;
      width: 100%;
    `
      ],
      [
        p.redPadded,
        `
      padding: 70px 0;
      ${responsive.mobilePlus`
        padding: 80px 20px !important;
      `}
    `
      ],
      [
        p.padded,
        `
      padding: 70px 0px;
      ${responsive.mobilePlus`
        padding: 40px 20px 20px;
      `}
    `
      ],
      [p.padding, `padding: ${p.padding};`],
      [p.flexbox, `display: flex;`],
      [p.flexCenter, `justify-content: center;`],
      [p.spaceBetween, `justify-content: space-between;`],
      [p.alignCenter, `align-items: center;`],
      [p.flexboxTop, `align-items: flex-start;`],
      [p.textCenter, `text-align: center;`],
      [
        p.noBasis,
        `
      flex-basis: 0;
      flex-grow: 1;
    `
      ],
      [p.wrap, `flex-wrap: wrap;`],
      [p.width, `max-width: ${p.width}px;`],
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
      [p.column, `flex-direction: column;`],
      [p.textCenter, `text-align: center;`]
    ])}
`;

const Section = (props) => <SectionWrapper {...props} />;

export default Section;
