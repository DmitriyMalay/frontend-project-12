import * as yup from 'yup';

const registrationSchema = yup.object({
  username: yup.string()
    .min(3, 'modals.registration_min')
    .max(20, 'modals.registration_max')
    .required('modals.required'),
  password: yup.string()
    .min(6, 'modals.password_min')
    .required('modals.required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'modals.password_confirm')
    .required('modals.required'),
});

export default registrationSchema;