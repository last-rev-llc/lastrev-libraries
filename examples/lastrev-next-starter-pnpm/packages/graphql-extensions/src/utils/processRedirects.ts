import mapValues from 'lodash/mapValues';
import values from 'lodash/values';
import set from 'lodash/set';
import keyBy from 'lodash/keyBy';
import get from 'lodash/get';
import last from 'lodash/last';

interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
}

interface Dictionary<T> {
  [index: string]: T;
}

const filter = /^(api|\/api|_next\/static|favicon\.ico)/;

const processRedirects = (redirects: Redirect[]): Redirect[] => {
  const edges: Dictionary<Redirect> = keyBy(redirects, 'source');

  const findPaths = (obj: Dictionary<Redirect>, fromPath: string, visitedPaths: string[] = []): any => {
    const toPath = get(obj, `[${fromPath}['destination']`) as unknown as string;
    const isCircular = visitedPaths.includes(toPath);
    if (!toPath || toPath === fromPath || isCircular) {
      if (isCircular) {
        console.log('CIRCULAR');
      }
      return visitedPaths;
    }
    visitedPaths.push(toPath);
    return findPaths(obj, toPath, visitedPaths);
  };
  return values(
    mapValues(edges, (r) => {
      const allPaths = findPaths(edges, r.source);
      set(r, 'source', r.source.endsWith('/') ? `${r.source}index.html` : r.source);
      set(r, 'destination', last(allPaths) || '/');
      return r;
    })
  ).filter((o) => !o.source?.match(filter) && !o.destination?.match(filter));
};

export default processRedirects;
