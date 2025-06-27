import PathMatcher from './PathMatcher';
import PathRuleParser from '../core/PathRuleParser';

describe('PathMatcher', () => {
  it('throws error when full path is used but more than one dynamic segment', () => {
    const parser = new PathRuleParser(`/:slug1/:slug`);
    expect(
      () =>
        new PathMatcher({
          pathRule: parser.PathRule(),
          allowFullPaths: true
        })
    ).toThrow('Only one simple field can be used in a full path');
  });

  it('throws error when full path is used but a reference field is used', () => {
    const parser = new PathRuleParser(`/:parent(page).slug`);
    expect(
      () =>
        new PathMatcher({
          pathRule: parser.PathRule(),
          allowFullPaths: true
        })
    ).toThrow('No references or refBy segments allowed when using a full path');
  });

  it('throws error when full path is used but a refBy field is used', () => {
    const parser = new PathRuleParser(`/:__refBy__(children, page).slug`);
    expect(
      () =>
        new PathMatcher({
          pathRule: parser.PathRule(),
          allowFullPaths: true
        })
    ).toThrow('No references or refBy segments allowed when using a full path');
  });
  it('matches a rule with simple slug', () => {
    const parser = new PathRuleParser(`/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule()
    });

    expect(matcher.match('/music')).toEqual(['music']);
  });

  it('does not match when too many segments exist', () => {
    const parser = new PathRuleParser(`/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule()
    });

    expect(matcher.match('/music/chopin')).toEqual(null);
  });

  it('matches a rule with static and dynamic segment', () => {
    const parser = new PathRuleParser(`/music/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule()
    });

    expect(matcher.match('/music/chopin')).toEqual([null, 'chopin']);
  });

  it('does not match a rule with static and dynamic segments with the wrong static string', () => {
    const parser = new PathRuleParser(`/music/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule()
    });

    expect(matcher.match('/not-music/chopin')).toEqual(null);
  });

  it('does not match a rule with static and dynamic segments with the wrong number of segments', () => {
    const parser = new PathRuleParser(`/music/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule()
    });

    expect(matcher.match('/music/chopin/songs')).toEqual(null);
    expect(matcher.match('/art/music/chopin')).toEqual(null);
    expect(matcher.match('/music')).toEqual(null);
  });

  it('matches a rule with reference segments', () => {
    const parser = new PathRuleParser(`/music/:categories(category).slug/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule()
    });

    expect(matcher.match('/music/chopin/songs')).toEqual([null, 'chopin', 'songs']);
  });

  it('matches a rule with refBy segments', () => {
    const parser = new PathRuleParser(`/music/:__refBy__(composer, songs).slug/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule()
    });

    expect(matcher.match('/music/chopin/songs')).toEqual([null, 'chopin', 'songs']);
  });

  it('matches a rule with inter-mixed static and dynamic segments', () => {
    const parser = new PathRuleParser(`/music/:slug/songs/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule()
    });

    expect(matcher.match('/music/chopin/songs/nocturne')).toEqual([null, 'chopin', null, 'nocturne']);
  });

  it('matches a full path rule', () => {
    const parser = new PathRuleParser(`/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule(),
      allowFullPaths: true
    });

    expect(matcher.match('/some/path/here')).toEqual(['some/path/here']);
  });

  it('matches a full path rule with static segment', () => {
    const parser = new PathRuleParser(`/products/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule(),
      allowFullPaths: true
    });

    expect(matcher.match('/products/some/path/here')).toEqual([null, 'some/path/here']);
  });
});
