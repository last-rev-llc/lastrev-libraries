import { XMLParser, XMLBuilder } from 'fast-xml-parser';

// Clean SVG to be ready to use inlined inside other SVG tag
export function cleanSVG(svgContent: string, title: string = 'svg'): any {
  const options = {
    ignoreAttributes: false,
    preserveOrder: true
  };

  const parser = new XMLParser(options);
  const builder = new XMLBuilder(options);

  let svgJ = parser.parse(svgContent);
  if (svgJ?.length) {
    // Delete width and height, will be present in the outher Asset type
    delete svgJ[0][':@']['@_width'];
    delete svgJ[0][':@']['@_height'];

    // Best ADA practice
    svgJ[0][':@']['@_focusable'] = false;
    svgJ[0][':@']['@_role'] = 'img';

    // Add title inside SVG
    // svgJ[0]['svg'].unshift({
    //   title: [
    //     {
    //       '#text': title
    //     }
    //   ]
    // });
  }
  let cleaned = builder.build(svgJ);

  return cleaned;
}
