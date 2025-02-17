import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { handleErrors } from "~/helpers/handleErrors";

import { getProfile } from "~/store/selectors/profile.selectors";
import { getIsGlobalSpeaking } from "~/store/selectors/ui.selectors";
import { getSettings } from "~/store/selectors/settings.selectors";
import { chatActions } from "~/store/actions/chat.actions";
import { modalActions } from "~/store/actions/modal.actions";

export const getValidToken = async () => '';
export const removeQuotes = (str: string) => str.replace(/^"(.*)"$/, '$1');

export const useAudioRecorder = (scrollToBottom: () => void) => {
  const dispatch = useDispatch();
  const [recording, setRecording] = useState(false);
  const profile = useSelector(getProfile);
  const settings = useSelector(getSettings);
  const chunksRef = useRef<Blob[]>([]);
  const globalSpeaking = useSelector(getIsGlobalSpeaking);
  const countRef = useRef(0);
  const [isMicrophoneAllowed, setMicrophoneAllowed] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const stopTimeoutRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const shouldSendToServerRef = useRef(true);

  useEffect(() => {
    if (settings) {
      countRef.current = settings?.audio_recording_limit;
    }
  }, [settings]);

  useEffect(() => {
    let isStopped = false;

    const startRecording = async () => {
      try {
        chunksRef.current = [];

        mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

        mediaRecorderRef.current = new MediaRecorder(mediaStreamRef.current);
        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current.onstop = handleStop;
        mediaRecorderRef.current.start();

        setRecording(true);

        stopTimeoutRef.current = setTimeout(() => {
          if (mediaRecorderRef.current?.state === 'recording') {
            mediaRecorderRef.current.stop();
            setRecording(false);
          }
        }, countRef.current * 1000);
      } catch (error) {
        handleErrors(error);
        setRecording(false);
        dispatch(chatActions.stopRecording());
      }
    };

    const handleDataAvailable = (event: BlobEvent) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    const handleStop = async () => {
      if (!isStopped && shouldSendToServerRef.current) {
        isStopped = true;
        countRef.current -= 1;
        dispatch(chatActions.stopRecording());
        const tokenAccess = await getValidToken();
        mediaStreamRef.current
          ?.getTracks()
          .forEach((track: MediaStreamTrack) => track.stop());
        const formData = new FormData();
        formData.append('audio', new Blob(chunksRef.current));
        formData.append('audio_type', chunksRef.current[0].type);

        const performRequests = async () => {
          dispatch(chatActions.stopRecording());
          dispatch(chatActions.startProcessing());
          try {
            const data = await fetch(
              `${process.env.REACT_APP_API_URL}/messages/listen`,
              {
                method: 'POST',
                body: formData,
                headers: {
                  Authorization: 'Bearer ' + removeQuotes(tokenAccess!),
                },
              },
            ).then((response) => response.json());

            dispatch(chatActions.setConvertedText(data.text));

            setTimeout(() => {
              scrollToBottom();
            }, 500);
          } catch (error) {
            handleErrors(error);
          }
        };

        await performRequests();

        setRecording(false);
        dispatch(chatActions.stopProcessing());
      }
      if (!shouldSendToServerRef.current) {
        setRecording(false);
        dispatch(chatActions.stopRecording());
      }
      if (settings) {
        countRef.current = settings?.audio_recording_limit;
      }
      shouldSendToServerRef.current = true;
    };

    if (recording) {
      startRecording()
        .then(() => {
          globalSpeaking && dispatch(chatActions.startRecording());
        })
        .catch((error) => {
          handleErrors(error);
        });
    }

    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current?.state === 'recording'
      ) {
        mediaRecorderRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current
          .close()
          .then()
          .catch((error) => {
            handleErrors(error);
          });
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current
          .getTracks()
          .forEach((track: MediaStreamTrack) => track.stop());
      }
      if (stopTimeoutRef.current) {
        clearTimeout(stopTimeoutRef.current);
      }
    };
  }, [recording]);

  const isMediaRecorderSupported = () => {
    return (
      typeof MediaRecorder !== 'undefined' &&
      typeof MediaRecorder.isTypeSupported === 'function'
    );
  };

  const handleStartRecording = () => {
    if (!isMediaRecorderSupported()) {
      dispatch(
        modalActions.modal({
          component: 'ConfirmOrCancel',
          modalPayload: {
            title: 'Feature is not supported by browser version',
            body: 'Please upgrade your browser version in order to use this feature.',
          },
          forceClose: false,
          onConfirm: () => dispatch(modalActions.closeModal('ConfirmOrCancel')),
          confirmButton: {
            text: 'Go back',
          },
        }),
      );

      return;
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        setMicrophoneAllowed(true);

        dispatch(chatActions.startRecording());
        setRecording(true);
      })
      .catch(() => {
        setMicrophoneAllowed(false);
        dispatch(
          modalActions.modal({
            component: 'ConfirmOrCancel',
            modalPayload: {
              title: 'Microphone is not allowed in browser',
              body: 'Please reset your microphone permission in browser settings in order to use audio feature.',
            },
            forceClose: false,
            onConfirm: () =>
              dispatch(modalActions.closeModal('ConfirmOrCancel')),
            confirmButton: {
              text: 'Go back',
            },
          }),
        );
      });
  };

  const handleStopRecording = async () => {
    try {
      dispatch(chatActions.allowCountdown(false));
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current?.state === 'recording'
      ) {
        mediaRecorderRef.current.stop();
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleResetAndStopRecording = () => {
    shouldSendToServerRef.current = false;
    dispatch(chatActions.allowCountdown(false));
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      mediaRecorderRef.current.stop();
    }

    if (stopTimeoutRef.current) {
      clearInterval(stopTimeoutRef.current);
    }

    if (audioContextRef.current) {
      audioContextRef.current
        .close()
        .then()
        .catch((error) => {
          handleErrors(error);
        });
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current
        .getTracks()
        .forEach((track: MediaStreamTrack) => track.stop());
    }

    setRecording(false);
  };

  return {
    handleStartRecording,
    handleStopRecording,
    handleResetAndStopRecording,
    isMicrophoneAllowed,
  };
};
