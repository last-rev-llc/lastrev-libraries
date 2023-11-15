import { type Theme } from '../../ThemeRegistry/theme.types';

import { type CSSProperties } from '@mui/material/styles/createMixins';

type ApplyColorSchemeOverlay = (args: { theme: Theme; ownerState: any }) => CSSProperties;

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    applyColorSchemeOverlay: ApplyColorSchemeOverlay;
  }
}

export const applyColorSchemeOverlay: ApplyColorSchemeOverlay = ({
  ownerState,
  theme
}: {
  ownerState?: any;
  theme: Theme;
}) => {
  const colorScheme: string = ownerState?.color || ownerState?.backgroundColor || ownerState?.colorScheme;
  if (!colorScheme) return {};

  let overlayColorScheme = colorScheme;

  switch (colorScheme) {
    case 'white':
      overlayColorScheme = 'navy';
      break;

    case 'navy':
      overlayColorScheme = 'navy';
      break;

    case 'lightGray':
      overlayColorScheme = 'navy';
      break;

    default:
      overlayColorScheme = colorScheme;
  }

  ownerState.color = overlayColorScheme;

  return theme.mixins.applyColorScheme({ ownerState, theme });
};

export default applyColorSchemeOverlay;
