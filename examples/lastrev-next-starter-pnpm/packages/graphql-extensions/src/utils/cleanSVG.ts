import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import css from 'css';

const uniqueId = () => {
  const dateStr = Date.now().toString(36); // convert num to base 36 and stringify

  const randomStr = Math.random().toString(36).substring(2, 8); // start at index 2 to skip decimal point

  return `${dateStr}-${randomStr}`;
};

// Clean SVG to be ready to use inlined inside other SVG tag
export function cleanSVG(svgContent: string /* title: string = 'svg',*/): any {
  const idPrefix = uniqueId();
  const idRefAttrs = ['href', 'xlink:href', 'xlink:role', 'xlink:arcrole'];
  const linkAttributes = ['href', 'xlink:href'];
  const isDataValue = (name: string, value: string) =>
    linkAttributes.includes(name) && (value ? !value.includes('#') : false);
  const renamedIds: string[] = [];
  const ID_REF_REGEX = /^#(.*\w)$/;
  const ID_URL_REGEX = /^url\(#(.*)\)$/;
  const options = {
    ignoreAttributes: false,
    preserveOrder: true
  };
  const parserOptions = {
    ...options,
    attributeValueProcessor: (attrName: string, attrValue: string) => {
      if (attrName === 'id') {
        renamedIds.push(attrValue);
        return `${idPrefix}-${attrValue}`;
      } else if (idRefAttrs.includes(attrName)) {
        if (!isDataValue(attrName, attrValue)) {
          if (ID_REF_REGEX.test(attrValue)) {
            return attrValue.replace(ID_REF_REGEX, (_, id) => `#${idPrefix}-${id}`);
          } else if (ID_URL_REGEX.test(attrValue)) {
            return attrValue.replace(ID_URL_REGEX, (_, id) => `url(#${idPrefix}-${id})`);
          }
        }
      }
      return attrValue;
    },
    tagValueProcessor: (tagName: string, tagValue: string) => {
      if (tagName === 'style') {
        const ast = css.parse(tagValue);

        ast.stylesheet?.rules.forEach((rule: any) => {
          if (rule.type === 'rule') {
            const { selectors, declarations } = rule as css.Rule;
            if (selectors) {
              (rule as css.Rule).selectors = selectors.map((selector) => selector.replace('#', `#${idPrefix}-`));
            }
            if (declarations) {
              (rule as css.Rule).declarations = declarations.map((declaration) => {
                if (declaration.type === 'declaration') {
                  const { value } = declaration as css.Declaration;
                  return {
                    ...declaration,
                    value: value && value.replace(ID_URL_REGEX, (_, id) => `url(#${idPrefix}-${id})`)
                  };
                }
                return declaration;
              });
            }
          }
        });
        const cleanedCss = css.stringify(ast);
        return cleanedCss;
      }
      return tagValue;
    }
  };

  const parser = new XMLParser(parserOptions);
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
