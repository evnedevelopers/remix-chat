import { Components, Theme } from '@mui/material';
import { SystemCssProperties } from '@mui/system/styleFunctionSx/styleFunctionSx';

export const MuiSvgIcon: Partial<Components<Theme>> = {
  MuiSvgIcon: {
    defaultProps: {
      fontSize: 'medium',
    },
    styleOverrides: {
      root: ({ ownerState: { sx } }) => {
        if (sx && (sx as SystemCssProperties<Theme>)?.fontSize) {
          const { fontSize } = sx as SystemCssProperties<Theme>;

          return {
            width: `${fontSize as string}!important`,
            height: `${fontSize as string}!important`,
          };
        }
      },
    },

    variants: [
      {
        props: {
          fontSize: 'medium',
        },
        style: {
          fontSize: '32px',
          width: '32px',
          height: '32px',
        },
      },
      {
        props: {
          fontSize: 'small',
        },
        style: {
          fontSize: '24px',
          width: '24px',
          height: '24px',
        },
      },
      {
        props: {
          fontSize: 'large',
        },
        style: {
          fontSize: '40px',
          width: '40px',
          height: '40px',
        },
      },
    ],
  },
};
