import { PaletteAccent } from '../PaletteAccent';
import colorSchemes, { baseScheme, ColorScheme } from '../colors';

export const createPaletteAccents = () => {
  type PaletteAccents = {
    [key: string]: any;
  };

  const paletteAccents: PaletteAccents = {};

  Object.values(colorSchemes)
    .filter((colorScheme: ColorScheme) => colorScheme.buildOptions.createPaletteAccent)
    .map((colorScheme: ColorScheme) => {
      const paletteAccent = new PaletteAccent(colorScheme, baseScheme);

      if (paletteAccent) {
        paletteAccents[colorScheme.buildOptions.key] = paletteAccent;
      }
    });
  return paletteAccents;
};

export const getPaletteAccents = () => {
  const accentColors = createPaletteAccents();
  return accentColors;
};
