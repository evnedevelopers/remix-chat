import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { settingsActions } from "~/store/saga/settings/actions";
import { AppDispatch } from "~/store";

export const useAllTimer = (
  allowCountdown: boolean,
  timer: number,
  sagaAction: ActionCreatorWithPayload<boolean>,
) => {
  const dispatch = useDispatch<AppDispatch>();
  const [count, setCount] = useState<number>(0);
  const [zero, setZero] = useState<boolean>(false);

  const getTwoDigits = (digit: number) => {
    const minutes = Math.floor(digit / 60);
    const seconds =
      digit - minutes * 60 > 9
        ? digit - minutes * 60
        : '0' + (digit - minutes * 60);

    if (minutes === 0 && +seconds === 0) {
      return '';
    }

    if (timer <= 59) {
      return seconds;
    } else {
      return `${minutes}:${seconds}`;
    }
  };

  useEffect(() => {
    allowCountdown && timer && setCount(timer);
    allowCountdown && timer && setZero(!allowCountdown);
  }, [allowCountdown, timer]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);

    if (zero) {
      clearInterval(intervalId);
      dispatch(dispatch(sagaAction(false)));
    }

    return () => clearInterval(intervalId);
  }, [zero, timer]);

  useEffect(() => {
    dispatch(dispatch(sagaAction(true)));
  }, [timer]);

  useEffect(() => {
    if (count === 0) {
      dispatch(settingsActions.fetchSettings());
    }
    setZero(count === 0);
  }, [count]);

  return { timer: getTwoDigits(count) };
};
