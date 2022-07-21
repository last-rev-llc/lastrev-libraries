// import { ApolloContext, PathFilterFunction, PathRuleConfig } from '@last-rev/types';
// import { PathVisitor } from './traversePathRule';
// import { PathRule } from './types';
// import PathRuleParser from './PathRuleParser';

// type IdLookupObject = {
//   rule: string;
//   pathRule: PathRule;
//   rootContentType: string;
//   isCanonical: boolean;
//   filter?: PathFilterFunction;
// };

// const createIdLookupObjects = (config: PathRuleConfig): IdLookupObject[] => {
//   return Object.entries(config).reduce((acc, [rootContentType, { filter, rules }]) => {
//     acc.push(
//       ...rules.map(({ rule, isCanonical }) => {
//         const pathRule = parser.parse(rule).PathRule();
//         return {
//           rule,
//           pathRule,
//           rootContentType,
//           isCanonical: !!isCanonical,
//           filter
//         };
//       })
//     );
//     return acc;
//   }, [] as IdLookupObject[]);
// };

// type IdToPathsContext = {};

// const idToPathsLoaderVisitor: PathVisitor<IdToPathsContext> = {};

// const parser = new PathRuleParser();

// export default class IdToPathsLoader {
//   private readonly _lookups: IdLookupObject[];

//   constructor(config: PathRuleConfig) {
//     this._lookups = createIdLookupObjects(config);
//   }

//   async loadPathsFromId(_id: string, _ctx: ApolloContext, _site?: string): Promise<PathData2[]> {
//     // TODO: IMPLEMENT
//     return [];
//   }
// }

export default {};
