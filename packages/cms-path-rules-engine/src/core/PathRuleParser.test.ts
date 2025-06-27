import PathRuleParser from './PathRuleParser';

describe('PathParser', () => {
  it('throws an error when no string follows a colon', () => {
    const parser = new PathRuleParser(`/:`);

    expect(() => parser.PathRule()).toThrow('Unexpected end of input. Expected IDENTIFIER');
  });

  it('throws an error when segment has no content', () => {
    const parser = new PathRuleParser(`/blogs//:slug`);

    expect(() => parser.PathRule()).toThrow(`Unexpected token: /, expected one of [':', 'Field']`);
  });

  it('throws an error when path does not start with slash', () => {
    const parser = new PathRuleParser(`blogs/:slug`);

    expect(() => parser.PathRule()).toThrow(`Unexpected Token: blogs, expected /`);
  });

  it('throws an error when reference expression has no contentType', () => {
    const parser = new PathRuleParser(`/:categories().slug`);

    expect(() => parser.PathRule()).toThrow(`Unexpected Token: ), expected IDENTIFIER`);
  });

  it('throws an error when reference expression has too many strings', () => {
    const parser = new PathRuleParser(`/:categories(category, category).slug`);

    expect(() => parser.PathRule()).toThrow(`Unexpected Token: ,, expected )`);
  });

  it('throws an error when reference expression is not followed by a field', () => {
    const parser = new PathRuleParser(`/:categories(category)/:slug`);

    expect(() => parser.PathRule()).toThrow(`Unexpected Token: /, expected .`);
  });

  it('throws an error when refby expression has no contentType or field name', () => {
    const parser = new PathRuleParser(`/:__refBy__().slug`);

    expect(() => parser.PathRule()).toThrow(`Unexpected Token: ), expected IDENTIFIER`);
  });

  it('throws an error when refby expression has only one identifier', () => {
    const parser = new PathRuleParser(`/:__refBy__(category).slug`);

    expect(() => parser.PathRule()).toThrow(`Unexpected Token: ), expected ,`);
  });

  it('throws an error when refby expression has too many identifiers', () => {
    const parser = new PathRuleParser(`/:__refBy__(category, categories, something).slug`);

    expect(() => parser.PathRule()).toThrow(`Unexpected Token: ,, expected )`);
  });

  it('throws an error when segment expression has no index', () => {
    const parser = new PathRuleParser(`/:__segment__().parent(category).slug/:slug`);

    expect(() => parser.PathRule()).toThrow(`Unexpected Token: ), expected NUMBER`);
  });

  it('throws an error when segment expression has a non-number value', () => {
    const parser = new PathRuleParser(`/:__segment__(hello).parent(category).slug/:slug`);

    expect(() => parser.PathRule()).toThrow(`Unexpected Token: hello, expected NUMBER`);
  });

  it('returns an error when segment references exist with cycles', () => {
    const parser = new PathRuleParser('/:__segment__(1).slug/:__segment__(0).slug/:slug');
    expect(() => parser.PathRule()).toThrow(`Cycle detected between segments 1 and 0`);
  });

  it('throws an error when segment references exist with indirect cycles', () => {
    const parser = new PathRuleParser('/:__segment__(1).slug/:__segment__(2).slug/:__segment__(0).slug/:slug');
    expect(() => parser.PathRule()).toThrow(`Cycle detected between segments 2 and 0`);
  });

  it('parses a rule with simple slug', () => {
    const parser = new PathRuleParser(`/:slug`);

    expect(parser.PathRule()).toEqual({
      type: 'PathRule',
      segments: [
        {
          type: 'DynamicSegment',
          body: {
            type: 'Field',
            name: 'slug'
          }
        }
      ]
    });
  });

  it('parses a rule with static segment and a simple slug', () => {
    const parser = new PathRuleParser(`/blogs/:slug`);

    expect(parser.PathRule()).toEqual({
      type: 'PathRule',
      segments: [
        {
          type: 'StaticSegment',
          value: 'blogs'
        },
        {
          type: 'DynamicSegment',
          body: {
            type: 'Field',
            name: 'slug'
          }
        }
      ]
    });
  });

  it('parses a rule with reference expression', () => {
    const parser = new PathRuleParser(`/blogs/:categories(category).slug/:slug`);

    expect(parser.PathRule()).toEqual({
      type: 'PathRule',
      segments: [
        {
          type: 'StaticSegment',
          value: 'blogs'
        },
        {
          type: 'DynamicSegment',
          body: {
            type: 'ReferenceExpression',
            field: 'categories',
            contentType: 'category',
            property: {
              type: 'Field',
              name: 'slug'
            }
          }
        },
        {
          type: 'DynamicSegment',
          body: {
            type: 'Field',
            name: 'slug'
          }
        }
      ]
    });
  });

  it('parses a rule with deeply nested direct member expressions', () => {
    const parser = new PathRuleParser(`/:parent(page).parent(page).slug/:parent(page).slug/:slug`);

    expect(parser.PathRule()).toEqual({
      type: 'PathRule',
      segments: [
        {
          type: 'DynamicSegment',
          body: {
            type: 'ReferenceExpression',
            contentType: 'page',
            field: 'parent',
            property: {
              type: 'ReferenceExpression',
              contentType: 'page',
              field: 'parent',
              property: {
                type: 'Field',
                name: 'slug'
              }
            }
          }
        },
        {
          type: 'DynamicSegment',
          body: {
            type: 'ReferenceExpression',
            contentType: 'page',
            field: 'parent',
            property: {
              type: 'Field',
              name: 'slug'
            }
          }
        },
        {
          type: 'DynamicSegment',
          body: {
            type: 'Field',
            name: 'slug'
          }
        }
      ]
    });
  });

  it('parses a rule with a segment reference', () => {
    const parser = new PathRuleParser(`/:__segment__(1).parent(page).slug/:parent(page).slug/:slug`);

    expect(parser.PathRule()).toEqual({
      type: 'PathRule',
      segments: [
        {
          type: 'DynamicSegment',
          body: {
            type: 'SegmentReference',
            index: 1,
            property: {
              type: 'ReferenceExpression',
              contentType: 'page',
              field: 'parent',
              property: {
                type: 'Field',
                name: 'slug'
              }
            }
          }
        },
        {
          type: 'DynamicSegment',
          body: {
            type: 'ReferenceExpression',
            contentType: 'page',
            field: 'parent',
            property: {
              type: 'Field',
              name: 'slug'
            }
          }
        },
        {
          type: 'DynamicSegment',
          body: {
            type: 'Field',
            name: 'slug'
          }
        }
      ]
    });
  });

  it('parses a rule with multiple segment references', () => {
    const parser = new PathRuleParser(
      `/:__segment__(1).parent(page).slug/:__segment__(2).parent(page).slug/:parent(page).slug/:slug`
    );

    expect(parser.PathRule()).toEqual({
      type: 'PathRule',
      segments: [
        {
          type: 'DynamicSegment',
          body: {
            type: 'SegmentReference',
            index: 1,
            property: {
              type: 'ReferenceExpression',
              contentType: 'page',
              field: 'parent',
              property: {
                type: 'Field',
                name: 'slug'
              }
            }
          }
        },
        {
          type: 'DynamicSegment',
          body: {
            type: 'SegmentReference',
            index: 2,
            property: {
              type: 'ReferenceExpression',
              contentType: 'page',
              field: 'parent',
              property: {
                type: 'Field',
                name: 'slug'
              }
            }
          }
        },
        {
          type: 'DynamicSegment',
          body: {
            type: 'ReferenceExpression',
            contentType: 'page',
            field: 'parent',
            property: {
              type: 'Field',
              name: 'slug'
            }
          }
        },
        {
          type: 'DynamicSegment',
          body: {
            type: 'Field',
            name: 'slug'
          }
        }
      ]
    });
  });

  it('parses a rule with a refBy expression', () => {
    const parser = new PathRuleParser(`/courses/:__refBy__(course,topics).slug/:slug`);

    expect(parser.PathRule()).toEqual({
      type: 'PathRule',
      segments: [
        {
          type: 'StaticSegment',
          value: 'courses'
        },
        {
          type: 'DynamicSegment',
          body: {
            type: 'RefByExpression',
            contentType: 'course',
            refByField: 'topics',
            property: {
              type: 'Field',
              name: 'slug'
            }
          }
        },
        {
          type: 'DynamicSegment',
          body: {
            type: 'Field',
            name: 'slug'
          }
        }
      ]
    });
  });

  it('parses a rule with nested linking expressions', () => {
    const parser = new PathRuleParser(
      `/course-packs/:__refBy__(course,topics).__refBy__(coursePack,courses).slug/:__refBy__(course,topics).slug/:slug`
    );

    expect(parser.PathRule()).toEqual({
      type: 'PathRule',
      segments: [
        {
          type: 'StaticSegment',
          value: 'course-packs'
        },
        {
          type: 'DynamicSegment',
          body: {
            type: 'RefByExpression',
            contentType: 'course',
            refByField: 'topics',
            property: {
              type: 'RefByExpression',
              contentType: 'coursePack',
              refByField: 'courses',
              property: {
                type: 'Field',
                name: 'slug'
              }
            }
          }
        },
        {
          type: 'DynamicSegment',
          body: {
            type: 'RefByExpression',
            contentType: 'course',
            refByField: 'topics',
            property: {
              type: 'Field',
              name: 'slug'
            }
          }
        },
        {
          type: 'DynamicSegment',
          body: {
            type: 'Field',
            name: 'slug'
          }
        }
      ]
    });
  });
});
