import { ChangeEvent, KeyboardEventHandler, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { isMobile, isTablet } from 'react-device-detect';

import darkProcessing from '~/assets/Flow 3.json';
import darkRecording from '~/assets/Flow 4.json';
import lightProcessing from '~/assets/Flow 2.json';
import lightRecording from '~/assets/Flow 1.json';

import { getTheme } from "~/store/selectors/ui.selector";
import {
  getConvertedText,
  getIsChatTyping,
  getIsProcessing,
  getIsRecording,
  getIsVoiceDetected
} from "~/store/selectors/chat.selector";
import { getProfile } from "~/store/selectors/profile.selector";
import { getIsFileFetching } from "~/store/selectors/projects.selector";
import { ThemeVariant } from "~/store/typedefs";

import { IChatFile } from "~/utils/typedefs";


export const useMessageInput = (
  setValue: any,
  value: string,
  handleSendMessage: (
    value: string,
    isFileContext: boolean,
    file?: IChatFile | null,
  ) => void,
  isFileContext: boolean,
  file: IChatFile | null,
) => {
  const themes = useSelector(getTheme);
  const convertedText = useSelector(getConvertedText);
  const profile = useSelector(getProfile);
  const isTyping = useSelector(getIsChatTyping);
  const [animation, setAnimation] = useState<any>();
  const isRecording = useSelector(getIsRecording);
  const isProcessing = useSelector(getIsProcessing);
  const isVoiceDetected = useSelector(getIsVoiceDetected);
  const isFileFetching = useSelector(getIsFileFetching);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (convertedText) {
      setValue(convertedText);
    }
  }, [convertedText]);
  const handleKeyPress: KeyboardEventHandler = (e) => {
    if (isFileFetching) {
      return;
    }
    if (e.shiftKey && e.key === 'Enter') {
      setValue((prev: string) => `${prev}`);

      return;
    }
    if (e.key === 'Enter' && !(isTablet || isMobile)) {
      e.preventDefault();
      profile?.subscription &&
      !!value.trim().length &&
      !isTyping &&
      handleSendMessage(value, isFileContext, file);
    }
  };

  useEffect(() => {
    if (themes === ThemeVariant.dark && (isProcessing || isVoiceDetected)) {
      setAnimation(darkProcessing);
    }
    if (themes === ThemeVariant.dark && isRecording) {
      setAnimation(darkRecording);
    }
    if (themes === ThemeVariant.light && (isProcessing || isVoiceDetected)) {
      setAnimation(lightProcessing);
    }
    if (themes === ThemeVariant.light && isRecording) {
      setAnimation(lightRecording);
    }
  }, [isVoiceDetected, isRecording, isProcessing, themes]);

  return {
    animation,
    handleKeyPress,
    handleChange,
    isShowAnimation: isVoiceDetected || isProcessing,
  };
};
