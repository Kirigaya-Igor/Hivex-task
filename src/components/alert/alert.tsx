import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './alert.scss';
import errorIcon from './errorIcon.png';
import { showAlert } from '../../store/actions/auth';

export const Alert: React.FC = () => {
  const [alertMsg, setAlertMsg] = useState<string>('');
  const dispatch = useDispatch();

  //@ts-ignore
  const showAlertState = useSelector(state => state.auth.showAlert);
  //@ts-ignore
  const alertMessage = useSelector(state => state.auth.alertMessage);

  const showAlertFunction = () => {
    alertMessage && setAlertMsg(`{id: ${alertMessage.id}, explain: ${alertMessage.explain}}`);
    showAlertState && setTimeout(hideAlert, 10000);
  };

  useEffect(() => {
    showAlertState && hideAlert();
  }, []);

  useEffect(() => {
    showAlertFunction();
  }, [showAlertState]);

  const hideAlert = () => {
    dispatch(
      showAlert({
        showAlert: false,
        alertMessage: null,
      })
    );
  };

  return (
    <>
      {showAlertState && (
        <div className='alert alert-dismissible alert-warning'>
          <div className='d-flex align-items-center'>
            <img src={errorIcon} alt='icon' style={{ marginRight: '15px' }} />
            <strong>Произошла ошибка!</strong>
          </div>
          <span style={{ marginLeft: '39px' }}>{alertMsg}</span>
          <button
            onClick={hideAlert}
            type='button'
            className='btn-close'
            style={{ margin: '10px 10px 0px 0px', padding: '10px' }}
            aria-label='Close'
          ></button>
        </div>
      )}
    </>
  );
};
