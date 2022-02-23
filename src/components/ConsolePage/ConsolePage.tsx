import React from 'react';
import { ConsoleHeader } from '@components/ConsoleHeader/ConsoleHeader';
import { RequestHistory } from '@components/RequestHistory/RequestHistory';

export const ConsolePage: React.FC = () => {
  return (
    <div>
      <ConsoleHeader />

      <RequestHistory />
    </div>
  );
};
