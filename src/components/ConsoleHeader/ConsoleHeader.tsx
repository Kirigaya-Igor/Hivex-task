import { logout } from '@actions/auth';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './consoleHeader.scss';

export const ConsoleHeader = () => {
  //@ts-ignore
  const login = useSelector(state => state.auth.login);
  //@ts-ignore
  const sublogin = useSelector(state => state.auth.sublogin);
  //@ts-ignore
  const isLoggedIn = useSelector(state => !!state.auth.sessionKey?.length);
  const dispatch = useDispatch();
  const history = useHistory();
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn]);

  const clickLogout = () => {
    dispatch(logout());
  };

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }

    setFullScreen(prev => !prev);
  }

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light customHeader'>
      <div className='container-fluid'>
        <img src='/icons/logo.svg' alt='' className='navbar-brand' />
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <div className='d-flex justify-content-between flex-column flex-lg-row w-100' style={{ paddingRight: '30px' }}>
            <span className='title'>API-консолька</span>

            <div className='d-flex justify-content-between align-items-lg-center flex-column flex-lg-row'>
              <div className='loginBlock'>{`${login} ${sublogin ? `: ${sublogin}` : ''}`}</div>

              <div>
                <button onClick={clickLogout} type='button' className='logoutButton'>
                  Выйти
                  <img src='/icons/log-out.svg' alt='logout' style={{ marginLeft: '10px' }} />
                </button>
              </div>

              <div>
                <img
                  onClick={toggleFullScreen}
                  src={`${fullScreen ? '/icons/small-screen.svg' : '/icons/full-screen.svg'}`}
                  alt='fullScreen'
                  className='screenSize'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
