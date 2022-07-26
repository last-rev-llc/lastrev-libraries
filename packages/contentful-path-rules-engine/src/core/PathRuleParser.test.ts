import PathRuleParser from './PathRuleParser';

describe('PathParser', () => {
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

  it('parses a rule with direct member expression', () => {
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
