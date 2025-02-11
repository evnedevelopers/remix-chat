import { FC } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { useSnackbar } from "notistack";

import { Box, useTheme } from "@mui/material";

import ThumbDown from "~/components/icons/ThumbDown";
import Star from "~/components/icons/Star";
import StarRate from "~/components/icons/StarRate";
import ContentCopy from "~/components/icons/ContentCopy";
import ThumbUp from "~/components/icons/ThumbUp";
import { IconButton } from "~/components/uiKit/IconButton";

import { copyText } from "~/helpers/copyText";

import { getProjectId } from "~/store/selectors/projects.selector";
import { chatSlice } from "~/store/slices/chat.slice";
import { modalSlice } from "~/store/slices/modal.slice";
import { projectsActions } from "~/store/saga/projects/actions";
import { savedMessagesActions } from "~/store/saga/savedMessages/actions";
import { AppDispatch } from "~/store";

import { styles } from './styles';

type MessageActionsProps = {
  chatId: string | null;
  rate: boolean | null;
  id: string;
  message: string;
  isHuman: boolean;
  saved: string | null;
  isMockHuman: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export const MessageActions: FC<MessageActionsProps> = ({
  chatId,
  rate,
  id,
  message,
  isHuman,
  saved,
  isMockHuman,
  setIsOpen,
  isOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const { projectName } = useParams();
  const project = useSelector(getProjectId(projectName));

  const copyContent = () => {
    copyText(message);
    enqueueSnackbar('The message was copied', { variant: 'infoSnackbar' });
    setIsOpen(false);
    dispatch(chatSlice.actions.setTooltipStatus(null));
  };
  const rateMessage = (rateMessage: boolean) => {
    dispatch(chatSlice.actions.setTooltipStatus(null));
    const values = {
      chatId,
      rate: rate === null || rateMessage !== rate ? rateMessage : null,
      message_id: id,
    };

    return new Promise((resolve, reject) => {
      dispatch(projectsActions.postRate({ payload: values, meta: { resolve, reject } }));
    })
      .then(() => {
        setIsOpen(false);
        typeof values.rate === 'boolean' &&
        enqueueSnackbar(
          `The message was ${rateMessage ? 'Liked' : 'Disliked'}`,
          { variant: 'infoSnackbar' },
        );
      })
      .catch((errors) => {
        return errors;
      });
  };

  const saveMessage = () => {
    dispatch(chatSlice.actions.setTooltipStatus(null));
    if (saved) {
      dispatch(
        modalSlice.actions.modal({
          component: 'ConfirmOrCancel',
          forceClose: false,
          onCancel: () => {
            dispatch(modalSlice.actions.closeModal('ConfirmOrCancel'));
            dispatch(
              savedMessagesActions.deleteSavedMessage({
                payload: {
                  message_id: id,
                  project,
                },
              }),
            );
            enqueueSnackbar(`The message was unsaved`, {
              variant: 'infoSnackbar',
            });
            setIsOpen(false);
          },
          onConfirm: () => dispatch(modalSlice.actions.closeModal('ConfirmOrCancel')),
          modalPayload: {
            title: 'Confirm Action',
            body: 'Are you sure you want to remove this message from Saved?',
          },
          cancelButton: {
            text: 'Remove',
          },
          confirmButton: {
            text: 'Cancel',
          },
        }),
      );
    } else {
      return new Promise((resolve, reject) => {
        dispatch(
          savedMessagesActions.saveMessage({
            payload: { message_id: id, project },
            meta: { resolve, reject }
          }),
        );
      })
        .then(() => {
          setIsOpen(false);
          enqueueSnackbar(`The message was saved`, {
            variant: 'infoSnackbar',
          });
        })
        .catch((errors) => {
          return errors;
        });
    }
  };

  return (
    <Box
      sx={{
        ...styles.messageActions(isHuman),
        ...(isOpen && styles.isOpen),
      }}>
      {!isHuman && (
        <>
          <IconButton
            sx={styles.itemButton}
            onClick={() => void rateMessage(true)}>
            <ThumbUp
              sx={{ fontSize: '16px' }}
              htmlColor={
                rate
                  ? theme.palette.success.light
                  : theme.palette.text.secondary
              }
            />
          </IconButton>
          <IconButton
            sx={styles.itemButton}
            onClick={() => void rateMessage(false)}>
            <ThumbDown
              sx={{ fontSize: '16px' }}
              htmlColor={
                rate === null || rate
                  ? theme.palette.text.secondary
                  : theme.palette.error.main
              }
            />
          </IconButton>
        </>
      )}
      {!isMockHuman && (
        <IconButton onClick={saveMessage} sx={styles.itemButton}>
          {saved ? (
            <Star
              sx={{ fontSize: '16px' }}
              htmlColor={theme.palette.text.primary}
            />
          ) : (
            <StarRate
              sx={{ fontSize: '16px' }}
              htmlColor={theme.palette.text.secondary}
            />
          )}
        </IconButton>
      )}
      <IconButton sx={styles.itemButton} onClick={copyContent}>
        <ContentCopy
          sx={{ fontSize: '16px' }}
          htmlColor={theme.palette.text.secondary}
        />
      </IconButton>
    </Box>
  );
};