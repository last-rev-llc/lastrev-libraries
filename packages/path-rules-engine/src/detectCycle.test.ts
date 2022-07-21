import PathRuleParser from './PathRuleParser';
import detectCycle, { CycleDetctionResult } from './detectCycle';

const parser = new PathRuleParser();

describe('detectCycle', () => {
  it('returns false when no segment references exist', () => {
    expect(detectCycle(parser.parse('/:slug').PathRule())).toBe(false);
  });

  it('returns false when segment references exist without cycles', () => {
    expect(detectCycle(parser.parse('/:__segment__(1).title/:slug').PathRule())).toBe(false);
  });

  it('returns no error when chained segment references exist with cycles', () => {
    expect(detectCycle(parser.parse('/:__segment__(1).slug/:__segment__(2).slug/:slug').PathRule())).toBe(false);
  });

  it('returns an error when segment references exist with cycles', () => {
    expect(detectCycle(parser.parse('/:__segment__(1).slug/:__segment__(0).slug/:slug').PathRule())).toEqual([1, 0]);
  });

  it('returns an error when segment references exist with indirect cycles', () => {
    expect(
      detectCycle(parser.parse('/:__segment__(1).slug/:__segment__(2).slug/:__segment__(0).slug/:slug').PathRule())
    ).toEqual([2, 0]);
  });
});
