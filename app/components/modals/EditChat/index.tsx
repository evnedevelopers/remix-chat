import { FC } from "react";
import { useDispatch } from "react-redux";

import { useSnackbar } from "notistack";

import { Box, Typography } from "@mui/material";

import FinalForm from "~/components/FinalForm";

import { ModalTypes } from "~/store/types";
import { AppDispatch } from "~/store";
import { projectsActions } from "~/store/bus/projects/projects.actions";
import { modalActions } from "~/store/bus/modal/modal.actions";

import { styles } from './styles';
import ChatEdit, {schema} from "~/components/forms/ChatEdit";

type EditChatProps = {
  text: string;
  chatId: number;
  projectName: string;
  cancelButton: {
    text: string;
  };
  confirmButton: {
    text: string;
  };
};

export const EditChat: FC<
  ModalTypes.ModalComponentProps<EditChatProps>
> = ({ chatId, projectName }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (payload: any) => {
    dispatch(
      projectsActions.updateChat({
        ...payload,
        values: {
          id: chatId,
          ...payload.values,
        },
      }),
    );
  };

  const handleSuccess = () => {
    dispatch(modalActions.closeModal('EditChat'));
    enqueueSnackbar('Changes saved', {
      variant: 'infoSnackbar',
    });
  };

  return (
    <Box sx={styles.editChat}>
      <Box sx={styles.titleWrapper}>
        <Typography variant={'body1'}>
          You can edit the name of the chat or delete it
        </Typography>
      </Box>
      <FinalForm
        initialValues={{ name: projectName, id: chatId }}
        component={ChatEdit}
        extraProps={{ chatId }}
        onSubmit={handleSubmit}
        onSubmitSuccess={handleSuccess}
        schema={schema}
      />
    </Box>
  );
};

export default EditChat;