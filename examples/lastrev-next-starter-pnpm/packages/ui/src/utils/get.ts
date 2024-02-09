type Path = string | string[];

export function get(obj: any, path: Path, defaultValue?: any): any {
  if (typeof path === 'string') {
    path = path.split('.');
  }

  for (let i = 0; i < path.length; i++) {
    if (!obj || !Object.prototype.hasOwnProperty.call(obj, path[i])) {
      return defaultValue;
    }
    obj = obj[path[i]];
  }

  return obj;
}

export default get;
