import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FillSavedMessagesActionPayload, PushMoreSavedMessagesActionPayload } from "~/store/typedefs";
import { ISavedMessages, ISavedProjects } from "~/utils/typedefs";

export const savedMessagesSlice = createSlice({
  name: 'savedMessages',
  initialState: {
    isFetching: false,
    savedProjects: [] as ISavedProjects[],
    scrollToMessageId: null as string | null,
  },
  reducers: {
    startFetching(state) {
      state.isFetching = true;
    },
    stopFetching(state) {
      state.isFetching = false;
    },
    setMessageId(state, action: PayloadAction<string>) {
      state.scrollToMessageId = action.payload;
    },
    clearMessageId(state) {
      state.scrollToMessageId = null;
    },
    fillSavedProjects(
      state,
      action: PayloadAction<FillSavedMessagesActionPayload>,
    ) {
      const withMessages = action.payload.map((project) => ({
        ...project,
        messages: null,
      }));
      if (action.payload.length) {
        state.savedProjects = [
          { id: '0', name: 'All saved', description: '', messages: null },
          ...withMessages,
        ];
      } else {
        state.savedProjects = withMessages;
      }
    },
    fillSavedMessages(
      state,
      action: PayloadAction<{
        data: ISavedMessages;
        projectId: string;
      }>,
    ) {
      state.savedProjects = state.savedProjects
        .map((project) => {
          if (project.id === action.payload.projectId) {
            return {
              ...project,
              messages: {
                ...action.payload.data,
                results: [...action.payload.data.results],
              },
            };
          }

          return project;
        })
        .filter((project) => {
          if (!project.messages) {
            return true;
          }

          return !!project.messages.results.length;
        });
    },
    removeSavedMessages(state, action: PayloadAction<string>) {
      state.savedProjects = state.savedProjects.map((project) => {
        return {
          ...project,
          messages: project.messages
            ? {
              ...project.messages,
              results: project.messages.results.filter(
                (message) => message.id !== action.payload,
              ),
            }
            : null,
        };
      });
    },
    removeSavedProject(state, action: PayloadAction<string>) {
      state.savedProjects = state.savedProjects.filter((project) => {
        if (!project.messages) {
          return true;
        }

        return project.messages.results.some(
          (message) => message.id === action.payload,
        );
      });
    },
    pushMoreSavedMessages(
      state,
      action: PayloadAction<{
        data: PushMoreSavedMessagesActionPayload;
        projectId: string | null;
      }>,
    ) {
      state.savedProjects = state.savedProjects.map((project) => {
        if (project.id === action.payload.projectId) {
          return {
            ...project,
            messages: {
              ...action.payload.data,
              results: [
                ...(project.messages ? project.messages.results : []),
                ...action.payload.data.results,
              ],
            },
          };
        }

        return project;
      });
    },
  },
});