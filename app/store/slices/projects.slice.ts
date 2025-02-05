import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IChat, IMessage, IMessageImage, IProjects } from "~/utils/typedefs";
import {
  AddChatActionPayload,
  ChangeChatActionPayload,
  FillAddChatFileActionPayload,
  FillAutoNameActionPayload,
  FillMessageAudioActionPayload,
  FillMessageChatActionPayload,
  FillMessagesActionPayload,
  FillProjectMatchingActionPayload,
  FillProjectsActionPayload,
  FillSaveMessageActionPayload,
  FillVisualizePromptActionPayload,
  IProjectCurrent,
  PostRateActionPayload,
  UpdateGuidanceActionPayload
} from "~/store/typedefs";

import { getDate } from "~/helpers/getDateTime";

export const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    isFetching: false,
    isAudioFetching: false,
    isPromptFetching: false,
    isFileFetching: false,
    projects: [] as IProjects[],
    guidanceQuestion: '',
    visualizePrompt: null as null | FillVisualizePromptActionPayload,
    matchingProject: null as null | IProjectCurrent,
  },
  reducers: {
    startFetching(state) {
      state.isFetching = true;
    },
    stopFetching(state) {
      state.isFetching = false;
    },
    startFileFetching(state) {
      state.isFileFetching = true;
    },
    stopFileFetching(state) {
      state.isFileFetching = false;
    },
    startPromptFetching(state) {
      state.isPromptFetching = true;
    },
    stopPromptFetching(state) {
      state.isPromptFetching = false;
    },
    startAudioFetching(state) {
      state.isAudioFetching = true;
    },
    stopAudioFetching(state) {
      state.isAudioFetching = false;
    },
    fillProjects(state, action: PayloadAction<FillProjectsActionPayload>) {
      state.projects = action.payload.map((project) => {
        const chatsByYear: Record<string, Record<string, IChat[]>> = {};

        project.chats.forEach((chat) => {
          const year = new Date(chat.created_at).getFullYear();
          const month = new Date(chat.created_at).toLocaleString('en-US', {
            month: 'long',
          });

          if (!chatsByYear[year]) {
            chatsByYear[year] = {};
          }

          if (!chatsByYear[year][month]) {
            chatsByYear[year][month] = [];
          }

          chatsByYear[year][month].push(chat);
        });

        const years = Object.keys(chatsByYear).map((year) => ({
          id: parseInt(year),
          months: Object.keys(chatsByYear[year]).map((month) => ({
            id: month,
            chats: chatsByYear[year][month],
          })),
        }));

        return {
          ...project,
          years,
          // chats: project.chats.map((chat) => ({ ...chat, messages: null })),
        };
      }) as any[];
    },
    clearProjects(state) {
      state.projects = [];
    },
    fillGuidanceQuestion(state, action: PayloadAction<string>) {
      state.guidanceQuestion = action.payload;
    },
    fillMessages(
      state,
      action: PayloadAction<{
        data: FillMessagesActionPayload;
        chatId: string;
      }>,
    ) {
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.map((chat) => {
            if (chat.id === action.payload.chatId) {
              return {
                ...chat,
                messages:
                  action.payload.data.status === false
                    ? null
                    : {
                      ...action.payload.data,
                    },
              };
            }

            return chat;
          }),
        };
      });
    },
    pushMoreMessages(
      state,
      action: PayloadAction<{
        data: FillMessagesActionPayload;
        chatId: string | null;
      }>,
    ) {
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.map((chat) => {
            if (chat.id === action.payload.chatId) {
              return {
                ...chat,
                messages: {
                  ...action.payload.data,
                  // previous: chat.messages?.previous,
                  results: [
                    ...(chat.messages ? chat.messages.results : []),
                    ...action.payload.data.results,
                  ],
                },
              };
            }

            return chat;
          }),
        };
      });
    },
    pushMoreCustomMessages(
      state,
      action: PayloadAction<{
        data: FillMessagesActionPayload;
        chatId: string | null;
      }>,
    ) {
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.map((chat) => {
            if (chat.id === action.payload.chatId) {
              return {
                ...chat,
                messages: {
                  ...action.payload.data,
                  results: [
                    ...(chat.messages ? chat.messages.results : []),
                    ...action.payload.data.results,
                  ],
                },
              };
            }

            return chat;
          }),
        };
      });
    },
    pushPrevMoreMessages(
      state,
      action: PayloadAction<{
        data: FillMessagesActionPayload;
        chatId: string | null;
      }>,
    ) {
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.map((chat) => {
            if (chat.id === action.payload.chatId) {
              return {
                ...chat,
                messages: {
                  ...action.payload.data,
                  // next: chat.messages?.next,
                  results: [
                    ...action.payload.data.results,
                    ...(chat.messages ? chat.messages.results : []),
                  ],
                },
              };
            }

            return chat;
          }),
        };
      });
    },
    clearMessages(
      state,
      action: PayloadAction<{
        chatId: string | null;
      }>,
    ) {
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.map((chat) => {
            if (chat.id === action.payload.chatId) {
              return {
                ...chat,
                messages: null,
              };
            }

            return chat;
          }),
        };
      });
    },
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    setMessages(state, action: PayloadAction<any>) {
      const errorIndex = action.payload.projectsMessages.findIndex(
        (ms: any) => ms.type === 'error',
      );
      const filtered = action.payload.projectsMessages.filter(
        (ms: any, index: number) => {
          if (errorIndex === -1) {
            return true;
          }
          if (index === errorIndex) {
            return false;
          }

          return index !== errorIndex + 1;
        },
      );
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.map((chat) => {
            if (chat.id === action.payload.chatId) {
              return {
                ...chat,
                messages: chat.messages
                  ? {
                    ...chat.messages,
                    results: [...filtered],
                  }
                  : {
                    results: [...filtered],
                  },
              };
            }

            return chat;
          }),
        };
      });
    },
    addMessage(state, action: PayloadAction<IMessage>) {
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.map((chat) => {
            if (chat.id === action.payload.chatId && chat.messages) {
              const results = chat.messages.results.map((message) => {
                if (
                  message.id === 'mock' ||
                  message.type === 'error' ||
                  (message.id === action.payload.id &&
                    action.payload.type === 'error')
                ) {
                  return {
                    ...action.payload,
                    files: [],
                  };
                }
                if (message.id === 'mockHuman') {
                  return {
                    ...message,
                    id: action.payload.humanMessageId!,
                  };
                }

                return action.payload.show_create_chat_message &&
                message?.project?.id === action.payload.project?.id
                  ? {
                    ...message,
                    show_create_chat_message: false,
                  }
                  : message;
              });

              const errorFile = chat.files.some((file) => file?.error);

              return {
                ...chat,
                is_file_context:
                  action.payload.type !== 'error' &&
                  !errorFile &&
                  !!chat.files.length,
                messages: {
                  ...chat.messages,
                  results,
                },
              };
            }

            return chat;
          }),
        };
      });
    },
    updateMessage(state, action: PayloadAction<IMessage>) {
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.map((chat) => {
            if (chat.id === action.payload.chatId) {
              return {
                ...chat,
                messages: {
                  ...chat.messages,
                  results: chat.messages!.results.map((message) => {
                    if (message.id === action.payload.id) {
                      return {
                        ...message,
                        continueStatus: action.payload.continueStatus,
                        nextToken: action.payload.nextToken,
                        tokenIndex: action.payload.tokenIndex,
                        text: message.text + action.payload.text,
                      };
                    }

                    return message;
                  }),
                },
              };
            }

            return chat;
          }),
        };
      });
    },
    updateErrorMessage(state, action: PayloadAction<Partial<IMessage>>) {
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.map((chat) => {
            if (chat.id === action.payload.chatId) {
              return {
                ...chat,
                messages: {
                  ...chat.messages,
                  results: chat.messages!.results.map((message) => {
                    if (message.id === action.payload.id) {
                      return {
                        ...message,
                        text: '',
                      };
                    }

                    return message;
                  }),
                },
              };
            }

            return chat;
          }),
        };
      });
    },
    changeRate(state, action: PayloadAction<PostRateActionPayload>) {
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.map((chat) => {
            if (chat.id === action.payload.chatId) {
              return {
                ...chat,
                messages: {
                  ...chat.messages,
                  results: chat.messages!.results.map((message) => {
                    if (message.id === action.payload.message_id) {
                      return {
                        ...message,
                        message_rate: action.payload.rate,
                      };
                    }

                    return message;
                  }),
                },
              };
            }

            return chat;
          }),
        };
      });
    },
    updateGuidance(state, action: PayloadAction<UpdateGuidanceActionPayload>) {
      state.projects = state.projects.map((project) => {
        if (
          project.guidances.some((item) => item.id === action.payload.guide.id)
        ) {
          return {
            ...project,
            guidances: project.guidances.map((guidance) => {
              if (guidance.id === action.payload.guide.id) {
                return action.payload.guide;
              }

              return guidance;
            }),
          };
        } else {
          return project;
        }
      });
    },
    addChat(
      state,
      action: PayloadAction<{ data: AddChatActionPayload; projectId: string }>,
    ) {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.projectId) {
          const chatDate = new Date(action.payload.data.created_at);
          const year = chatDate.getFullYear();
          const month = chatDate.toLocaleString('en-US', { month: 'long' });

          let yearIndex = project.years.findIndex((y) => y.id === year.toString());
          if (yearIndex === -1) {
            yearIndex = project.years?.unshift({ id: year.toString(), months: [] }) - 1;
          }

          const monthIndex = project.years[yearIndex].months.findIndex(
            (m) => m.id === month,
          );
          if (monthIndex === -1) {
            project.years[yearIndex].months.unshift({
              id: month,
              chats: [action.payload.data],
            });
          } else {
            project.years[yearIndex].months[monthIndex].chats.unshift(
              action.payload.data,
            );
          }

          // Сортируем чаты внутри месяца по дате создания
          project.years[yearIndex].months.forEach((month) => {
            month.chats.sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime(),
            );
          });

          return {
            ...project,
            chats: [action.payload.data, ...project.chats],
          };
        }

        return project;
      });
    },
    changeChat(state, action: PayloadAction<ChangeChatActionPayload>) {
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.map((chat) => {
            if (chat.id === action.payload.id) {
              return { ...chat, ...action.payload };
            }

            return chat;
          }),
          years: project.years?.map((year) => {
            return {
              ...year,
              months: year.months?.map((month) => {
                return {
                  ...month,
                  chats: month.chats.map((chat) => {
                    if (chat.id === action.payload.id) {
                      return { ...chat, ...action.payload };
                    }

                    return chat;
                  }),
                };
              }),
            };
          }),
        };
      });
    },
    removeChat(state, action: PayloadAction<string>) {
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.filter((chat) => chat.id !== action.payload),
          years: project.years?.map((year) => {
            return {
              ...year,
              months: year.months
                ?.map((month) => {
                  return {
                    ...month,
                    chats: month.chats.filter(
                      (chat) => chat.id !== action.payload,
                    ),
                  };
                })
                .filter((item) => !!item.chats.length),
            };
          }),
        };
      });
    },
    saveMessage(state, action: PayloadAction<FillSaveMessageActionPayload>) {
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.map((chat) => {
            return {
              ...chat,
              messages: chat.messages
                ? {
                  ...chat.messages,
                  results: chat.messages.results.map((message) => {
                    if (message.id === action.payload.id) {
                      return {
                        ...action.payload,
                        audio: message.audio,
                      };
                    }

                    return message;
                  }),
                }
                : null,
            };
          }),
        };
      });
    },
    removeSavedMessage(state, action: PayloadAction<string>) {
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.map((chat) => {
            return {
              ...chat,
              messages: chat.messages
                ? {
                  ...chat.messages,
                  results: chat.messages.results.map((message) => {
                    if (message.id === action.payload) {
                      return {
                        ...message,
                        saved_at: null,
                      };
                    }

                    return message;
                  }),
                }
                : null,
            };
          }),
        };
      });
    },
    fillMessageAudio(
      state,
      action: PayloadAction<FillMessageAudioActionPayload>,
    ) {
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.map((chat) => {
            return {
              ...chat,
              messages: chat.messages
                ? {
                  ...chat.messages,
                  results: chat.messages.results.map((message) => {
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
          }),
        };
      });
    },
    addImages(
      state,
      action: PayloadAction<{
        id: string;
        chatId: string | null;
        images: IMessageImage[];
      }>,
    ) {
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.map((chat) => {
            if (chat.id === action.payload.chatId) {
              return {
                ...chat,
                messages: {
                  ...chat.messages,
                  results: chat.messages!.results.map((message) => {
                    if (message.id === action.payload.id) {
                      return {
                        ...message,
                        images: [...action.payload.images],
                      };
                    }

                    return message;
                  }),
                },
              };
            }

            return chat;
          }),
        };
      });
    },
    updateImages(
      state,
      action: PayloadAction<{
        id: string;
        chatId: string;
        images: any[];
        error: string | null;
      }>,
    ) {
      const { chatId, id, images, error } = action.payload;

      state.projects = state.projects.map((project) => {
        if (!project.chats.some((chat) => chat.id === chatId)) {
          return project;
        }

        return {
          ...project,
          chats: project.chats.map((chat) => {
            if (chat.id !== chatId) {
              return chat;
            }

            const updatedMessages = chat.messages?.results.map((message) => {
              if (message.id !== id) {
                return message;
              }

              return {
                ...message,
                images: images.map((image: any) => ({
                  ...image,
                  error: !image.image && !image.deleted_at ? error : '',
                })),
              };
            });

            return {
              ...chat,
              messages: {
                ...chat.messages!,
                results: updatedMessages ?? [],
              },
            };
          }),
        };
      });
    },
    fillVisualizePrompt(
      state,
      action: PayloadAction<FillVisualizePromptActionPayload>,
    ) {
      state.visualizePrompt = action.payload;
    },
    clearVisualizePrompt(state) {
      state.visualizePrompt = null;
    },
    fillAutoName(state, action: PayloadAction<FillAutoNameActionPayload>) {
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.map((chat) => {
            if (action.payload.id === chat.id) {
              return {
                ...chat,
                ...action.payload,
              };
            }

            return chat;
          }),
          years: project.years?.map((year) => {
            return {
              ...year,
              months: year.months?.map((month) => {
                return {
                  ...month,
                  chats: month.chats.map((chat) => {
                    if (chat.id === action.payload.id) {
                      return { ...chat, ...action.payload };
                    }

                    return chat;
                  }),
                };
              }),
            };
          }),
        };
      });
    },
    fillMessageChat(
      state,
      action: PayloadAction<FillMessageChatActionPayload>,
    ) {
      state.projects = state.projects.map((project) => {
        if (project.id === action.payload.new_message.project?.id) {
          const chatDate = new Date(action.payload.new_chat.created_at);
          const year = chatDate.getFullYear();
          const month = chatDate.toLocaleString('en-US', { month: 'long' });

          let yearIndex = project.years.findIndex((y) => y.id === year.toString());
          if (yearIndex === -1) {
            yearIndex = project.years?.unshift({ id: year.toString(), months: [] }) - 1;
          }

          const monthIndex = project.years[yearIndex].months.findIndex(
            (m) => m.id === month,
          );
          if (monthIndex === -1) {
            project.years[yearIndex].months.unshift({
              id: month,
              chats: [
                {
                  ...action.payload.new_chat,
                  messages: null,
                },
              ],
            });
          } else {
            project.years[yearIndex].months[monthIndex].chats.unshift({
              ...action.payload.new_chat,
              messages: null,
            });
          }

          project.years[yearIndex].months.forEach((month) => {
            month.chats.sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime(),
            );
          });

          return {
            ...project,
            chats: [
              {
                ...action.payload.new_chat,
                messages: null,
              },
              ...project.chats,
            ],
          };
        }

        if (project.id === action.payload.original_message.chat?.project?.id) {
          return {
            ...project,
            chats: project.chats.map((chat) => {
              if (chat.id === action.payload.original_message.chat?.id) {
                return {
                  ...chat,
                  messages: chat.messages
                    ? {
                      ...chat.messages,
                      results: chat.messages.results.map((message) => {
                        if (
                          message.id === action.payload.original_message.id
                        ) {
                          return action.payload.original_message;
                        }

                        return message;
                      }),
                    }
                    : null,
                };
              }

              return chat;
            }),
          };
        }

        return project;
      });
    },
    fillMatchingProject(
      state,
      action: PayloadAction<FillProjectMatchingActionPayload | null>,
    ) {
      state.matchingProject = action.payload;
    },
    prepareSuggestingQuestions(
      state,
      action: PayloadAction<{
        chatId: string;
      }>,
    ) {
      state.projects = state.projects.map((project) => ({
        ...project,
        chats: project.chats.map((chat) => {
          if (chat.id === action.payload.chatId) {
            return {
              ...chat,
              messages: chat.messages
                ? {
                  ...chat.messages,
                  results: chat.messages.results.map((item, index) => {
                    if (index === 0 && item.author === 'ai') {
                      return {
                        ...item,
                        suggestingQuestions: {
                          isSkeleton: true,
                          questions: ['', '', '', ''],
                        },
                      };
                    }

                    return item;
                  }),
                }
                : null,
            };
          }

          return chat;
        }),
      }));
    },
    fillSuggestingQuestions(
      state,
      action: PayloadAction<{
        chatId: string;
        questions: string[];
      }>,
    ) {
      state.projects = state.projects.map((project) => ({
        ...project,
        chats: project.chats.map((chat) => {
          if (chat.id === action.payload.chatId) {
            return {
              ...chat,
              messages: chat.messages
                ? {
                  ...chat.messages,
                  results: chat.messages.results.map((item, index) => {
                    if (index === 0 && item.author === 'ai') {
                      return {
                        ...item,
                        suggestingQuestions: {
                          isSkeleton: false,
                          questions: action.payload.questions,
                        },
                      };
                    }

                    return item;
                  }),
                }
                : null,
            };
          }

          return chat;
        }),
      }));
    },
    removeImages(
      state,
      action: PayloadAction<{
        imageId: string;
        chatId: string;
        messageId: string;
      }>,
    ) {
      const { chatId, imageId, messageId } = action.payload;

      state.projects = state.projects.map((project) => {
        if (!project.chats.some((chat) => chat.id === chatId)) {
          return project;
        }

        return {
          ...project,
          chats: project.chats.map((chat) => {
            if (chat.id !== chatId) {
              return chat;
            }

            const updatedMessages = chat.messages?.results.map((message) => {
              if (message.id !== messageId) {
                return message;
              }

              return {
                ...message,
                images: message.images.map((image) => {
                  if (image.id === imageId) {
                    return {
                      ...image,
                      image: null,
                      deleted_at: getDate(new Date(), 'dd MMM yyyy'),
                    };
                  }

                  return image;
                }),
              };
            });

            return {
              ...chat,
              messages: chat.messages
                ? {
                  ...chat.messages,
                  results: updatedMessages ?? [],
                }
                : null,
            };
          }),
        };
      });
    },
    fillChatFile(
      state,
      action: PayloadAction<{
        data: FillAddChatFileActionPayload;
        chatId: string;
      }>,
    ) {
      state.projects = state.projects.map((project) => {
        if (!project.chats.some((chat) => chat.id === action.payload.chatId)) {
          return project;
        }

        return {
          ...project,
          chats: project.chats.map((chat) => {
            if (chat.id !== action.payload.chatId) {
              return chat;
            }

            return {
              ...chat,
              files: [action.payload.data],
            };
          }),
        };
      });
    },
    removeChatFile(
      state,
      action: PayloadAction<{ chatId: string; fileId: string }>,
    ) {
      state.projects = state.projects.map((project) => {
        return {
          ...project,
          chats: project.chats.map((chat) => {
            if (chat.id !== action.payload.chatId) {
              return chat;
            }

            return {
              ...chat,
              files: chat.files.filter(
                (file) => file.id !== action.payload.fileId,
              ),
            };
          }),
        };
      });
    },
  }
});