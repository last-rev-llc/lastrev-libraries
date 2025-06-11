// TODO: use built in path functions
const createPath = (...slug: string[]) => {
  let path = slug.map((segment) => segment?.trim()).join('/');

  if (path.startsWith('mailto://')) {
    return path;
  }
  if (path.startsWith('http://')) {
    return path.replace('http://', 'https://');
  }
  if (path.startsWith('https://')) {
    return path;
  }

  path = path.replace(/\/\//g, '/');
  if (path != '/' && path[0] !== '/') path = '/' + path;

  if (path != '/' && path[path.length - 1] === '/') path = path.slice(0, -1);
  return path;
};

export default createPath;
