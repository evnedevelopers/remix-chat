import { VariantType, useSnackbar } from 'notistack';

import React from 'react';
import { Form, FormRenderProps } from 'react-final-form';
import { useDispatch } from 'react-redux';

import { OnFormSubmit, OnFormSubmitPayload } from './typedefs';
import {
  ActionCreatorWithPayload,
  ActionCreatorWithPreparedPayload,
} from '@reduxjs/toolkit';

import { asyncValidate } from './asyncValidate';

type FinalFormProps<T = {}> = {
  initialValues?: Record<string, any>;
  component: React.ComponentType<FormRenderProps & T>;
  onSubmit?: OnFormSubmit;
  sagaAction?:
    | ActionCreatorWithPayload<OnFormSubmitPayload>
    | ActionCreatorWithPreparedPayload<
        [payload: any],
        unknown,
        any,
        unknown,
        unknown
      >;
  onSubmitSuccess?: (showSnackbar: ShowSnackbar) => void;
  onSuccessMessage?: string | { message: string; variant: VariantType };
  onSubmitFailure?: (errors: any, showSnackbar: ShowSnackbar) => void;
  skipErrorMessage?: boolean;
  keepDirtyOnReinitialize?: boolean;
  schema: any;
  extraProps?: T;
};
export type ShowSnackbar = (message?: string, variant?: VariantType) => void;

const FinalForm = <T extends {}>({
  initialValues = {},
  component: Component,
  onSubmit,
  sagaAction,
  schema,
  onSubmitSuccess,
  onSuccessMessage,
  onSubmitFailure,
  keepDirtyOnReinitialize = false,
  extraProps,
}: FinalFormProps<T>) => {
  const validate = asyncValidate(schema);
  const { enqueueSnackbar } = useSnackbar();
  const showSnackbar: ShowSnackbar = (
    message = 'Form submitted successfully',
    variant = 'success',
  ) => {
    enqueueSnackbar(message, { variant });
  };

  const dispatch = useDispatch();

  const handleSubmit = (payload: any) => {
    return new Promise((resolve, reject) => {
      sagaAction && dispatch(sagaAction({ payload, meta: { resolve, reject } }));
      onSubmit?.({ payload, meta: { resolve, reject } });
    })
      .then(() => {
        onSubmitSuccess?.(showSnackbar);
        if (onSuccessMessage) {
          typeof onSuccessMessage === 'string'
            ? showSnackbar(onSuccessMessage)
            : showSnackbar(onSuccessMessage.message, onSuccessMessage.variant);
        }
      })
      .catch((errors) => {
        onSubmitFailure?.(errors, showSnackbar);

        return errors;
      });
  };

  return (
    <Form
      keepDirtyOnReinitialize={keepDirtyOnReinitialize}
      initialValues={initialValues}
      validate={validate}
      onSubmit={handleSubmit}
      render={(props) => (
        <Component {...(props as FormRenderProps & T)} {...extraProps} />
      )}
    />
  );
};

export default FinalForm;
