/* eslint-disable react/display-name */
import React from 'react';
import styled, { css as customCss } from 'styled-components';
import responsive from '../utils/responsive';
import css from '../utils/style-helper';
import colors from '../utils/colors';
import changeCase from '../utils/changeCase';

const TextComponent = styled.div`
  -webkit-font-smoothing: antialiased;
  font-family: 'Muli', sans-serif;
  margin: 0;

  ${(p) =>
    css([
      [
        p.kind === 'h1',
        `
      font-size: 40px;
      font-weight: 501;
      line-height: 1.2em;
      ${responsive.tabletPlus`
        font-size: 36px;
      `}
      ${responsive.mobilePlus`
        font-size: 24px;
      `}
    `
      ],
      [
        p.kind === 'h2',
        `
      font-size: 40px;
      font-weight: 500;
      line-height: 1.2em;
      ${responsive.mobilePlus`
        font-size: 24px;
      `}
    `
      ],
      [
        p.kind === 'h3',
        `
      font-size: 20px;
      font-weight: 500;
    `
      ],
      [
        p.kind === 'h4',
        `
      font-size: 20px;
      margin: 0;
    `
      ],
      [
        p.kind === 'h5',
        `
      font-size: 18px;
      font-weight: 600;
      opacity: 0.5;
      margin: 0;
    `
      ],
      [
        p.kind === 'h6',
        `
      margin-bottom: 0;
    `
      ],
      [
        p.kind === 'p',
        `
      font-size: 16px;
      font-weight: 400;
      line-height: 1.4em;
      /* default styles for hyperlinks within paragraphs */
      > a {
        color: ${colors.green};
        &:hover {
          color: ${colors.darkTeal};
        }
      }
      /* Fix for ReactMarkdown which renders content nested in a p element */
      /* https://lively.atlassian.net/browse/MAR-462 */
      > p {
        > a {
          color: ${colors.green};
          &:hover {
            color: ${colors.darkTeal};
          }
        }
      }
      ${responsive.mobile`
        font-size: 20px;
        margin:0px;
      `}
    `
      ],
      [
        p.kind === 'disclaimer',
        `
      color: #90969e;
      font-weight: 400;
      font-size: 11px;
      line-height: 16px
    `
      ],
      [
        p.kind === 'span',
        `
      font-size: 10px;
      display: block;
      font-weight: 400;
    `
      ],
      [
        p.subText,
        `
      color: #90969e;
      text-transform: uppercase;
      font-weight: 700;
      font-size: 14px;
      letter-spacing: 1px;
      line-height: 1em;
    `
      ],
      [p.color, `color: ${colors[changeCase.camel(p.color)] || changeCase.camel(p.color)};`],
      [p.size, `font-size: ${p.size}px;`],
      [p.weight, `font-weight: ${p.weight};`],
      [p.opacity, `opacity: ${p.opacity};`],
      [p.padded, `padding: 18px 0;`],
      [p.paddedBottom, `padding: 0 0 17px 0;`],
      [p.maxWidth, `max-width: ${p.maxWidth}px;`],
      [p.inline, `display: inline-block;`],
      [p.line, `display: inline;`],
      [p.center, `text-align: center;`],
      [p.leftAlignOnMobile, `${responsive.mobilePlus` text-align: left;`}`],
      [p.white, `color: white;`],
      [p.margin, `margin: ${p.margin};`],
      [p.padding, `padding: ${p.padding};`],
      [p.orange, `color: orange;`],
      [p.width, `width: ${p.width};`],
      [p.uppercase, `text-transform: uppercase;`],
      [p.noWrap, `white-space: nowrap;`],
      [p.strong, `font-weight: 600;`],
      [p.italic, `font-style: italic;`],
      [p.pointer, `cursor: pointer;`],
      [p.pre, `white-space: pre-line;`],
      [
        p.noHover,
        `&:hover{
        color: #19A69D
      }`
      ],
      [p.mobileLeft, `${responsive.mobilePlus`text-align: left;`}`],
      [p.mobileCenter, `${responsive.mobilePlus`text-align: center;`}`],
      [p.letterSpacing, `letter-spacing: ${p.letterSpacing};`],
      [p.lineHeight, `line-height: ${p.lineHeight};`],
      [
        p.transition,
        `
    opacity: 0;
    transform: translateX(-40px);
    position: relative;
    `
      ],

      [
        p.transitionFromTop,
        `
    opacity: 0;
    transform: translateY(-40px);
    position: relative;
    `
      ],

      [
        p.transitionFromBottom,
        `
    opacity: 0;
    transform: translateY(40px);
    position: relative;
    `
      ]
    ])}

  ${(props) =>
    props.isDisclaimer &&
    customCss`
      padding: 1.5rem 0;

      @media only screen and (min-width: 640px) {
        padding: 1.5rem;
      }

      @media only screen and (min-width: 1240px) {
        padding: 1.5rem 0;
      }
  `}
`;

export const Text = React.forwardRef((props, ref) => <TextComponent ref={ref} {...props} as={props.kind} />);

export default Text;
