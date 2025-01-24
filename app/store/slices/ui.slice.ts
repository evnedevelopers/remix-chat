import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FillThemeActionPayload, ThemeVariant } from "~/store/typedefs";

const xlScreenDown = false;

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isFetching: false,
    theme: null as ThemeVariant | null,
    isSidebarOpen: !xlScreenDown,
    isMobileSidebarOpen: false,
    isSidebarDataset: false,
    isSidebarDescription: false,
    isSidebarConversationDataset: false,
    isSidebarConversationDescription: false,
    globalSpeaking: false,
    oneTimeSpeaking: false,
    globalListening: false,
    firstGlobalListeningIOS: false,
    firstGlobalSpeakingIOS: false,
    firstOneTimeSpeakingIOS: false,
  },
  reducers: {
    startFetching(state) {
      state.isFetching = true;
    },
    stopFetching(state) {
      state.isFetching = false;
    },
    startOneTimeSpeaking(state) {
      state.oneTimeSpeaking = true;
    },
    startFirstGlobalListeningIOS(state) {
      state.firstGlobalListeningIOS = true;
    },
    startFirstGlobalSpeakingIOS(state) {
      state.firstGlobalSpeakingIOS = true;
    },
    startFirstOneTimeSpeakingIOS(state) {
      state.firstOneTimeSpeakingIOS = true;
    },
    stopOneTimeSpeaking(state) {
      state.oneTimeSpeaking = false;
    },
    toggleSidebar(state) {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleGlobalSpeaking(state) {
      state.globalSpeaking = !state.globalSpeaking;
    },
    toggleGlobalListening(state) {
      state.globalListening = !state.globalListening;
    },
    toggleSidebarDataset(state) {
      state.isSidebarDataset = !state.isSidebarDataset;
    },
    toggleSidebarDescription(state) {
      state.isSidebarDescription = !state.isSidebarDescription;
    },
    toggleSidebarConversationDataset(state) {
      state.isSidebarConversationDataset = !state.isSidebarConversationDataset;
    },
    toggleSidebarConversationDescription(state) {
      state.isSidebarConversationDescription =
        !state.isSidebarConversationDescription;
    },
    toggleMobileSidebar(state) {
      state.isMobileSidebarOpen = !state.isMobileSidebarOpen;
    },
    fillTheme(state, action: PayloadAction<FillThemeActionPayload>) {
      state.theme = action.payload;
    },
  },
});