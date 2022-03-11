import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { authenticate } from '@toolkitSlice/toolkitSlice';
import { Form, Formik } from 'formik';
import { CustomField } from '@components/common/customField';
import './loginPage.scss';
import { Alert } from '@components/alert/alert';

interface MyFormValues {
  login: string;
  sublogin: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const initialValues: MyFormValues = { login: '', sublogin: '', password: '' };
  const dispatch = useDispatch();
  //@ts-ignore
  const loading = useSelector(state => state.auth.loading);
  //@ts-ignore
  const isLoggedIn = useSelector(state => !!state.auth.sessionKey?.length);
  const history = useHistory();

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/console');
    }
  }, [isLoggedIn]);

  const doLogin = (login: string, sublogin: string, password: string) => {
    dispatch(
      authenticate({
        login,
        sublogin,
        password,
      })
    );
  };

  function onSubmit(values: MyFormValues) {
    doLogin(values.login, values.sublogin, values.password);
  }

  const validate = (values: MyFormValues) => {
    const errors: MyFormValues = {} as MyFormValues;

    if (!values.login) {
      errors.login = 'Обязательное поле';
    } else if (!/^[\w@.-]{3,}$/i.test(values.login)) {
      errors.login = 'Не правильный email';
    }

    if (!values.password) {
      errors.password = 'Обязательное поле';
    } else if (!/^(?=.*[\w])[\w\s!@#$%^&*-]{6,}$/i.test(values.password)) {
      errors.password =
        'Пароль должен состоять из минимум 6 символов(спец. символы не обязательны): a-z, A-Z, 0-9, !, @, #, $, %, ^, &, *, _, - ';
    }
    return errors;
  };

  return (
    <div className='login-page'>
      <img src='/icons/logo.svg' alt='' className='login-page__logo' />
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values, { resetForm }) => {
          onSubmit(values);
          resetForm({});
        }}
      >
        {({ isValid, errors, dirty }) => (
          <div className='container-fluid'>
            <div className='row d-flex justify-content-center'>
              <div className='col d-flex justify-content-center'>
                <Form className='login-page__customForm'>
                  <h3 className='login-page__title'>API-консолька</h3>
                  <Alert />
                  <CustomField
                    itemId='Login'
                    placeholder='Логин'
                    itemLabel='Логин'
                    itemType='text'
                    itemName='login'
                    important={true}
                    errors={errors}
                    loading={loading}
                  />
                  <CustomField
                    itemId='SubLogin'
                    placeholder='Сублогин'
                    itemLabel='Сублогин'
                    helpLabel='Опционально'
                    itemType='text'
                    itemName='sublogin'
                    important={false}
                    errors={errors}
                    loading={loading}
                  />
                  <CustomField
                    itemId='Password'
                    placeholder='Пароль'
                    itemLabel='Пароль'
                    itemType='password'
                    itemName='password'
                    important={true}
                    errors={errors}
                    loading={loading}
                  />
                  <div>
                    {loading ? (
                      <button className='loading-button' type='submit' disabled>
                        <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>
                      </button>
                    ) : (
                      <button type='submit' disabled={!isValid || !dirty} className='submit-button'>
                        Войти
                      </button>
                    )}
                  </div>
                </Form>
              </div>
            </div>
          </div>
        )}
      </Formik>
      <a href='https://github.com/Kirigaya-Igor' target='_blank' className='git-hub-link' rel='noreferrer' style={{ marginTop: '20px' }}>
        @Мой GitHub
      </a>
    </div>
  );
};

export default withRouter(LoginPage);
