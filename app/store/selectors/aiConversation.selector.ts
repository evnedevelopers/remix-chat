import { createSelector } from "reselect";
import { RootState } from "~/store";

const aiConversationSelector = (state: RootState) => state.aiConversation;

export const getIsAiConversationFetching = createSelector(
  [aiConversationSelector],
  (result) => {
    return result.isFetching;
  },
);

export const getIsAudioFetching = createSelector(
  [aiConversationSelector],
  (result) => {
    return result.isAudioFetching;
  },
);

export const getIsPlaying = createSelector(
  [aiConversationSelector],
  (result) => {
    return result.isPlaying;
  },
);

export const getIsMessageFetching = createSelector(
  [aiConversationSelector],
  (result) => {
    return result.isMessageFetching;
  },
);

export const getNextSession = createSelector(
  [aiConversationSelector],
  (result) => {
    return result.nextSession;
  },
);

export const getSessions = createSelector(
  [aiConversationSelector],
  ({ sessions }) => {
    return sessions;
  },
);

export const getSessionMessages = (
  year?: string,
  month?: string,
  sessionId?: string,
) =>
  createSelector([aiConversationSelector], ({ sessions }) => {
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
  year?: string,
  month?: string,
  sessionId?: string,
) =>
  createSelector([aiConversationSelector], ({ sessions }) => {
    if (!sessionId || !year || !month) {
      return false;
    }

    return (
      !sessions
        .find((session) => session.id === year)
        ?.months.find((item) => item.id === month)
        ?.sessions.find((session) => session.id === sessionId)?.is_completed ||
      false
    );
  });

export const getSessionLiveId = createSelector(
  [aiConversationSelector],
  ({ sessions }) => {
    const lastYear = sessions.find((year) =>
      year.months.some((month) =>
        month.sessions.some((session) => !session.is_completed),
      ),
    );
    const lastMonth = lastYear?.months.find((month) =>
      month.sessions.some((session) => !session.is_completed),
    );

    return (
      lastMonth?.sessions.find((session) => !session.is_completed)?.id ?? null
    );
  },
);

export const getNextMessagesUrl = (
  year?: string,
  month?: string,
  sessionId?: string,
) =>
  createSelector([aiConversationSelector], ({ sessions }) => {
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
  year?: string,
  month?: string,
  sessionId?: string,
) =>
  createSelector([aiConversationSelector], ({ sessions }) => {
    if (!sessionId || !year || !month) {
      return null;
    }

    if (sessions.length) {
      return (
        sessions
          .find((session) => session.id === year)
          ?.months.find((item) => item.id === month)
          ?.sessions.find((session) => session.id === +sessionId)
          ?.project_description ?? null
      );
    }

    return null;
  });

export const getIsLive = createSelector(
  [aiConversationSelector],
  ({ sessions }) => {
    return sessions.some((session) =>
      session.months.some((item) =>
        item.sessions.some((session) => !session.is_completed),
      ),
    );
  },
);

export const getIsStartSession = createSelector(
  [aiConversationSelector],
  ({ sessions }) => {
    return sessions.some((session) =>
      session.months.some((item) =>
        item.sessions.some((session) => session.is_completed === null),
      ),
    );
  },
);

export const getLiveSession = createSelector(
  [aiConversationSelector],
  ({ sessions }) => {
    const lastYear = sessions.find((year) =>
      year.months.some((month) =>
        month.sessions.some((session) => !session.is_completed),
      ),
    );
    const lastMonth = lastYear?.months.find((month) =>
      month.sessions.some((session) => !session.is_completed),
    );

    return (
      lastMonth?.sessions.find((session) => !session.is_completed)?.end_at ?? ''
    );
  },
);

export const getIsNextSession = createSelector(
  [aiConversationSelector],
  ({ sessions }) => {
    return sessions.some((session) =>
      session.months.some((item) =>
        item.sessions.some((session) => session.nextSession),
      ),
    );
  },
);

export const getIsMock = createSelector(
  [aiConversationSelector],
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
  [aiConversationSelector],
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
  [aiConversationSelector],
  ({ lastMessageSessionId }) => {
    return lastMessageSessionId;
  },
);

export const getAllAudios = (
  year?: string,
  month?: string,
  sessionId?: string,
) =>
  createSelector([aiConversationSelector], ({ sessions }) => {
    if (!sessionId || !year || !month) {
      return [];
    }

    if (sessions.length) {
      const currentMessages = sessions
        .find((session) => session.id === year)
        ?.months.find((item) => item.id === month)
        ?.sessions.find((session) => session.id === +sessionId);

      if (!currentMessages?.is_completed) {
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
  [aiConversationSelector],
  ({ isAudioPlaying }) => {
    return isAudioPlaying;
  },
);

export const getIsPlayingWaiting = createSelector(
  [aiConversationSelector],
  ({ isPlayingWaiting }) => {
    return isPlayingWaiting;
  },
);

export const getActiveSessionId = createSelector(
  [aiConversationSelector],
  ({ activeSessionId }) => {
    return activeSessionId;
  },
);

export const getStartIndex = createSelector(
  [aiConversationSelector],
  ({ startIndex }) => {
    return startIndex;
  },
);

export const getLastLink = createSelector(
  [aiConversationSelector],
  ({ sessions }) => {
    const isLive = sessions.some((session) =>
      session.months.some((item) =>
        item.sessions.some((session) => !session.is_completed),
      ),
    );

    if (isLive && sessions.length) {
      const lastYear = sessions.find((year) =>
        year.months.some((month) =>
          month.sessions.some((session) => !session.is_completed),
        ),
      );
      const lastMonth = lastYear?.months.find((month) =>
        month.sessions.some((session) => !session.is_completed),
      );
      const lastSession = lastMonth?.sessions.find(
        (session) => !session.is_completed,
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