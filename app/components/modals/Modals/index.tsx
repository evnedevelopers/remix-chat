import { createElement, FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Dialog, Typography, useTheme } from "@mui/material";

import parse from 'html-react-parser';

import { IconButton } from "~/components/uiKit/IconButton";
import Close from "~/components/icons/Close";

import { ModalTypes } from "~/store/types";
import { getModalData } from "~/store/bus/modal/modal.selectors";
import { projectsActions } from "~/store/bus/projects/projects.actions";
import { modalActions } from "~/store/bus/modal/modal.actions";
import { getPersistModalData } from "~/store/bus/persist/persist.selectors";
import { persistActions } from "~/store/bus/persist/persist.actions";

import { styles } from './styles';

type ModalsProps = {
  registeredModals: ModalTypes.RegisteredModals;
};

export const Modals: FC<ModalsProps> = ({ registeredModals }) => {
  const modalData = useSelector(getModalData);
  const persistModalData = useSelector(getPersistModalData);
  const dispatch = useDispatch();
  const theme = useTheme();
  const data = Object.values(persistModalData).length
    ? Object.values(persistModalData)
    : Object.values(modalData);

  const close = (name: string) => {
    dispatch(projectsActions.clearVisualizePrompt());
    if (Object.values(persistModalData).length) {
      dispatch(persistActions.closeModal(name));
    } else {
      dispatch(modalActions.closeModal(name));
    }
  };

  return (
    <>
      {data.map(({ component, ...rest }: any, index) => {
        const forceClose =
          rest.forceClose === undefined ? true : rest.forceClose;
        const title = rest.title === undefined ? false : rest.title;
        const { variant } = rest;
        const key = rest.id || component + index;

        return (
          <Dialog
            key={key}
            sx={styles.root}
            open={true}
            PaperProps={{
              sx: styles[variant as keyof typeof styles],
            }}
            disableEscapeKeyDown={!forceClose}
            onClose={() => forceClose && close(component)}>
            {forceClose && (
              <Box sx={styles.titleSection} className={'titleSection'}>
                {title && (
                  <Typography variant={'h6'} color={'text.primary'}>
                    {parse(title)}
                  </Typography>
                )}
                <IconButton
                  color={'success'}
                  onClick={() => close(component)}
                  aria-label={'close'}>
                  <Close
                    fontSize={'small'}
                    htmlColor={theme.palette.text.secondary}
                  />
                </IconButton>
              </Box>
            )}
            {createElement(registeredModals[component], {
              ...rest,
              closeFn: () => close(component),
            })}
          </Dialog>
        );
      })}
    </>
  );
};
