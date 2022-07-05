// ---------------------------------------------------------------
// expressions

export type Field = {
  type: 'Field';
  name: string;
};

export type ReferenceExpression = {
  type: 'ReferenceExpression';
  field: string;
  contentType: string;
  property: Expression;
};

export type RefByExpression = {
  type: 'RefByExpression';
  property: Expression;
  contentType: string;
  refByField: string;
};

export type Expression = Field | ReferenceExpression | RefByExpression;

// ---------------------------------------------------------------
// segments

export type StaticSegment = {
  type: 'StaticSegment';
  value: string;
};

export type DynamicSegment = {
  type: 'DynamicSegment';
  body: Expression;
};

export type Segment = StaticSegment | DynamicSegment;

// ---------------------------------------------------------------
// Descriptors

export type PathRule = {
  type: 'PathRule';
  segments: Segment[];
};

// ---------------------------------------------------------------
// AstNode

export type AstNode = PathRule | Segment | Expression;

// ---------------------------------------------------------------
// type checkers

export const isPathRule = (node: AstNode): node is PathRule => {
  return node.type === 'PathRule';
};

export const isStaticSegment = (node: AstNode): node is StaticSegment => {
  return node.type === 'StaticSegment';
};

export const isDynamicSegment = (node: AstNode): node is DynamicSegment => {
  return node.type === 'DynamicSegment';
};

export const isReferenceExpression = (node: AstNode): node is ReferenceExpression => {
  return node.type === 'ReferenceExpression';
};

export const isRefByExpression = (node: AstNode): node is RefByExpression => {
  return node.type === 'RefByExpression';
};

export const isField = (node: AstNode): node is Field => {
  return node.type === 'Field';
};

export type SlugArray = (string | null)[];
