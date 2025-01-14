import { PaletteOptions } from '@mui/material/styles/createPalette';
export const dark: PaletteOptions = {
  mode: 'dark',
  common: {
    white: '#ffffff',
    red: '#FF6565',
    green: '#65FF74',
    text: {
      contrast: 'rgba(0, 0, 0, 0.8700000047683716)',
      link: 'rgb(91, 177, 255)',
    },
    surface: {
      contrast: 'rgb(255, 255, 255)',
      'surface 1': 'rgb(40, 40, 40)',
      'surface 2': 'rgb(56, 55, 59)',
      'surface 3': 'rgb(56, 55, 59)',
      'surface 4': 'rgb(38, 38, 38)',
      'surface 5': 'rgb(30, 29, 32)',
      'surface 6': 'rgb(30, 29, 32)',
      'surface 44': 'rgba(255, 255, 255, 0.1)',
      'surface 45': '#151515',
      'surface 46': '#202020',
      'surface 47': '#444444',
      'surface 48': '#C8E6C9',
      'surface 49': '#E6DAC8',
    },
    action: {
      normal: 'rgba(219, 225, 255, 0.20000000298023224)',
      hover: 'rgba(181, 193, 255, 0.20000000298023224)',
      pressed: 'rgba(181, 193, 255, 0.20000000298023224)',
      'normal 2': 'rgba(136, 136, 136, 0.18000000715255737)',
      'hover 2': 'rgba(136, 136, 136, 0.18000000715255737)',
      'hover 3': 'rgb(37, 37, 37)',
    },
    warning: {
      light: 'rgb(196, 163, 140)',
      'contrast text': 'rgb(77, 56, 41)',
    },
    success: {
      main: 'rgb(100, 122, 100)',
      'contrast text': 'rgb(0, 0, 0)',
    },
  },
  primary: {
    main: 'rgb(2, 114, 198)',
    light: 'rgb(8, 157, 242)',
    dark: 'rgb(0, 87, 153)',
    contrastText: 'rgb(0, 0, 0)',
  },
  secondary: {
    main: 'rgb(29, 29, 29)',
    light: 'rgb(38, 38, 38)',
    dark: 'rgb(21, 21, 21)',
    contrastText: 'rgba(255, 255, 255, 0.8700000047683716)',
  },
  error: {
    main: 'rgb(226, 82, 65)',
    light: 'rgb(215, 121, 118)',
    dark: 'rgb(195, 63, 56)',
    contrastText: 'rgb(255, 255, 255)',
  },
  warning: {
    main: 'rgb(243, 170, 71)',
    light: 'rgb(245, 185, 97)',
    dark: 'rgb(230, 129, 49)',
    contrastText: 'rgb(0, 0, 0)',
  },
  info: {
    main: 'rgb(88, 181, 240)',
    light: 'rgb(110, 193, 242)',
    dark: 'rgb(56, 136, 203)',
    contrastText: 'rgba(0, 0, 0, 0.8700000047683716)',
  },
  success: {
    main: 'rgb(123, 184, 114)',
    light: 'rgb(145, 196, 138)',
    dark: 'rgb(80, 139, 70)',
    contrastText: 'rgb(26, 26, 26)',
  },
  grey: {
    '50': 'rgb(250, 250, 250)',
    '100': 'rgb(245, 245, 245)',
    '200': 'rgb(238, 238, 238)',
    '300': 'rgb(224, 224, 224)',
    '400': 'rgb(189, 189, 189)',
    '500': 'rgb(158, 158, 158)',
    '600': 'rgb(117, 117, 117)',
    '700': 'rgb(97, 97, 97)',
    '800': 'rgb(66, 66, 66)',
    '900': 'rgb(33, 33, 33)',
    A100: 'rgb(245, 245, 245)',
    A200: 'rgb(238, 238, 238)',
    A400: 'rgb(189, 189, 189)',
    A700: 'rgb(97, 97, 97)',
  },
  text: {
    primary: 'rgb(255, 255, 255)',
    secondary: 'rgba(255, 255, 255, 0.6000000238418579)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },
  divider: 'rgba(255, 255, 255, 0.23999999463558197)',
  background: {
    paper: 'rgb(51, 51, 51)',
    default: 'rgb(29, 29, 29)',
  },
  action: {
    active: 'rgba(255, 255, 255, 0.11999999731779099)',
    hover: 'rgba(255, 255, 255, 0.07999999821186066)',
    selected: 'rgba(255, 255, 255, 0.1599999964237213)',
    disabled: 'rgba(255, 255, 255, 0.30000001192092896)',
    disabledBackground: 'rgba(255, 255, 255, 0.11999999731779099)',
    focus: 'rgba(255, 255, 255, 0.11999999731779099)',
  },
};
// types
declare module '@mui/material/styles/createPalette' {
  export interface CommonColors {
    white: string;
    red: string;
    green: string;
    text: {
      contrast: string;
      link: string;
    };
    surface: {
      contrast: string;
      'surface 1': string;
      'surface 2': string;
      'surface 3': string;
      'surface 4': string;
      'surface 5': string;
      'surface 6': string;
      'surface 44': string;
      'surface 45': string;
      'surface 46': string;
      'surface 47': string;
      'surface 48': string;
      'surface 49': string;
    };
    action: {
      normal: string;
      hover: string;
      pressed: string;
      'normal 2': string;
      'hover 2': string;
      'hover 3': string;
    };
    warning: {
      light: string;
      'contrast text': string;
    };
    success: {
      main: string;
      'contrast text': string;
    };
  }
  export interface PaletteOptions {
    common?: Partial<CommonColors>;
  }
}
