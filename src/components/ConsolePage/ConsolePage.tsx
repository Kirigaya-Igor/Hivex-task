import { ConsoleBody } from '@components/ConsoleBody/ConsoleBody';
import { ConsoleHeader } from '@components/ConsoleHeader/ConsoleHeader';
import { authenticateCheck } from '@store/toolkitSlice/toolkitSlice';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const ConsolePage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authenticateCheck());
  }, []);

  return (
    <div style={{ height: '100%' }}>
      <ConsoleHeader />

      <ConsoleBody />
    </div>
  );
};
