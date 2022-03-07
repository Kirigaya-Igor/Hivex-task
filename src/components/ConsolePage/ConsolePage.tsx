import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootStateType } from '@store/index';
import { authenticateCheck } from '@store/toolkitSlice/toolkitSlice';
import { ConsoleBody } from '@components/ConsoleBody/ConsoleBody';
import { ConsoleHeader } from '@components/ConsoleHeader/ConsoleHeader';

export const ConsolePage: React.FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootStateType) => !!state.auth.sessionKey?.length);
  const history = useHistory();

  useEffect(() => {
    dispatch(authenticateCheck());
  }, []);

  useEffect(() => {
    !isLoggedIn && history.push('/');
  }, [isLoggedIn]);

  return (
    <div style={{ height: '100%' }}>
      <ConsoleHeader />

      <ConsoleBody />
    </div>
  );
};
