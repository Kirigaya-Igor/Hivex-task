import React from 'react';
import { ConsoleHeader } from '@components/ConsoleHeader/ConsoleHeader';
import { RequestHistory } from '@components/RequestHistory/RequestHistory';
import { ConsoleBody } from '@components/ConsoleBody/ConsoleBody';

export const ConsolePage: React.FC = () => {
  return (
    <div style={{ height: '100%' }}>
      <ConsoleHeader />

      <RequestHistory />

      <ConsoleBody />
    </div>
  );
};
