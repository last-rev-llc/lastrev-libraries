import { XMLParser } from 'fast-xml-parser';
import { cleanSVG } from './cleanSVG';

const parser = new XMLParser({
  ignoreAttributes: false,
  preserveOrder: true
});

describe('cleanSVG', () => {
  it('makes unique IDs', () => {
    const svgContent = `<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <style>
        <![CDATA[
          #smallRect {
            stroke: #000066;
            fill: #00cc00;
          }
          .someClass {
            background: url(#someId);
          }
        ]]>
      </style>
  
      <rect id="smallRect" x="10" y="10" width="100" height="100" />
      <rect id="someId"/>
      <circle id="myCircle" cx="5" cy="5" r="4" stroke="blue"/>
      <use href="#myCircle" x="10" fill="blue"/>
      <use href="#myCircle" x="20" fill="white" stroke="red"/>
    </svg>`;

    const cleaned = cleanSVG(svgContent);

    const p = parser.parse(cleaned);
    const svg = p[0].svg;

    const styleText = svg[0].style[0]['#text'];

    expect(styleText).toMatch(/^#[a-z0-9]{8}-[a-z0-9]{6}-smallRect/);
    expect(styleText).toMatch(/background: url\(#[a-z0-9]{8}-[a-z0-9]{6}-someId\)/);
    expect(svg[1][':@']['@_id']).toMatch(/^[a-z0-9]{8}-[a-z0-9]{6}-smallRect$/);
    expect(svg[2][':@']['@_id']).toMatch(/^[a-z0-9]{8}-[a-z0-9]{6}-someId$/);
    expect(svg[3][':@']['@_id']).toMatch(/^[a-z0-9]{8}-[a-z0-9]{6}-myCircle$/);
    expect(svg[4][':@']['@_href']).toMatch(/^#[a-z0-9]{8}-[a-z0-9]{6}-myCircle$/);
    expect(svg[5][':@']['@_href']).toMatch(/^#[a-z0-9]{8}-[a-z0-9]{6}-myCircle$/);
  });
});
