const createPath = (...slug: string[]) => {
  if (slug[0].startsWith('http')) return slug[0];

  if (slug[0].startsWith('mailto:')) {
    return slug[0];
  }

  const path = slug.join('/').replace(/\/\//g, '/');
  if (path[0] === '/') return path;
  else return '/' + path;
};

export default createPath;
