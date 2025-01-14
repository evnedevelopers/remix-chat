import React from 'react';

import { Interpolation, TypographyProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

export const typographyVariants:
  | {
      props: Partial<TypographyProps<'span', {}>>;
      style: Interpolation<{ theme: Theme }>;
    }[]
  | undefined = [
  {
    props: {
      variant: 'title',
    },
    style: {
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: '25px',
      lineHeight: '30.000001907348633px',
      letterSpacing: '0px',
    },
  },
  {
    props: {
      variant: 'h1',
    },
    style: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      fontSize: '96px',
      lineHeight: '117.02400207519531px',
      letterSpacing: '0px',
    },
  },
  {
    props: {
      variant: 'h2',
    },
    style: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      fontSize: '60px',
      lineHeight: '73.13999938964844px',
      letterSpacing: '0px',
    },
  },
  {
    props: {
      variant: 'h3',
    },
    style: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      fontSize: '48px',
      lineHeight: '58.512001037597656px',
      letterSpacing: '0px',
    },
  },
  {
    props: {
      variant: 'h4',
    },
    style: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      fontSize: '34px',
      lineHeight: '41.44599914550781px',
      letterSpacing: '0px',
    },
  },
  {
    props: {
      variant: 'h5',
    },
    style: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      fontSize: '24px',
      lineHeight: '29.256000518798828px',
      letterSpacing: '0px',
    },
  },
  {
    props: {
      variant: 'h6',
    },
    style: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      fontSize: '20px',
      lineHeight: '24.3799991607666px',
      letterSpacing: '0px',
    },
  },
  {
    props: {
      variant: 'subtitle1',
    },
    style: {
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '19.503999710083008px',
      letterSpacing: '0px',
    },
  },
  {
    props: {
      variant: 'subtitle2',
    },
    style: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '17.06599998474121px',
      letterSpacing: '0px',
    },
  },
  {
    props: {
      variant: 'body1',
    },
    style: {
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '19.503999710083008px',
      letterSpacing: '0px',
    },
  },
  {
    props: {
      variant: 'body2',
    },
    style: {
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '17.06599998474121px',
      letterSpacing: '0px',
    },
  },
  {
    props: {
      variant: 'button',
    },
    style: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      fontSize: '13px',
      lineHeight: '15.847000122070312px',
      letterSpacing: '0.52px',
    },
  },
  {
    props: {
      variant: 'caption',
    },
    style: {
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '14.628000259399414px',
      letterSpacing: '0px',
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      MsUserSelect: 'none',
      userSelect: 'none',
    },
  },
  {
    props: {
      variant: 'overline',
    },
    style: {
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '10px',
      lineHeight: '12.1899995803833px',
      letterSpacing: '0px',
    },
  },
  {
    props: {
      variant: 'body3',
    },
    style: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: '30.600000381469727px',
      letterSpacing: '0px',
    },
  },
  {
    props: {
      variant: 'body4',
    },
    style: {
      fontFamily: 'Montserrat',
      fontWeight: 500,
      fontSize: '21px',
      lineHeight: 'normal',
      letterSpacing: '0px',
      textTransform: 'uppercase',
    },
  },
];

// types
declare module '@mui/material/Typography' {
  export interface TypographyPropsVariantOverrides {
    title: true;
    body3: true;
    body4: true;
  }
}

declare module '@mui/material/styles' {
  export interface TypographyVariantsOptions {
    title?: React.CSSProperties;
    body3?: React.CSSProperties;
    body4?: React.CSSProperties;
  }
}
