function importAll(r: __WebpackModuleApi.RequireContext) {
  return r.keys().map((fileName: string) => ({
    [fileName.replace('./', '').replace('.theme.ts', '')]: r(fileName).default
  }));
}

const themesArray = importAll(require.context('../', true, /\.theme\.ts$/));

console.log({ themesArray });
const themes = themesArray.reduce((acc, current) => {
  console.log({ current });
  return { ...acc, ...current };
}, {});

export default themes;
