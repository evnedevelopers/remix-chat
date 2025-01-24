import React, { FC } from 'react';

import { Box, Typography, useTheme } from '@mui/material';

import Edit from "~/components/icons/Edit";
import { IconButton } from "~/components/uiKit/IconButton";
import { IconContainer } from "~/components/common/IconContainer";

import { styles } from './styles';

type FolderItemProps = {
  handleClick: () => void;
  handleAction?: () => void;
  name: string;
  withAction: boolean;
  active: boolean;
  iconDark?: string;
  iconLight?: string;
  isLive?: boolean;
};

export const FolderItem: FC<FolderItemProps> = ({
  handleClick,
  handleAction,
  name,
  withAction,
  active,
  iconDark,
  iconLight,
  isLive = false,
}) => {
  const theme = useTheme();

  const editOrCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    handleAction?.();
  };

  return (
    <Box
      sx={[styles.folderItem, active && styles.folderActive]}
      onClick={handleClick}>
      <Typography
        variant={'button'}
        textTransform={'unset'}
        maxWidth={'225px'}
        color={isLive ? 'text.primary' : 'text.secondary'}
        overflow={'hidden'}
        textOverflow={'ellipsis'}
        whiteSpace={'nowrap'}>
        {isLive ? 'Live' : name}
      </Typography>
      {iconLight && iconDark && (
        <IconContainer darkIcon={iconDark} lightIcon={iconLight} size={24} />
      )}
      {withAction && (
        <IconButton color={'success'} onClick={editOrCancel}>
          <Edit fontSize={'small'} htmlColor={theme.palette.text.secondary} />
        </IconButton>
      )}
    </Box>
  );
};
