import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Box } from '@mui/material';

import { getTheme } from "~/store/selectors/ui.selectors";
import { ThemeVariant } from "~/store/typedefs";

import { styles } from './styles';

type IconContainerProps = {
  darkIcon: string;
  lightIcon: string;
  size: number;
};

export const IconContainer: FC<IconContainerProps> = ({
  darkIcon,
  lightIcon,
  size,
}) => {
  const themes = useSelector(getTheme);
  const [icon, setIcon] = useState(lightIcon);

  useEffect(() => {
    setIcon(themes === ThemeVariant.dark ? darkIcon : lightIcon);
  }, [themes, darkIcon, lightIcon]);

  return (
    <Box
      sx={{
        ...styles.iconContainer,
        width: `${size}px`,
        height: `${size}px`,
      }}>
      {icon && (
        <Box
          component={'img'}
          alt={'icon'}
          src={icon}
          sx={{ width: `${size}px`, height: `${size}px` }}
        />
      )}
    </Box>
  );
};
