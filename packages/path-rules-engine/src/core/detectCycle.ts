import { PathRule } from '../types';

export type CycleDetctionResult = false | number[];

function detectCycle({ segments }: PathRule): CycleDetctionResult {
  var segmentReferences: (boolean | undefined)[] = [];

  let result: CycleDetctionResult = false;

  segments.forEach((s, i) => {
    let hasRef = false;
    if (s.type === 'DynamicSegment') {
      const { body } = s;
      if (body.type === 'SegmentReference') {
        if (segmentReferences[body.index]) {
          result = [i, body.index];
          return false;
        }
        hasRef = true;
      }
    }
    segmentReferences[i] = hasRef;
    return true;
  });

  return result;
}

export default detectCycle;
