import { setIn } from 'final-form';

export const asyncValidate = (schema: any) => async (values: any) => {
  if (typeof schema === 'function') {
    schema = schema();
  }
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (err: any) {
    return err.inner.reduce((formError: any, innerError: any) => {
      return setIn(formError, innerError.path, innerError.message);
    }, {});
  }
};
