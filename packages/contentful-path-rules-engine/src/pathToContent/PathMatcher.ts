import traversePathRule, { PathVisitor } from '../core/traversePathRule';
import { PathRule, StaticSegment } from '../types';

const escapeRegExp = (str: string) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

export type PathMatcherContext = {
  matcherString: string;
  segmentCount: number;
  matchedSegmentIndices: number[];
};

const pathMatcherBuilderVisitor: PathVisitor<PathMatcherContext> = {
  PathRule: {
    enter(_node, _parent, context) {
      context.matcherString = '^';
    },
    exit(_node, _parent, context) {
      context.matcherString += '$';
    }
  },
  StaticSegment: {
    enter: (node, _parent, context) => {
      context.segmentCount += 1;
      const val = (node as StaticSegment).value;
      context.matcherString += `\\/${escapeRegExp(val)}`;
    }
  },
  DynamicSegment: {
    enter: (_node, _parent, context) => {
      context.matchedSegmentIndices.push(context.segmentCount);
      context.matcherString += `\\/([^\\/]*)`;
      context.segmentCount += 1;
    }
  }
};

/**
 * Given a PathRule, generates a matcher capturing the dynamic segments
 */
export default class PathMatcher {
  private readonly _pathRule: PathRule;
  private readonly _matcher: RegExp;
  private readonly _segmentCount: number;
  private readonly _matchedSegmentIndices: number[];

  // TODO: match whole path later
  constructor({ pathRule }: { pathRule: PathRule }) {
    this._pathRule = pathRule;

    const context: PathMatcherContext = {
      matcherString: '',
      segmentCount: 0,
      matchedSegmentIndices: []
    };
    traversePathRule(this._pathRule, pathMatcherBuilderVisitor, context);

    this._matcher = new RegExp(context.matcherString);
    this._segmentCount = context.segmentCount;
    this._matchedSegmentIndices = context.matchedSegmentIndices;
  }

  match(path: string): (string | null)[] | null {
    const match = path.match(this._matcher);

    if (!match) {
      return null;
    }

    const out: (string | null)[] = new Array(this._segmentCount);
    for (let i = 0, matchedIndex = 1; i < this._segmentCount; i++) {
      if (this._matchedSegmentIndices.includes(i)) {
        out[i] = match[matchedIndex];
        matchedIndex += 1;
      } else {
        out[i] = null;
      }
    }

    return out;
  }
}
