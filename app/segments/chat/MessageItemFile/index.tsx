import { FC } from "react";

import { Box, Typography, useTheme } from "@mui/material";

import AttachFile from "~/components/icons/AttachFile";

import { IChatFile } from "~/utils/typedefs";

import { styles } from './styles';

type MessageItemFileProps = {
  file: IChatFile;
};

export const MessageItemFile: FC<MessageItemFileProps> = ({ file }) => {
  const theme = useTheme();

  return (
    <Box sx={styles.messageItemFile}>
      <Box sx={styles.wrapper}>
        <AttachFile
          sx={{fontSize: '20px'}}
          htmlColor={theme.palette.text.primary}
        />
        <Typography variant={'body1'} color={'text.primary'} ml={'10px'}>
          {file.file_name}
        </Typography>
      </Box>
    </Box>
  );
}