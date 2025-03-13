import { NavigateFunction } from 'react-router';

export type PromiseResolve = (value?: unknown) => void;
export type PromiseReject = (reason?: any) => void;

export type Navigate = {
  navigate: NavigateFunction;
};
export type OnFormSubmitPayload = {
  meta: {
    resolve: PromiseResolve;
    reject: PromiseReject;
  }
  payload: any;
};

export type OnFormSubmit = (payload: OnFormSubmitPayload) => void;
