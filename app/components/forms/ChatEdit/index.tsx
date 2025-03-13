import { useDispatch } from 'react-redux';
import { Field, FormRenderProps } from 'react-final-form';

import { Box, Button, Typography } from '@mui/material';
import { RenderChatNameField } from './fields/RenderChatNameField';

// RENDER_FIELDS
import { modalActions } from "~/store/bus/modal/modal.actions";
import { AppDispatch } from "~/store";

import { schema } from './schema';
import { styles } from './styles';


const ChatEdit = ({
  ...props
}: FormRenderProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = () => {};

  const handleClick = () => {
    dispatch(
      modalActions.modal({
        component: 'ConfirmOrCancel',
        forceClose: false,
        onCancel: () => handleSubmit(),
        onConfirm: () => {
          dispatch(modalActions.closeModal('ConfirmOrCancel'));
          dispatch(modalActions.closeModal('EditStoryChat'));
        },
        modalPayload: {
          title: 'Confirm Action',
          body: 'Are you sure you want to delete this chat? You will not be able to recover it and its saved messages',
        },
        cancelButton: {
          text: 'Delete',
        },
        confirmButton: {
          text: 'Cancel',
        },
      }),
    );
  };

  return (
    <form noValidate onSubmit={props.handleSubmit}>
      <Box
        maxWidth={'450px'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}>
        <Box p={'20px'} width={'100%'}>
          <Field name={'name'} component={RenderChatNameField} />
        </Box>
        {/*FIELDS*/}
        <Box sx={styles.buttonWrapper}>
          <Button variant={'primary'} fullWidth type={'submit'} role={'submit'}>
            <Typography variant={'button'} color={'primary.contrastText'}>
              Save changes
            </Typography>
          </Button>
          <Button variant={'secondary'} fullWidth onClick={handleClick} disabled>
            <Typography variant={'button'} color={'text.primary'}>
              Delete chat
            </Typography>
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ChatEdit;

export { schema, ChatEdit };
