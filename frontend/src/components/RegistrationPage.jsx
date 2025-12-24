import React, { useState, useRef, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logIn } from '../slices/authSlice';
import signUpIcon from '../images/signupPic.png';
import Header from './Header';
import routes from '../routes';
import registrationSchema from '../shemas/RegistrationFormShema';
import { useTranslation } from 'react-i18next';

const RegistrationForm = () =>  {

  const [touchedFields, setTouchedFields] = useState({
    username: false,
    password: false,
    confirmPassword: false,
  });
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleBlur = (fieldName) => (e) => {
    formik.handleBlur(e);
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  const showError = (fieldName) => {
    return formik.touched[fieldName] && formik.errors[fieldName];
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: registrationSchema,
    validateOnBlur: true,
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {

        const { confirmPassword, ...userData } = values;

        const response = await axios.post('/api/v1/signup', userData);                
        console.log('Успешная регистрация:', response.data);

        resetForm();
                
        const { token, username } = response.data;

        dispatch(logIn({ token, username }));
        navigate(routes.mainPage());        
      } catch (error) {

        console.error('Ошибка регистрации:', error);
        
        if (error.response?.status === 409) {
          formik.setErrors({ 
            general: 'signUp.user_already_exists', 
          });
        }

      } finally {
        setSubmitting(false);
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
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img 
                    src={signUpIcon}
                    className="rounded-circle"
                    alt="signup"
                  />
                </div> 
                <Form onSubmit={formik.handleSubmit} className="w-50">
                  <h1 className="text-center mb-4">Регистрация</h1>
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
                      isInvalid={showError('username')}
                      onBlur={handleBlur('username')}
                    />
                    <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                    {showError('username') && (
                      <Form.Control.Feedback type="invalid">
                        {t(formik.errors.username)}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group className="form-group form-floating mb-3">
                    <Form.Control
                      type="password"
                      name="password"
                      className="form-control"
                      autoComplete="password"
                      required
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      id="password"
                      isInvalid={showError('password')}
                      onBlur={handleBlur('password')}
                    />
                    <Form.Label htmlFor="password">Пароль</Form.Label>
                    {showError('password') && (
                      <Form.Control.Feedback type="invalid">
                        {t(formik.errors.password)}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  <Form.Group className="form-group form-floating mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Пароли должны совпадать"
                      name="confirmPassword"
                      required
                      autoComplete="new-password"
                      id="confirmPassword"
                      className="form-control"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      isInvalid={showError('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                    />
                    <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                    {showError('confirmPassword') && (
                      <Form.Control.Feedback type="invalid">
                        {t(formik.errors.confirmPassword)}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>
                  {formik.errors.general && (
                    <div className="alert alert-danger mb-3" role="alert" style={{ fontSize: '0.875em' }}>
                      {t(formik.errors.general)}
                    </div>
                  )}
                  <button type="submit" className="w-100 btn btn-outline-primary">
                    {t('signUp.submit')}
                  </button>
                </Form>
              </div>            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;