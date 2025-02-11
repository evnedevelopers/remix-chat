export type PromiseResolve = (value?: unknown) => void;
export type PromiseReject = (reason?: any) => void;
export type OnFormSubmitPayload = {
  resolve: PromiseResolve;
  reject: PromiseReject;
  values: any;
};

const prepareActions = {
  movePromiseToMeta: ({ values, resolve, reject }: OnFormSubmitPayload) => {
    return {
      payload: values,
      meta: {
        resolve,
        reject,
      },
    };
  },
};

export default prepareActions;