import { ComponentsVariants } from '@mui/material/styles';

function importAll(r: __WebpackModuleApi.RequireContext) {
  return r.keys().map((fileName: string) => ({
    [fileName.replace('./', '').replace('.theme.ts', '')]: r(fileName).default
  }));
}

const themesArray = importAll(require.context('../', true, /\.theme\.ts$/));

const themes: ComponentsVariants = themesArray.reduce((acc, current) => {
  return { ...acc, ...current };
}, {});

export default themes;
