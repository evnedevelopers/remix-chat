import { FC } from "react";
import { Box, TextField, useTheme } from "@mui/material";

import { useMessageInput } from "~/segments/chat/MessageInput/useMessageInput";
import Send from "~/components/icons/Send";
import { Tooltip } from "~/components/uiKit/Tooltip";
import { UpgradeTooltip } from "~/components/uiKit/Tooltip/UpgradeTooltip";
import { IconButton } from "~/components/uiKit/IconButton";

import { styles } from './styles';

type MessageInputProps = {
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: any;
}

export const MessageInput: FC<MessageInputProps> = ({
  value,
  setValue,
}) => {
  const theme = useTheme();
  const { handleKeyPress, handleChange } =
    useMessageInput(setValue, value);

  const handleClick = () => {}

  return (
    <Box sx={styles.messageInput} className={'step-3'}>
      <Box
        sx={[
          styles.wrapper,
        ]}>
        <Box
          width={'100%'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <Box sx={[styles.inputWrapper]}>
            <TextField
              sx={styles.input}
              multiline
              inputProps={{
                'data-testid': 'send-message-message',
              }}
              required
              maxRows={6}
              minRows={1}
              fullWidth
              placeholder={'Type a message...'}
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyPress}
            />
          </Box>

          <Box display={'flex'}>
            {value.trim().length ? (
              <Tooltip
                title={<UpgradeTooltip />}
                placement={'top'}
                id={'text'}
                zIndex={10000}
                open={false}>
                <Box display={'flex'}>
                  <IconButton
                    onClick={handleClick}
                    color={'secondary'}
                    disabled={
                      !value.trim().length
                    }>
                    <Send
                      fontSize={'small'}
                      htmlColor={theme.palette.text.primary}
                    />
                  </IconButton>
                </Box>
              </Tooltip>
            ) : (
              <>

              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}