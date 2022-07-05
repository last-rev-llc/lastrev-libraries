// `/courses/:__refBy__(course,topics).slug/:slug`

export type TokenType = 'IDENTIFIER' | '__refBy__' | '__fullPath__' | '/' | ':' | '(' | ')' | '.' | ',' | '$';

export type Token = {
  type: TokenType;
  value: string;
};

// NOTE: order matters!
const spec: [RegExp, TokenType | null][] = [
  // ---------------------------------------------------------------
  // ignored
  [/^\s+/, null],
  // ---------------------------------------------------------------
  // symbols, delimiters
  [/^\(/, '('],
  [/^\)/, ')'],
  [/^,/, ','],
  [/^\./, '.'],
  [/^\//, '/'],
  [/^\:/, ':'],
  [/^\$/, '$'],
  // ---------------------------------------------------------------
  // keywords
  [/^\b\__refBy__\b/, '__refBy__'],
  // ---------------------------------------------------------------
  // numbers

  // ---------------------------------------------------------------
  // identifiers
  [/^[a-zA-Z_][a-zA-Z_\-0-9]*/, 'IDENTIFIER']
  // ---------------------------------------------------------------
  // logical operators

  // ---------------------------------------------------------------
  // relational operators

  // ---------------------------------------------------------------
  // equality operators

  // ---------------------------------------------------------------
  // assignment operators

  // ---------------------------------------------------------------
  // math operators

  // ---------------------------------------------------------------
  // strings
];

export default class PathRuleTokenizer {
  _string: string;
  _cursor: number;

  constructor() {
    this._string = '';
    this._cursor = 0;
  }

  _match(re: RegExp, str: string) {
    const matched = re.exec(str);
    if (matched === null) {
      return null;
    }

    this._cursor += matched[0].length;
    return matched[0];
  }

  init(str: string) {
    this._string = str;
    this._cursor = 0;
  }

  hasMoreTokens() {
    return this._cursor < this._string.length;
  }

  isEOF() {
    return this._cursor >= this._string.length;
  }

  getNextToken(): Token | null {
    if (!this.hasMoreTokens()) {
      return null;
    }
    const str = this._string.slice(this._cursor);

    for (const [re, type] of spec) {
      const matched = this._match(re, str);
      if (matched === null) {
        continue;
      }
      if (type === null) {
        return this.getNextToken();
      }
      return {
        type,
        value: matched
      };
    }

    throw SyntaxError(`Unexpected token: ${str[0]}`);
  }
}
