import PathRuleTokenizer, { Token, TokenType } from './PathRuleTokenizer';
import {
  AstNode,
  DynamicSegment,
  Expression,
  Field,
  PathRule,
  PrimaryExpression,
  RefByExpression,
  Segment,
  SegmentReference,
  StaticSegment
} from './types';

export default class PathRuleParser {
  _string: string;
  _tokenizer: PathRuleTokenizer;
  _lookahead: Token | null;

  constructor() {
    this._string = '';
    this._tokenizer = new PathRuleTokenizer();
    this._lookahead = null;
  }

  _eat(type: TokenType) {
    const currentToken = this._lookahead;

    if (!currentToken) {
      throw SyntaxError(`Unexpected end of input. Expected ${type}`);
    }

    if (currentToken.type !== type) {
      // throw SyntaxError(`Unexpected Token: ${currentToken.value}, expected ${type}, at [${currentToken.line}, ${currentToken.column}]`);
      throw SyntaxError(`Unexpected Token: ${currentToken.value}, expected ${type}`);
    }

    this._lookahead = this._tokenizer.getNextToken();
    return currentToken;
  }

  _checkValidAssignmentTarget(node: AstNode) {
    if (node.type === 'Field' || node.type === 'ReferenceExpression' || node.type === 'RefByExpression') {
      return node;
    }
    throw SyntaxError(`Invalid left-hand side in assignment expression: ${node.type}`);
  }

  parse(str: string) {
    this._string = str;
    this._tokenizer.init(str);
    this._lookahead = this._tokenizer.getNextToken();
    return this;
  }

  /**
   * PathRule
   *    : SegmentList
   *    ;
   */
  PathRule(): PathRule {
    this._eat('/');
    return {
      type: 'PathRule',
      segments: this.SegmentList()
    };
  }

  /**
   * SegmentList
   *    : Segment
   *    | SegmentList Segment
   *    ;
   */
  SegmentList(): Segment[] {
    const segmentList = [this.Segment()];
    while (this._lookahead !== null) {
      segmentList.push(this.Segment());
    }
    return segmentList;
  }

  /**
   * Segment
   *    : StaticSegment
   *    | DynamicSegment
   *    ;
   */
  Segment(): Segment {
    switch (this._lookahead?.type) {
      case ':':
        return this.DynamicSegment();
      case 'IDENTIFIER':
        return this.StaticSegment();
      default:
        throw SyntaxError(`Unexpected token: ${this._lookahead?.type}, expected one of [':', 'Field']`);
    }
  }

  /**
   * StaticSegment
   *    : IDENTIFIER '/'?
   *    ;
   */
  StaticSegment(): StaticSegment {
    const value = this._eat('IDENTIFIER').value;
    if (this._lookahead) {
      this._eat('/');
    }
    return {
      type: 'StaticSegment',
      value
    };
  }

  /**
   * SegementReference
   *    : '__Segement__' '(' NUMBER ')' '.' Expression
   */

  SegementReference(): SegmentReference {
    this._eat('__segment__');
    this._eat('(');
    const index = parseInt(this._eat('NUMBER').value, 10);
    this._eat(')');
    this._eat('.');
    const property = this.Expression();
    return {
      type: 'SegmentReference',
      index,
      property
    };
  }

  /**
   * PrimaryExpression
   *    : Expression
   *    | SegmentReference
   *    ;
   */
  PrimaryExpression(): PrimaryExpression {
    if (this._lookahead?.type === '__segment__') {
      return this.SegementReference();
    }
    return this.Expression();
  }

  /**
   * DynamicSegment
   *    : ':' PrimaryExpression '/'?
   *    ;
   */
  DynamicSegment(): DynamicSegment {
    this._eat(':');
    const body = this.PrimaryExpression();
    if (this._lookahead) {
      this._eat('/');
    }
    return {
      type: 'DynamicSegment',
      body
    };
  }

  /**
   * Expression
   *    : RefByExpression
   *    | ReferenceExpression
   *    ;
   */
  Expression(): Expression {
    if (this._lookahead?.type === '__refBy__') {
      return this.RefByExpression();
    }
    return this.ReferenceExpression();
  }

  /**
   * RefByExpression
   *    : __refBy__ '(' IDENTIFIER ',' IDENTIFIER ')' '.' EXPRESSION
   *    ;
   */
  RefByExpression(): RefByExpression {
    this._eat('__refBy__');
    this._eat('(');
    const contentType = this.Field().name;
    this._eat(',');
    const refByField = this.Field().name;
    this._eat(')');
    this._eat('.');
    const property = this.Expression();
    return {
      type: 'RefByExpression',
      property,
      contentType,
      refByField
    };
  }

  /**
   * ReferenceExpression
   *    : Field
   *    | IDENTIFIER '(' IDENTIFIER ')' '.' Expression
   *    ;
   */
  ReferenceExpression(): Expression {
    let object: Expression = this.Field();
    if (this._lookahead?.type === '(') {
      this._eat('(');
      const contentType = this.Field().name;
      this._eat(')');
      this._eat('.');
      object = {
        type: 'ReferenceExpression',
        field: object.name,
        property: this.Expression(),
        contentType
      };
    }
    return object;
  }

  /**
   * Field
   *    : IDENTIFIER
   *    ;
   */
  Field(): Field {
    const name = this._eat('IDENTIFIER').value;
    return {
      type: 'Field',
      name
    };
  }
}
