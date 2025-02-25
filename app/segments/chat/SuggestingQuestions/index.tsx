import { FC } from "react";
import { useSelector } from "react-redux";

import { v4 as uuidv4 } from 'uuid';

import { Box, Skeleton, Typography } from "@mui/material";

import { Grid } from "~/components/common/Grid";

import { useChatParams } from "~/segments/chat/view/ChatIndexView/useChatParams";
import { SendMessageFunction} from "~/segments/chat/view/ChatIndexView/useChatPage";

import { getIsChatTyping } from "~/store/bus/chat/chat.selectors";
import { getCurrentFile } from "~/store/bus/projects/projects.selectors";
import { ISuggestingQuestions } from "~/store/bus/chat/typedefs";

import { styles } from './styles';

type SuggestingQuestionsProps = {
  questions: ISuggestingQuestions;
  handleSendMessage: SendMessageFunction;
};

export const SuggestingQuestions: FC<SuggestingQuestionsProps> = ({
  questions,
  handleSendMessage,
}) => {
  const { chatId, projectName } = useChatParams();
  const { isFileContext } = useSelector(
    getCurrentFile(chatId, projectName),
  );
  const isTyping = useSelector(getIsChatTyping);
  const handleClick = (question: string) => {
    if (!isTyping) {
      handleSendMessage(question, isFileContext);
    }
  };

  return (
    <Box sx={styles.suggestingQuestions}>
      <Grid container spacing={'8px'}>
        {questions.questions.map((question) => (
          <Grid key={uuidv4()} item xs={12} md={6} lg={3}>
            {questions.isSkeleton ? (
              <Skeleton
                variant={'text'}
                sx={{
                  fontSize: '14px',
                  height: '42px',
                  lineHeight: '1.9',
                }}
              />
            ) : (
              <Box sx={styles.wrapper} onClick={() => handleClick(question)}>
                <Typography variant={'body1'} color={'text.primary'}>
                  {question}
                </Typography>
              </Box>
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};