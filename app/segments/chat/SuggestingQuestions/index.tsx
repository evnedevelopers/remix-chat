import { FC } from "react";
import { useSelector } from "react-redux";

import { v4 as uuidv4 } from 'uuid';

import { Box, Skeleton, Typography } from "@mui/material";

import { Grid } from "~/components/common/Grid";

import { getIsChatTyping } from "~/store/selectors/chat.selectors";
import { ISuggestingQuestions } from "~/store/typedefs";

import { styles } from './styles';

type SuggestingQuestionsProps = {
  questions: ISuggestingQuestions;
  handleSendMessage: (question: string) => void;
};

export const SuggestingQuestions: FC<SuggestingQuestionsProps> = ({
  questions,
  handleSendMessage,
}) => {
  const isTyping = useSelector(getIsChatTyping);
  const handleClick = (question: string) => {
    if (!isTyping) {
      handleSendMessage(question);
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