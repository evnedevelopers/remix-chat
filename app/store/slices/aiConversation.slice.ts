import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FillNextSessionActionPayload, FillSessionsActionPayload, IMessagesPagination, ISession } from "~/store/typedefs";
import { handleErrors } from "~/helpers/handleErrors";
import { IMessage } from "~/utils/typedefs";

export type FillMessageAudioActionPayload = {
  audio: string;
  messageId: string;
  sessionId: string;
};

export const aiConversationSlice = createSlice({
  name: 'aiConversation',
  initialState: {
    isFetching: false,
    isAudioFetching: false,
    isMessageFetching: false,
    nextSession: null as null | FillNextSessionActionPayload,
    sessions: [] as ISession[],
    lastMessageSessionId: null as string | null,
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
    startMessageFetching(state) {
      state.isMessageFetching = true;
    },
    stopMessageFetching(state) {
      state.isMessageFetching = false;
    },
    startAudioPlaying(state) {
      state.isAudioPlaying = true;
    },
    stopAudioPlaying(state) {
      state.isAudioPlaying = false;
    },
    startPlaying(state) {
      state.isPlaying = true;
    },
    stopPlaying(state) {
      state.isPlaying = false;
    },
    startPlayingWaiting(state) {
      state.isPlayingWaiting = true;
    },
    stopPlayingWaiting(state) {
      state.isPlayingWaiting = false;
    },
    fillNextSession(
      state,
      action: PayloadAction<FillNextSessionActionPayload>,
    ) {
      state.nextSession = action.payload;
    },
    fillStartIndex(state, action: PayloadAction<number>) {
      state.startIndex = action.payload;
    },
    setLastMessageSessionId(state, action: PayloadAction<any>) {
      state.lastMessageSessionId = action.payload;
    },
    setActiveSessionId(state, action: PayloadAction<number | null>) {
      state.activeSessionId = action.payload;
    },
    fillSessions(state, action: PayloadAction<FillSessionsActionPayload>) {
      const newSessions: any = [];
      const sessions = state.nextSession?.id
        ? [{ ...state.nextSession, nextSession: true }, ...action.payload]
        : [...action.payload];

      sessions.forEach((session: any) => {
        try {
          const year = new Date(session.start_at).getFullYear();
          const month = new Date(session.start_at).toLocaleString('en-US', {
            month: 'long',
          });

          const existingYearObj = newSessions.find(
            (item: any) => item.id === year,
          );
          if (existingYearObj) {
            const existingMonthObj = existingYearObj.months.find(
              (item: any) => item.id === month,
            );
            if (existingMonthObj) {
              existingMonthObj.sessions.push(session);
              existingMonthObj.is_completed = session.is_completed;
              existingMonthObj.is_next_session = !!session.nextSession;
            } else {
              existingYearObj.months.push({
                id: month,
                sessions: [session],
                is_completed: session.is_completed,
                is_next_session: !!session.nextSession,
              });
            }
          } else {
            newSessions.push({
              id: year,
              months: [
                {
                  id: month,
                  sessions: [session],
                  is_next_session: !!session.nextSession,
                  is_completed: session.is_completed,
                },
              ],
            });
          }
        } catch (error) {
          handleErrors(error);
        }
      });

      state.sessions = newSessions;
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
    addMessageImage(
      state,
      action: PayloadAction<{
        message: IMessage;
        id: number;
        isPlaceholder: boolean;
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
                        results: action.payload.isPlaceholder
                          ? [action.payload.message, ...item.messages.results]
                          : item.messages.results.map((item) => {
                            if (action.payload.isPlaceholder) {
                              return action.payload.message;
                            }

                            if (item.id === action.payload.message.id) {
                              return action.payload.message;
                            }

                            return item;
                          }),
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
    addMessageError(
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
                          (item) => item.id === 'error',
                        )
                          ? item.messages.results.filter(
                            (item) => item.id !== 'mock',
                          )
                          : [
                            action.payload.message,
                            ...item.messages.results,
                          ].filter((item) => item.id !== 'mock'),
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
    addMessageMock(
      state,
      action: PayloadAction<{
        message: IMessage;
        id: number;
        isCompleted: boolean;
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
                    is_completed: action.payload.isCompleted,
                    messages: item.messages
                      ? {
                        ...item.messages,
                        results: item.messages.results.some(
                          (item) => item.id === 'mock',
                        )
                          ? item.messages.results
                          : [
                            action.payload.message,
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
    finishSession(
      state,
      action: PayloadAction<{
        id: number;
        isCompleted: boolean;
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
                    is_completed: action.payload.isCompleted,
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
    // INJECT
  },
});