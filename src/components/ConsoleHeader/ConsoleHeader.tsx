import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '@store/index';
import { logout } from '@toolkitSlice/toolkitSlice';
import { ReactComponent as FullllScreen } from '@icons/full-screen.svg';
import { ReactComponent as SmallScreen } from '@icons/small-screen.svg';
import Logo from '@icons/logo.svg';
import LogOut from '@icons/log-out.svg';
import { appTitle, logoutButtonName } from '@namingList/namingList';
import './consoleHeader.scss';
import { useStore } from 'effector-react';
import { $appState, logoutButtonClicked } from '@effectorStore/model';

export const ConsoleHeader = () => {
  // const login = useSelector((state: RootStateType) => state.auth.login);
  // const sublogin = useSelector((state: RootStateType) => state.auth.sublogin);
  const dispatch = useDispatch();
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  const { login, sublogin } = useStore($appState);

  const clickLogout = () => {
    // dispatch(logout());
    logoutButtonClicked();
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
    <nav className='navbar navbar-expand-lg navbar-light console-header'>
      <div className='container-fluid'>
        <img src={Logo} alt='brand' className='navbar-brand' />
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
            <span className='console-header__title'>{appTitle}</span>

            <div className='d-flex justify-content-between align-items-lg-center flex-column flex-lg-row'>
              <button type='button' className='console-header__loginBlock'>{`${login} ${sublogin ? `: ${sublogin}` : ''}`}</button>

              <div>
                <button onClick={clickLogout} type='button' className='console-header__logoutButton'>
                  {logoutButtonName}
                  <img src={LogOut} alt='logout' style={{ marginLeft: '10px' }} />
                </button>
              </div>

              <button onClick={toggleFullScreen} className='console-header__screenSize'>
                {fullScreen ? <SmallScreen /> : <FullllScreen />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
