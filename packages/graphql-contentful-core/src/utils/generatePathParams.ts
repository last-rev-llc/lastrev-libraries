import { compact, isString, reduce } from 'lodash';
import { PagePathsParam, PathToIdMapping } from '../types';

const generatePathParams = (pathToIdMapping: PathToIdMapping, locales: string[]): PagePathsParam[] =>
  reduce(
    pathToIdMapping,
    (accum, idOrObj, path) => {
      accum.push(
        ...compact(
          locales.map((locale) => {
            if (!isString(idOrObj)) {
              if (idOrObj.blockedLocales.indexOf(locale) > -1) return null;
            }
            return {
              params: {
                slug: compact(path.split('/')),
                locale
              }
            };
          })
        )
      );
      return accum;
    },
    [] as PagePathsParam[]
  );

export default generatePathParams;
