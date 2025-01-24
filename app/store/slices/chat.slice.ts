import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { FillChatsActionPayload, IScrollToLoadingImageId, ITooltip } from "~/store/typedefs";
import { IChat, IMessages } from "~/utils/typedefs";

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    isFetching: false,
    isTyping: false,
    isImageLoading: false,
    chats: [] as IChat[],
    messages: null as null | IMessages,
    typingMessageId: null as string | null,
    socketStatus: '',
    isClosedSockets: false,
    isOpenedSockets: false,
    isRecording: false,
    isProcessing: false,
    isVoiceDetected: false,
    isAudioPlaying: false,
    tooltipId: null as ITooltip | null,
    globalListeningMessageId: null as string | null,
    scrollToLoadingImageId: null as IScrollToLoadingImageId | null,
    convertedText: null as string | null,
    allowCountdown: false,
  },
  reducers: {
    startFetching(state) {
      state.isFetching = true;
    },
    stopFetching(state) {
      state.isFetching = false;
    },
    startRecording(state) {
      state.isRecording = true;
    },
    stopRecording(state) {
      state.isRecording = false;
    },
    startProcessing(state) {
      state.isProcessing = true;
    },
    stopProcessing(state) {
      state.isProcessing = false;
    },
    startVoiceDetected(state) {
      state.isVoiceDetected = true;
    },
    stopVoiceDetected(state) {
      state.isVoiceDetected = false;
    },
    startAudioPlaying(state) {
      state.isAudioPlaying = true;
    },
    stopAudioPlaying(state) {
      state.isAudioPlaying = false;
    },
    setClosedSockets(state, action: PayloadAction<boolean>) {
      state.isClosedSockets = action.payload;
    },
    setTooltipStatus(state, action: PayloadAction<ITooltip | null>) {
      state.tooltipId = action.payload;
    },
    setOpenedSockets(state, action: PayloadAction<boolean>) {
      state.isOpenedSockets = action.payload;
    },
    setSocketsStatus(state, action: PayloadAction<string>) {
      state.socketStatus = action.payload;
    },
    setConvertedText(state, action: PayloadAction<string | null>) {
      state.convertedText = action.payload;
    },
    setGlobalMessageId(state, action: PayloadAction<string | null>) {
      state.globalListeningMessageId = action.payload;
    },
    removeGlobalMessageId(state) {
      state.globalListeningMessageId = null;
    },
    startTyping(state) {
      state.isTyping = true;
    },
    stopTyping(state) {
      state.isTyping = false;
      state.typingMessageId = null;
    },
    startIsImageLoading(state) {
      state.isImageLoading = true;
    },
    stopIsImageLoading(state) {
      state.isImageLoading = false;
    },
    setLoadingImageId(
      state,
      action: PayloadAction<IScrollToLoadingImageId | null>,
    ) {
      state.scrollToLoadingImageId = action.payload;
    },
    setMessageId(state, action: PayloadAction<string>) {
      state.typingMessageId = action.payload;
    },
    fillChats(state, action: PayloadAction<FillChatsActionPayload>) {
      // modify state here
      state.chats = action.payload;
    },
    allowCountdown(state, action: PayloadAction<boolean>) {
      state.allowCountdown = action.payload;
    },
  },
});