import { Palette } from '@mui/material/styles/createPalette';
import set from 'lodash/set';
import get from 'lodash/get';

export class PaletteScheme {
  palette!: Palette;

  constructor(schemeOptions: { palette: any }, baseSchemeOptions: { palette: any }) {
    const { palette: schemePalette } = schemeOptions;
    const { palette: basePalette } = baseSchemeOptions;

    set(this, 'palette.primary.main', get(schemePalette, 'primary', basePalette.primary));
    if (schemePalette.primaryLight) set(this, 'palette.primary.light', schemePalette.primaryLight);
    if (schemePalette.primaryDark) set(this, 'palette.primary.dark', schemePalette.primaryDark);
    if (schemePalette.primaryContrastText) set(this, 'palette.primary.contrastText', schemePalette.primaryContrastText);

    set(this, 'palette.secondary.main', get(schemePalette, 'secondary', basePalette.secondary));
    if (schemePalette.secondaryLight)
      set(this, 'palette.secondary.light', get(schemePalette, 'secondaryLight', basePalette.secondary));
    if (schemePalette.secondaryDark)
      set(this, 'palette.secondary.primaryDark', get(schemePalette, 'secondaryDark', basePalette.secondary));
    if (schemePalette.secondaryContrastText)
      set(this, 'palette.secondary.contrastText', get(schemePalette, 'secondaryContrastText', basePalette.secondary));

    set(this, 'palette.grey.100', get(schemePalette, 'grey100', basePalette.grey100));
    set(this, 'palette.grey.200', get(schemePalette, 'grey200', basePalette.grey200));
    set(this, 'palette.grey.300', get(schemePalette, 'grey300', basePalette.grey300));
    set(this, 'palette.grey.400', get(schemePalette, 'grey400', basePalette.grey400));
    set(this, 'palette.grey.500', get(schemePalette, 'grey500', basePalette.grey500));
    set(this, 'palette.grey.600', get(schemePalette, 'grey600', basePalette.grey600));
    set(this, 'palette.grey.700', get(schemePalette, 'grey700', basePalette.grey700));

    set(this, 'palette.text.primary', get(schemePalette, 'primaryTextColor', basePalette.primaryTextColor));
    set(this, 'palette.text.secondary', get(schemePalette, 'secondaryTextColor', basePalette.secondaryTextColor));

    set(this, 'palette.error.main', get(schemePalette, 'errorColor', basePalette.errorColor));

    set(this, 'palette.common.black', get(schemePalette, 'commonBlack', basePalette.commonBlack));
    set(this, 'palette.common.white', get(schemePalette, 'commonWhite', basePalette.commonWhite));

    if (schemePalette.backgroundDefault) {
      set(this, 'palette.background.default', get(schemePalette, 'backgroundDefault', schemePalette.backgroundDefault));
      set(this, 'palette.background.light', get(schemePalette, 'backgroundLight', schemePalette.backgroundDefault));

      // TODO: Adjust this
      set(this, 'palette.background.dark', get(schemePalette, 'backgroundDark', schemePalette.backgroundDefault));
      // Some MUI and component library styles apply the scheme background color by default, so we want to override it to have more control
      set(this, 'palette.background.paper', 'transparent');
    }
  }
}
