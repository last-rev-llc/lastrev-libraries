import { PaletteScheme } from '../PaletteScheme';
import { baseScheme } from '../colors';

export const createSchemePalette: any = (customScheme: any) => {
  if (customScheme && customScheme?.buildOptions?.createScheme) {
    return new PaletteScheme(customScheme, baseScheme);
  }

  return new PaletteScheme(baseScheme, baseScheme);
};
