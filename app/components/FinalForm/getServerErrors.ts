import { FORM_ERROR } from 'final-form';

export const getServerFormErrors = (e: ServerFormErrors): FormErrors => {
  return {
    [FORM_ERROR]: 'Please check form fields',
    ...e,
  };
};

export type ServerFormErrors = {
  error: { details: { [key: string]: string[] } };
};

export type FormErrors = {
  [key: string]: any;
};
