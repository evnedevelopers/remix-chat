import React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { Box, TextField } from '@mui/material';

import { getFieldError } from '../../../FinalForm/getFieldError';

export const RenderChatNameField: React.FC<FieldRenderProps<string>> = ({
  input,
  meta,
}) => {
  return (
    <Box>
      <TextField
        inputProps={{
          'data-testid': `chat-edit-chat-name`,
        }}
        required
        fullWidth
        label={'Enter title'}
        error={!!getFieldError(meta)}
        helperText={getFieldError(meta)}
        {...input}
      />
    </Box>
  );
};
