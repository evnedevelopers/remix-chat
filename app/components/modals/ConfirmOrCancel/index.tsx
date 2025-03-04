import { FC } from "react";

import { Box, Button, Typography, useTheme } from "@mui/material";

import Warning from "~/components/icons/Warning";

import { ModalTypes } from "~/store/types";

import { styles } from './styles';

type ConfirmOrCancelProps = {
  text: string;
  cancelButton: {
    text: string;
  };
  confirmButton: {
    text: string;
  };
};

export const ConfirmOrCancel: FC<
  ModalTypes.ModalComponentProps<ConfirmOrCancelProps>
> = ({
  closeFn,
  onCancel,
  onConfirm,
  text,
  cancelButton,
  confirmButton,
  modalPayload,
}) => {
  const theme = useTheme();
  const cancelModal = () => {
    onCancel();
    closeFn();
  };

  const confirmModal = () => {
    onConfirm();
    closeFn();
  };

  return (
    <Box
      sx={styles.root}
      display={'flex'}
      flexDirection={'column'}
      m={'32px 32px 24px'}
      alignItems={'center'}
      maxWidth={'416px'}
      gap={'29px'}>
      {text && (
        <Box>
          <Typography variant={'h5'}>{text}</Typography>
        </Box>
      )}
      <Box display={'flex'} gap={'16px'}>
        <Warning fontSize={'small'} htmlColor={theme.palette.warning.main} />
        <Box maxWidth={'312px'}>
          <Typography variant={'subtitle1'} mb={'8px'} color={'text.primary'}>
            {modalPayload?.title
              ? modalPayload.title
              : 'Some information is not saved!'}
          </Typography>
          <Typography variant={'body2'} color={'text.secondary'}>
            {modalPayload?.body
              ? modalPayload.body
              : 'You must save your changes before leaving the page.'}
          </Typography>
        </Box>
      </Box>
      <Box display={'flex'} gap={'10px'} alignSelf={'flex-end'}>
        {cancelButton && (
          <Button onClick={cancelModal} variant={'secondary'}>
            <Typography
              variant={'button'}
              color={
                modalPayload?.colorButton
                  ? modalPayload.colorButton
                  : 'text.primary'
              }>
              {cancelButton?.text || 'Cancel'}
            </Typography>
          </Button>
        )}
        <Button onClick={confirmModal} variant={'primary'}>
          <Typography variant={'button'} color={'primary.contrastText'}>
            {confirmButton?.text || 'Ok'}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};