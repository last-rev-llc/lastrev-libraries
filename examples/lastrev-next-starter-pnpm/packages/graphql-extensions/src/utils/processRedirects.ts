interface Redirect {
  source: string;
  destination: string;
  permanent: boolean;
}

interface Dictionary<T> {
  [index: string]: T;
}

const filter = /^(api|\/api|_next\/static|favicon\.ico)/;

export const processRedirects = (redirects: Redirect[]): Redirect[] => {
  const edges: Dictionary<Redirect> = redirects.reduce((acc, redirect) => {
    acc[redirect.source] = redirect;
    return acc;
  }, {} as Dictionary<Redirect>);

  const findPaths = (obj: Dictionary<Redirect>, fromPath: string, visitedPaths: string[] = []): string[] => {
    const toPath: string = obj[fromPath]?.destination || '';
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

  return Object.values(
    Object.keys(edges).reduce((acc, key) => {
      const r = edges[key];
      const allPaths = findPaths(edges, r.source);
      r.source = r.source.endsWith('/') ? `${r.source}index.html` : r.source;
      r.destination = allPaths[allPaths.length - 1] || '/';
      acc[key] = r;
      return acc;
    }, {} as Dictionary<Redirect>)
  ).filter((o) => !o.source?.match(filter) && !o.destination?.match(filter));
};
