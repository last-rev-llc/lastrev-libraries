/**
 * Creates a proxy that throws an error when any property is accessed.
 * Used to provide helpful errors when wrong loader type is used.
 */
export function createUnavailableLoaderProxy<T extends object>(unavailableCms: 'Sanity' | 'Contentful'): T {
  const activeCms = unavailableCms === 'Sanity' ? 'Contentful' : 'Sanity';
  const correctLoader = activeCms === 'Sanity' ? 'sanityLoaders' : 'loaders';

  return new Proxy({}, {
    get(_target, prop) {
      if (typeof prop === 'symbol') return undefined;
      throw new Error(
        `Cannot access ${unavailableCms} loaders (property '${String(prop)}'). ` +
          `This project uses ${activeCms}. Use ctx.${correctLoader} instead.`
      );
    }
  }) as T;
}
