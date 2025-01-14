import { PaletteOptions } from '@mui/material/styles/createPalette';
export const light: PaletteOptions = {
  mode: 'light',
  common: {
    white: '#ffffff',
    red: '#FF6565',
    green: '#65FF74',
    text: {
      contrast: 'rgb(255, 255, 255)',
      link: 'rgb(56, 136, 203)',
    },
    surface: {
      contrast: 'rgb(0, 0, 0)',
      'surface 1': 'rgb(246, 246, 249)',
      'surface 2': 'rgb(238, 241, 255)',
      'surface 3': 'rgb(255, 255, 255)',
      'surface 4': 'rgb(238, 241, 255)',
      'surface 5': 'rgb(241, 250, 255)',
      'surface 6': 'rgb(231, 243, 255)',
      'surface 44': 'rgba(255, 255, 255, 0.7)',
      'surface 45': '#C0BCC8',
      'surface 46': '#DBD7E2',
      'surface 47': '#FFFFFF',
      'surface 48': '#C8E6C9',
      'surface 49': '#E6DAC8',
    },
    action: {
      normal: 'rgba(219, 225, 255, 0.5400000214576721)',
      hover: 'rgba(181, 193, 255, 0.5400000214576721)',
      pressed: 'rgba(181, 193, 255, 0.5400000214576721)',
      'normal 2': 'rgb(231, 243, 255)',
      'hover 2': 'rgba(213, 228, 255, 0.30000001192092896)',
      'hover 3': 'rgb(231, 243, 255)',
    },
    success: {
      main: 'rgb(200, 230, 201)',
      'contrast text': 'rgb(41, 77, 42)',
    },
    warning: {
      light: 'rgb(225, 230, 200)',
      'contrast text': 'rgb(77, 56, 41)',
    },
  },
  primary: {
    main: 'rgb(53, 119, 203)',
    light: 'rgb(92, 160, 229)',
    dark: 'rgb(45, 102, 186)',
    contrastText: 'rgb(255, 255, 255)',
  },
  secondary: {
    main: 'rgb(238, 241, 255)',
    light: 'rgb(245, 245, 245)',
    dark: 'rgb(189, 195, 248)',
    contrastText: 'rgb(85, 78, 122)',
  },
  error: {
    main: 'rgb(195, 63, 56)',
    light: 'rgb(222, 94, 86)',
    dark: 'rgb(183, 56, 49)',
    contrastText: 'rgb(255, 255, 255)',
  },
  warning: {
    main: 'rgb(222, 114, 45)',
    light: 'rgb(242, 156, 56)',
    dark: 'rgb(214, 90, 38)',
    contrastText: 'rgb(255, 255, 255)',
  },
  info: {
    main: 'rgb(56, 136, 203)',
    light: 'rgb(72, 168, 238)',
    dark: 'rgb(32, 88, 150)',
    contrastText: 'rgb(255, 255, 255)',
  },
  success: {
    main: 'rgb(69, 122, 59)',
    light: 'rgb(129, 186, 119)',
    dark: 'rgb(47, 93, 40)',
    contrastText: 'rgb(255, 255, 255)',
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
    primary: 'rgba(0, 0, 0, 0.8700000047683716)',
    secondary: 'rgba(0, 0, 0, 0.6000000238418579)',
    disabled: 'rgba(0, 0, 0, 0.3799999952316284)',
  },
  divider: 'rgba(0, 0, 0, 0.11999999731779099)',
  background: {
    paper: 'rgb(255, 255, 255)',
    default: 'rgb(255, 255, 255)',
  },
  action: {
    active: 'rgba(219, 225, 255, 0.5400000214576721)',
    hover: 'rgba(219, 225, 255, 0.5400000214576721)',
    selected: 'rgba(219, 225, 255, 0.6800000071525574)',
    disabled: 'rgba(0, 0, 0, 0.1599999964237213)',
    disabledBackground: 'rgba(0, 0, 0, 0.05999999865889549)',
    focus: 'rgba(0, 0, 0, 0.11999999731779099)',
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
    success: {
      main: string;
      'contrast text': string;
    };
    warning: {
      light: string;
      'contrast text': string;
    };
  }
  export interface PaletteOptions {
    common?: Partial<CommonColors>;
  }
}
