import React, { useState } from 'react';
import './consoleBody.scss';
import { ReactComponent as FormatIcon } from '@icons/format.svg';
import Split from 'react-split';

export const ConsoleBody = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className='console-body'>
      <Split className='console-body__panels' minSize={400}>
        <div className=''>
          <div>aaaaaaaaaaa</div>
          <div className='console-body__panel'>test1</div>
        </div>

        <div className=''>
          <div>bbbbbbbbbbb</div>
          <div className='console-body__panel'>test2</div>
        </div>
      </Split>

      <div className='console-body__footer'>
        <div>
          {loading ? (
            <button className='loading-button' type='submit' disabled>
              <span className='spinner-border spinner-border-sm' role='status' aria-hidden='true'></span>
            </button>
          ) : (
            <button type='submit' className='submit-button'>
              Отправить
            </button>
          )}
        </div>

        <a href='https://github.com/Kirigaya-Igor' target='_blank' className='git-hub-link' rel='noreferrer'>
          @Мой GitHub
        </a>

        <button type='submit' className='console-body__format-button'>
          <FormatIcon style={{ marginRight: '10px' }} />
          Форматировать
        </button>
      </div>
    </div>
  );
};
