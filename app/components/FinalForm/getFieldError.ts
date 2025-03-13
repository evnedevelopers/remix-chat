import { FieldMetaState } from 'react-final-form';

export const getFieldError = (meta: FieldMetaState<unknown>) => {
  return (
    !meta.dirtySinceLastSubmit &&
    meta.touched &&
    (meta.error || meta.submitError)
  );
};
