import PathMatcher from './PathMatcher';
import PathRuleParser from './PathRuleParser';

const parser = new PathRuleParser();

describe('PathMatcher', () => {
  it('matches a rule with simple slug', () => {
    parser.parse(`/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule()
    });

    expect(matcher.match('/music')).toEqual(['music']);
  });

  it('does not match when too many segments exist', () => {
    parser.parse(`/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule()
    });

    expect(matcher.match('/music/chopin')).toEqual(null);
  });

  it('matches a rule with static and dynamic segment', () => {
    parser.parse(`/music/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule()
    });

    expect(matcher.match('/music/chopin')).toEqual([null, 'chopin']);
  });

  it('does not match a rule with static and dynamic segments with the wrong static string', () => {
    parser.parse(`/music/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule()
    });

    expect(matcher.match('/not-music/chopin')).toEqual(null);
  });

  it('does not match a rule with static and dynamic segments with the wrong number of segments', () => {
    parser.parse(`/music/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule()
    });

    expect(matcher.match('/music/chopin/songs')).toEqual(null);
    expect(matcher.match('/art/music/chopin')).toEqual(null);
    expect(matcher.match('/music')).toEqual(null);
  });

  it('matches a rule with reference segments', () => {
    parser.parse(`/music/:categories(category).slug/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule()
    });

    expect(matcher.match('/music/chopin/songs')).toEqual([null, 'chopin', 'songs']);
  });

  it('matches a rule with refBy segments', () => {
    parser.parse(`/music/:__refBy__(composer, songs).slug/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule()
    });

    expect(matcher.match('/music/chopin/songs')).toEqual([null, 'chopin', 'songs']);
  });

  it('matches a rule with inter-mixed static and dynamic segments', () => {
    parser.parse(`/music/:slug/songs/:slug`);
    const matcher = new PathMatcher({
      pathRule: parser.PathRule()
    });

    expect(matcher.match('/music/chopin/songs/nocturne')).toEqual([null, 'chopin', null, 'nocturne']);
  });
});
