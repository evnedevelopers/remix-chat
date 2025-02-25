import { createSelector } from "reselect";
import { RootState } from "~/store";

const aiConversationSelectors = (state: RootState) => state.aiConversation;

export const getIsAiConversationFetching = createSelector(
  [aiConversationSelectors],
  (result) => {
    return result.isFetching;
  },
);

export const getIsAudioFetching = createSelector(
  [aiConversationSelectors],
  (result) => {
    return result.isAudioFetching;
  },
);

export const getIsPlaying = createSelector(
  [aiConversationSelectors],
  (result) => {
    return result.isPlaying;
  },
);

export const getIsMessageFetching = createSelector(
  [aiConversationSelectors],
  (result) => {
    return result.isMessageFetching;
  },
);

export const getNextSession = createSelector(
  [aiConversationSelectors],
  (result) => {
    return result.nextSession;
  },
);

export const getSessions = createSelector(
  [aiConversationSelectors],
  ({ sessions }) => {
    return sessions;
  },
);

export const getSessionMessages = (
  year?: number,
  month?: string,
  sessionId?: number,
) =>
  createSelector([aiConversationSelectors], ({ sessions }) => {
    if (!sessionId || !year || !month) {
      return null;
    }

    return (
      sessions
        .find((session) => session.id === year)
        ?.months.find((item) => item.id === month)
        ?.sessions.find((session) => session.id === +sessionId)?.messages ??
      null
    );
  });

export const getIsSessionLive = (
  year?: number,
  month?: string,
  sessionId?: string,
) =>
  createSelector([aiConversationSelectors], ({ sessions }) => {
    if (!sessionId || !year || !month) {
      return false;
    }

    return (
      !sessions
        .find((session) => session.id === year)
        ?.months.find((item) => item.id === month)
        ?.sessions.find((session) => session.id === sessionId)?.isCompleted ||
      false
    );
  });

export const getSessionLiveId = createSelector(
  [aiConversationSelectors],
  ({ sessions }) => {
    const lastYear = sessions.find((year) =>
      year.months.some((month) =>
        month.sessions.some((session) => !session.isCompleted),
      ),
    );
    const lastMonth = lastYear?.months.find((month) =>
      month.sessions.some((session) => !session.isCompleted),
    );

    return (
      lastMonth?.sessions.find((session) => !session.isCompleted)?.id ?? null
    );
  },
);

export const getNextMessagesUrl = (
  year?: number,
  month?: string,
  sessionId?: string,
) =>
  createSelector([aiConversationSelectors], ({ sessions }) => {
    if (!sessionId || !year || !month) {
      return null;
    }

    if (sessions.length) {
      return (
        sessions
          .find((session) => session.id === year)
          ?.months.find((item) => item.id === month)
          ?.sessions.find((session) => session.id === +sessionId)?.messages
          ?.next ?? null
      );
    }

    return null;
  });

export const getDescription = (
  year?: number,
  month?: string,
  sessionId?: string,
) =>
  createSelector([aiConversationSelectors], ({ sessions }) => {
    if (!sessionId || !year || !month) {
      return null;
    }

    if (sessions.length) {
      return (
        sessions
          .find((session) => session.id === year)
          ?.months.find((item) => item.id === month)
          ?.sessions.find((session) => session.id === +sessionId)
          ?.projectDescription ?? null
      );
    }

    return null;
  });

export const getIsLive = createSelector(
  [aiConversationSelectors],
  ({ sessions }) => {
    return sessions.some((session) =>
      session.months.some((item) =>
        item.sessions.some((session) => !session.isCompleted),
      ),
    );
  },
);

export const getIsStartSession = createSelector(
  [aiConversationSelectors],
  ({ sessions }) => {
    return sessions.some((session) =>
      session.months.some((item) =>
        item.sessions.some((session) => session.isCompleted === null),
      ),
    );
  },
);

export const getLiveSession = createSelector(
  [aiConversationSelectors],
  ({ sessions }) => {
    const lastYear = sessions.find((year) =>
      year.months.some((month) =>
        month.sessions.some((session) => !session.isCompleted),
      ),
    );
    const lastMonth = lastYear?.months.find((month) =>
      month.sessions.some((session) => !session.isCompleted),
    );

    return (
      lastMonth?.sessions.find((session) => !session.isCompleted)?.endAt ?? ''
    );
  },
);

export const getIsNextSession = createSelector(
  [aiConversationSelectors],
  ({ sessions }) => {
    return sessions.some((session) =>
      session.months.some((item) =>
        item.sessions.some((session) => session.nextSession),
      ),
    );
  },
);

export const getIsMock = createSelector(
  [aiConversationSelectors],
  ({ sessions }) => {
    return sessions.some((session) =>
      session.months.some((item) =>
        item.sessions.some((session) =>
          session.messages?.results.some((message) => message.id === 'mock'),
        ),
      ),
    );
  },
);

export const getIsError = createSelector(
  [aiConversationSelectors],
  ({ sessions }) => {
    return sessions.some((session) =>
      session.months.some((item) =>
        item.sessions.some((session) =>
          session.messages?.results.some((message) => message.id === 'error'),
        ),
      ),
    );
  },
);

export const getLastMessageSessionId = createSelector(
  [aiConversationSelectors],
  ({ lastMessageSessionId }) => {
    return lastMessageSessionId;
  },
);

export const getAllAudios = (
  year?: number,
  month?: string,
  sessionId?: string,
) =>
  createSelector([aiConversationSelectors], ({ sessions }) => {
    if (!sessionId || !year || !month) {
      return [];
    }

    if (sessions.length) {
      const currentMessages = sessions
        .find((session) => session.id === year)
        ?.months.find((item) => item.id === month)
        ?.sessions.find((session) => session.id === +sessionId);

      if (!currentMessages?.isCompleted) {
        return currentMessages?.messages
          ? currentMessages.messages.results
            .filter((message) => message.isLive && message.audios.length)
            .map((message) => ({ id: message.id, audios: message.audios }))
            .filter((item) => item.audios.length)
            .reverse()
          : [];
      }

      return currentMessages?.messages
        ? currentMessages.messages.results
          .filter((message) => message?.audios?.length)
          .map((message) => ({ id: message.id, audios: message?.audios }))
          .filter((item) => item.audios?.length)
        : [];
    }

    return [];
  });

export const getIsAudioPlay = createSelector(
  [aiConversationSelectors],
  ({ isAudioPlaying }) => {
    return isAudioPlaying;
  },
);

export const getIsPlayingWaiting = createSelector(
  [aiConversationSelectors],
  ({ isPlayingWaiting }) => {
    return isPlayingWaiting;
  },
);

export const getActiveSessionId = createSelector(
  [aiConversationSelectors],
  ({ activeSessionId }) => {
    return activeSessionId;
  },
);

export const getStartIndex = createSelector(
  [aiConversationSelectors],
  ({ startIndex }) => {
    return startIndex;
  },
);

export const getLastLink = createSelector(
  [aiConversationSelectors],
  ({ sessions }) => {
    const isLive = sessions.some((session) =>
      session.months.some((item) =>
        item.sessions.some((session) => !session.isCompleted),
      ),
    );

    if (isLive && sessions.length) {
      const lastYear = sessions.find((year) =>
        year.months.some((month) =>
          month.sessions.some((session) => !session.isCompleted),
        ),
      );
      const lastMonth = lastYear?.months.find((month) =>
        month.sessions.some((session) => !session.isCompleted),
      );
      const lastSession = lastMonth?.sessions.find(
        (session) => !session.isCompleted,
      );

      return `${lastYear?.id}/${lastMonth?.id}/${lastSession?.id}`;
    }
    if (!isLive && sessions.length) {
      const lastYear = sessions[0];
      const lastMonth = lastYear.months[0];
      const lastSession = lastMonth.sessions[0];

      return `${lastYear.id}/${lastMonth.id}/${lastSession.id}`;
    }

    return '';
  },
);