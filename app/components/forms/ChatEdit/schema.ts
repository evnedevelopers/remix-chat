import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required('Name is a required field'),
  // INJECT
});
