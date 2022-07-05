import { ApolloContext, PathData2, PathRuleConfig } from 'packages/types';
// import { PathRule } from './types';
// import PathRuleParser from './PathRuleParser';

// const parser = new PathRuleParser();

export default class IdToPathsLoader {
  // private readonly _pathRule: PathRule;

  constructor(_config: PathRuleConfig) {
    // this._pathRule = parser.parse
  }

  async loadPathsFromId(_id: string, _ctx: ApolloContext, _site?: string): Promise<PathData2[]> {
    // TODO: IMPLEMENT
    return [];
  }
}
