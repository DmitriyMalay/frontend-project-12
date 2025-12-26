import * as yup from 'yup'

const registrationSchema = yup.object({
  username: yup.string()
    .min(3, 'signUp.registration_min')
    .max(20, 'signUp.registration_max')
    .required('signUp.required'),
  password: yup.string()
    .min(6, 'signUp.password_min')
    .required('signUp.required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'signUp.password_confirm')
    .required('signUp.required'),
})

export default registrationSchema
