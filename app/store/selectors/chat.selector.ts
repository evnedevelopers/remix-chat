import { createSelector } from "reselect";

import { RootState } from "~/store";

const chatSelector = (state: RootState) => state.chat;

export const getIsChatFetching = createSelector([chatSelector], (result) => {
  return result.isFetching;
});

export const getIsChatTyping = createSelector([chatSelector], (result) => {
  return result.isTyping;
});

export const getIsImageLoading = createSelector([chatSelector], (result) => {
  return result.isImageLoading;
});

export const getTypingMessageId = createSelector([chatSelector], (result) => {
  return result.typingMessageId;
});

export const getLoadingImageData = createSelector([chatSelector], (result) => {
  return result.scrollToLoadingImageId;
});

export const getIsRecording = createSelector([chatSelector], (result) => {
  return result.isRecording;
});

export const getIsProcessing = createSelector([chatSelector], (result) => {
  return result.isProcessing;
});

export const getIsVoiceDetected = createSelector([chatSelector], (result) => {
  return result.isVoiceDetected;
});

export const getIsAudioPlaying = createSelector([chatSelector], (result) => {
  return result.isAudioPlaying;
});

export const getGlobalMessageId = createSelector([chatSelector], (result) => {
  return result.globalListeningMessageId;
});

export const getTooltipId = createSelector([chatSelector], (result) => {
  return result.tooltipId;
});

export const getConvertedText = createSelector([chatSelector], (result) => {
  return result.convertedText;
});

export const getAllowCountdown = createSelector([chatSelector], (result) => {
  return result.allowCountdown;
});