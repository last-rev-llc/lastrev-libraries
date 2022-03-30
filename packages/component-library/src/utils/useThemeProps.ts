import { useTheme } from '@mui/system';
import { ThemedProps, ThemeWithProps } from '@mui/system/useThemeProps';

type UseThemeProps = <Theme extends ThemeWithProps, Props, Name extends keyof any>(params: {
  props: Props;
  name: Name;
  defaultTheme?: Theme;
}) => Props & ThemedProps<Theme, Name>;

export const useThemeProps: UseThemeProps = ({ name, props, defaultTheme }) => {
  const theme = useTheme(defaultTheme);

  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  const mergedProps = resolveProps(theme.components[name].defaultProps, props);
  return mergedProps;
};

const resolveProps = (defaultProps: any, props: any) => {
  const output = { ...props };
  Object.keys(defaultProps).forEach((propName) => {
    if (output[propName] === undefined || output[propName] === null) {
      output[propName] = defaultProps[propName];
    }
  });
  return output;
};

export default useThemeProps;
