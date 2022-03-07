import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { Form, Formik } from 'formik';
import { RootStateType } from '@store/index';
import { authenticate } from '@toolkitSlice/toolkitSlice';
import { CustomField } from '@components/common/customField';
import { Alert } from '@components/alert/alert';
import Logo from '@icons/logo.svg';
import {
  loginButtonName,
  gitHubLinkName,
  errorRequiredField,
  errorEmail,
  errorPassword,
  appTitle,
  loginPlaceholder,
  subloginPlaceholder,
  optionalFieldName,
  passwordPlaceholder,
} from '@namingList/namingList';
import './loginPage.scss';

interface MyFormValues {
  login: string;
  sublogin: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const initialValues: MyFormValues = { login: '', sublogin: '', password: '' };
  const dispatch = useDispatch();
  const loading = useSelector((state: RootStateType) => state.auth.loading);
  const isLoggedIn = useSelector((state: RootStateType) => !!state.auth.sessionKey?.length);
  const history = useHistory();

  useEffect(() => {
    isLoggedIn && history.push('/console');
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
      errors.login = errorRequiredField;
    } else if (!/^[\w@.-]{3,}$/i.test(values.login)) {
      errors.login = errorEmail;
    }

    if (!values.password) {
      errors.password = errorRequiredField;
    } else if (!/^(?=.*[\w])[\w\s!@#$%^&*-]{6,}$/i.test(values.password)) {
      errors.password = errorPassword;
    }
    return errors;
  };

  return (
    <div className='login-page'>
      <img src={Logo} alt='' className='login-page__logo' />
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
                  <h3 className='login-page__title'>{appTitle}</h3>
                  <Alert />
                  <CustomField
                    itemId='Login'
                    placeholder={loginPlaceholder}
                    itemLabel={loginPlaceholder}
                    itemType='text'
                    itemName='login'
                    important={true}
                    errors={errors}
                    loading={loading}
                  />
                  <CustomField
                    itemId='SubLogin'
                    placeholder={subloginPlaceholder}
                    itemLabel={subloginPlaceholder}
                    helpLabel={optionalFieldName}
                    itemType='text'
                    itemName='sublogin'
                    important={false}
                    errors={errors}
                    loading={loading}
                  />
                  <CustomField
                    itemId='Password'
                    placeholder={passwordPlaceholder}
                    itemLabel={passwordPlaceholder}
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
                        {loginButtonName}
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
        {gitHubLinkName}
      </a>
    </div>
  );
};

export default withRouter(LoginPage);
