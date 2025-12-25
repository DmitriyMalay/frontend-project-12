import React, { useState, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../slices/authSlice';
import LoginIcon from '../images/loginPic.png';
import Header from './Header';
import routes from '../routes';
import { toast } from 'react-toastify';

const Login = () => {

  const [error, setError] = useState('');
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { t } = useTranslation();

  useEffect(() => {
    if (token) {
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    }
  }, [token, navigate, location]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.login(), values);
        const { token, username } = response.data;
        dispatch(logIn({ token, username }));

        const from = location.state?.from || '/';
        navigate(from, { replace: true });
        setError('');
      } catch (error) {
        setError('Неверные имя пользователя или пароль');
        
        if (!error.response) {
          toast.error(t('notifications.network_error'));      
        } 
        else if (error.response.status === 401) {
          toast.error(t('notifications.authorization_error'));    
        } 
        else if (error.response.status === 500) {
          toast.error(t('notifications.server_error'));
        }
      }
    },
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
                      ref={inputRef}
                      isInvalid={!!error}
                      placeholder="Имя пользователя"
                    />
                    <Form.Label htmlFor="username">Ваш ник</Form.Label>
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
                      isInvalid={!!error}
                    />
                    <Form.Label htmlFor="password">Пароль</Form.Label>
                    {error && <div className="invalid-tooltip">{error}</div>}
                  </Form.Group>
                  <button
                    type="submit"
                    className="w-100 mb-3 btn btn-outline-primary"
                    disabled={formik.isSubmitting}
                  >
                    Войти
                  </button>
                </Form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span>
                  <Link to="/signup">Регистрация</Link>
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
