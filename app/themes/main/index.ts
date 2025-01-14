import { PaletteMode } from '@mui/material';
import { ThemeOptions } from '@mui/material/styles';

import { MuiButton } from './components/MuiButtonBase';
import { MuiSvgIcon } from './components/MuiSVGIcon';
import { MuiTypography } from './components/MuiTypography';

import { breakpoints } from './breakpoints';
import { mixins } from './mixins';
import { dark } from './palette/dark';
import { light } from './palette/light';
import { typography } from './typography';

import { MuiOutlinedInput } from '~/themes/main/components/MuiOutlinedInput';
import { MuiIconButton } from '~/themes/main/components/MuiIconButton';
import { MuiInputLabel } from '~/themes/main/components/MuiInputLabel';
import { MuiFormHelperText } from '~/themes/main/components/MuiFormHelperText';
import { MuiInput } from '~/themes/main/components/MuiInput';

export const themeOptions: Partial<ThemeOptions> = {
  mixins,
  breakpoints,
  palette: light,
  typography,
  components: {
    ...MuiTypography,
    ...MuiButton,
    ...MuiSvgIcon,
    ...MuiOutlinedInput,
    ...MuiIconButton,
    ...MuiInputLabel,
    ...MuiFormHelperText,
    ...MuiInput,
  },
};

export const getDesignTokens = (mode: PaletteMode) => ({
  ...themeOptions,
  palette: {
    mode,
    ...(mode === 'light' ? light : dark),
  },
  components: {
    ...themeOptions.components,
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor:
            mode === 'light'
              ? light.common?.surface?.['surface 5']
              : dark.common?.surface?.['surface 5'],
        },
      },
    },
  },
});
