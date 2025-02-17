import { createSelector } from "reselect";

import { RootState } from "~/store";

const chatSelectors = (state: RootState) => state.chat;

export const getIsChatFetching = createSelector([chatSelectors], (result) => {
  return result.isFetching;
});

export const getIsChatTyping = createSelector([chatSelectors], (result) => {
  return result.isTyping;
});

export const getIsImageLoading = createSelector([chatSelectors], (result) => {
  return result.isImageLoading;
});

export const getTypingMessageId = createSelector([chatSelectors], (result) => {
  return result.typingMessageId;
});

export const getLoadingImageData = createSelector([chatSelectors], (result) => {
  return result.scrollToLoadingImageId;
});

export const getIsRecording = createSelector([chatSelectors], (result) => {
  return result.isRecording;
});

export const getIsProcessing = createSelector([chatSelectors], (result) => {
  return result.isProcessing;
});

export const getIsVoiceDetected = createSelector([chatSelectors], (result) => {
  return result.isVoiceDetected;
});

export const getIsAudioPlaying = createSelector([chatSelectors], (result) => {
  return result.isAudioPlaying;
});

export const getGlobalMessageId = createSelector([chatSelectors], (result) => {
  return result.globalListeningMessageId;
});

export const getTooltipId = createSelector([chatSelectors], (result) => {
  return result.tooltipId;
});

export const getConvertedText = createSelector([chatSelectors], (result) => {
  return result.convertedText;
});

export const getAllowCountdown = createSelector([chatSelectors], (result) => {
  return result.allowCountdown;
});