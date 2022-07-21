import PathRuleParser from './PathRuleParser';

describe('PathParser', () => {
  const parser = new PathRuleParser();

  it('parses a rule with simple slug', () => {
    parser.parse(`/:slug`);

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
    parser.parse(`/blogs/:slug`);

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
    parser.parse(`/blogs/:categories(category).slug/:slug`);

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
    parser.parse(`/:parent(page).parent(page).slug/:parent(page).slug/:slug`);

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
    parser.parse(`/:__segment__(1).parent(page).slug/:parent(page).slug/:slug`);

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
    parser.parse(`/:__segment__(1).parent(page).slug/:__segment__(2).parent(page).slug/:parent(page).slug/:slug`);

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
    parser.parse(`/courses/:__refBy__(course,topics).slug/:slug`);

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
    parser.parse(
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
