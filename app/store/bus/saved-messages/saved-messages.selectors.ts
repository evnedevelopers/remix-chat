import { createSelector } from "reselect";

import { RootState } from "~/store";

const savedMessagesSelectors = (state: RootState) => state.savedMessages;

export const getScrollToMessageId = createSelector(
  [savedMessagesSelectors],
  (result) => {
    return result.scrollToMessageId;
  },
);
