import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '@store/index';
import { showAlert } from '@toolkitSlice/toolkitSlice';
import { alertErrorTitle } from '@namingList/namingList';
import './alert.scss';

export const Alert: React.FC = () => {
  const [alertMsg, setAlertMsg] = useState<string>('');
  const dispatch = useDispatch();
  const showAlertState = useSelector((state: RootStateType) => state.auth.showAlert);
  const alertMessage = useSelector((state: RootStateType) => state.auth.alertMessage);

  const showAlertFunction = () => {
    alertMessage && setAlertMsg(`{id: ${alertMessage.id}, explain: ${alertMessage.explain}}`);
    // showAlertState && setTimeout(hideAlert, 10000);
  };

  useEffect(() => {
    showAlertState && hideAlert();

    return () => {
      showAlertState && hideAlert();
    };
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
        <div className='alert alert-dismissible customAlert'>
          <div className='customAlert__warning'>
            <div className='d-flex align-items-center'>
              <img src='/icons/errorIcon.png' alt='icon' style={{ marginRight: '15px' }} />
              <strong>{alertErrorTitle}</strong>
            </div>
            <span className='customAlert__message'>{alertMsg}</span>
            <button onClick={hideAlert} type='button' className='customAlert__close-btn' aria-label='Close'></button>
          </div>
        </div>
      )}
    </>
  );
};
