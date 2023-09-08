function importAll(r: __WebpackModuleApi.RequireContext) {
  return r.keys().map((fileName: string) => ({
    [fileName.replace('./', '').replace('.theme.ts', '')]: r(fileName).default
  }));
}

const extensionsArray = importAll(require.context('../', true, /\.extension\.ts$/));

const extensions = extensionsArray.reduce((acc, current) => {
  return { ...acc, ...current };
}, {});

export default extensions;
