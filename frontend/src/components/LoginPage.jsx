import React from 'react';
import { Form } from 'react-bootstrap';
import Header from './Header';
import LoginIcon from '../images/loginPic.png'
import { useFormik } from 'formik'
import * as Yup from 'yup';


const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .required('Имя пользователя обязательно'),
  password: Yup.string()
    .min(6, 'Пароль должен содержать не менее 6 символов')
    .required('Пароль обязателен'),
});

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    // onSubmit: async (values) => {
    //   // try {
    //   //   const response = await axios.post(routes.loginPath(), values);
    //   //   const { token } = response.data;

    //   //   localStorage.setItem('userId', JSON.stringify({ token }));
    //   //   auth.logIn();

    //   //   navigate('/private', { replace: true });
    //   // } catch (err) {
    //   //   setError('the username or password is incorrect');
    //   // }
    // },
  });

  return (
    <>
      <Header />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img 
                  src={LoginIcon}
                  className="rounded-circle"
                  alt="login"
                  />
                </div>
                <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form.Group className="form-group form-floating mb-3">
                    <Form.Control
                      type="text"
                      name="username"
                      className="form-control"
                      autoComplete="username"
                      required
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      id="username"
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.username && !!formik.errors.username}
                      placeholder="Имя пользователя"
                    />
                    <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.username}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="form-group form-floating mb-4">
                    <Form.Control
                      type="password"
                      name="password"
                      id="password"
                      className="form-control"
                      autoComplete="current-password"
                      placeholder="Пароль"
                      required
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.password && !!formik.errors.password}
                    />
                    <Form.Label htmlFor="password">Пароль</Form.Label>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <button
                    type="submit"
                    className="w-100 mb-3 btn btn-outline-primary"
                  >
                    Войти
                  </button>
                </Form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span>&nbsp;
                  <a href="/signup">Зарегистрироваться</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;