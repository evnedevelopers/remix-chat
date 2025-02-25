import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FillMessageAudioActionPayload,
  FillNextSessionActionPayload,
  IMessage,
  IMessagesPagination,
  ISession
} from "~/store/bus/ai-conversation/typedefs";

export const aiConversationSlice = createSlice({
  name: 'aiConversation',
  initialState: {
    isFetching: false,
    isAudioFetching: false,
    isMessageFetching: false,
    nextSession: null as null | FillNextSessionActionPayload,
    sessions: [] as ISession[],
    lastMessageSessionId: null as number | null,
    activeSessionId: null as number | null,
    isAudioPlaying: false,
    isPlaying: false,
    isPlayingWaiting: false,
    startIndex: null as number | null,
  },
  reducers: {
    startFetching(state) {
      state.isFetching = true;
    },
    stopFetching(state) {
      state.isFetching = false;
    },
    startAudioFetching(state) {
      state.isAudioFetching = true;
    },
    stopAudioFetching(state) {
      state.isAudioFetching = false;
    },
    startAudioPlaying(state) {
      state.isAudioPlaying = true;
    },
    stopAudioPlaying(state) {
      state.isAudioPlaying = false;
    },
    fillMessages(
      state,
      action: PayloadAction<{
        data: IMessagesPagination;
        sessionId: number;
      }>,
    ) {
      state.sessions = state.sessions.map((session) => {
        return {
          ...session,
          months: session.months.map((month) => {
            return {
              ...month,
              sessions: month.sessions.map((item) => {
                if (item.id === action.payload.sessionId) {
                  return {
                    ...item,
                    messages: {
                      ...action.payload.data,
                    },
                  };
                }

                return item;
              }),
            };
          }),
        };
      });
    },
    pushMoreMessages(
      state,
      action: PayloadAction<{
        data: IMessagesPagination;
        sessionId: number | null;
      }>,
    ) {
      if (!state.sessions) return;

      const { data, sessionId } = action.payload;

      state.sessions = state.sessions.map((session) => ({
        ...session,
        months: session.months.map((month) => ({
          ...month,
          sessions: month.sessions.map((item) => {
            if (item.id !== sessionId) return item;

            const existingMessages = item.messages ? item.messages.results : [];
            const mergedResults = [...existingMessages, ...data.results];

            // Remove duplicate messages by ID
            const uniqueResults = mergedResults.filter(
              (value, index, self) =>
                self.findIndex((msg) => msg.id === value.id) === index,
            );

            return {
              ...item,
              messages: item.messages
                ? {
                  ...data,
                  results: uniqueResults,
                }
                : null,
            };
          }),
        })),
      }));
    },
    addMessage(
      state,
      action: PayloadAction<{
        message: IMessage;
        id: number;
      }>,
    ) {
      state.sessions = state.sessions.map((session) => {
        return {
          ...session,
          months: session.months.map((month) => {
            return {
              ...month,
              sessions: month.sessions.map((item) => {
                if (item.id === action.payload.id) {
                  return {
                    ...item,
                    messages: item.messages
                      ? {
                        ...item.messages,
                        results: item.messages.results.some(
                          (message: IMessage) =>
                            message.id === 'mock' ||
                            message.id === 'error' ||
                            message.id === action.payload.message.id,
                        )
                          ? item.messages.results
                            // .filter((item) => item.id !== 'error')
                            .map((message: IMessage) => {
                              if (
                                message.id === action.payload.message.id
                              ) {
                                return message;
                              }
                              if (
                                message.id === 'mock' ||
                                message.id === 'error'
                              ) {
                                return {
                                  ...action.payload.message,
                                };
                              }

                              return message;
                            })
                          : [
                            {
                              ...action.payload.message,
                            },
                            ...item.messages.results,
                          ],
                      }
                      : null,
                  };
                }

                return item;
              }),
            };
          }),
        };
      });
    },
    fillMessageAudio(
      state,
      action: PayloadAction<FillMessageAudioActionPayload>,
    ) {
      state.sessions = state.sessions.map((year) => {
        return {
          ...year,
          months: year.months.map((month) => {
            return {
              ...month,
              sessions: month.sessions.map((session) => {
                if (session.id === +action.payload.sessionId) {
                  return {
                    ...session,
                    messages: session.messages
                      ? {
                        ...session.messages,
                        results: session.messages.results.map((message) => {
                          if (message.id === action.payload.messageId) {
                            return {
                              ...message,
                              audio: action.payload.audio,
                            };
                          }

                          return message;
                        }),
                      }
                      : null,
                  };
                }

                return session;
              }),
            };
          }),
        };
      });
    },
  },
});