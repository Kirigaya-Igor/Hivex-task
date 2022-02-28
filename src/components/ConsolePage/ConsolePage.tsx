import React, { useEffect } from 'react';
import { ConsoleHeader } from '@components/ConsoleHeader/ConsoleHeader';
import { RequestHistory } from '@components/RequestHistory/RequestHistory';
import { ConsoleBody } from '@components/ConsoleBody/ConsoleBody';
import { useDispatch } from 'react-redux';
import { authenticateCheck } from '@store/toolkitSlice/toolkitSlice';

export const ConsolePage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticateCheck());
  }, []);

  return (
    <div style={{ height: '100%' }}>
      <ConsoleHeader />

      {/* <RequestHistory /> */}

      <ConsoleBody />
    </div>
  );
};
