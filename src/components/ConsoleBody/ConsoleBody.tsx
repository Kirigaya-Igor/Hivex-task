import { ReactComponent as FormatIcon } from '@icons/format.svg';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Split from 'react-split';
import './consoleBody.scss';

export const ConsoleBody = () => {
  const [loading, setLoading] = useState(false);

  const refLeft = useRef(null);
  const [panelsSize, setPanelsSize] = useState([50, 50]);

  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('response');

  const dragEnd = () => {
    //@ts-ignore
    const leftPanelWidth = refLeft.current.style.width.substr(5, 2);
    const sizes = [+leftPanelWidth, +`${100 - leftPanelWidth}`];

    setPanelsSize(sizes);

    localStorage.setItem('panelsSize', JSON.stringify(sizes));
  };

  useEffect(() => {
    const item = localStorage.getItem('panelsSize');
    if (item !== null) {
      setPanelsSize(JSON.parse(item));
    }
  }, []);

  const formatRequest = () => {
    console.log(JSON.stringify(request));
  };

  return (
    <div className='console-body'>
      <Split className='console-body__panels' minSize={400} gutterSize={15} sizes={panelsSize} onDragEnd={dragEnd}>
        <div className='console-body__panel-block' ref={refLeft}>
          <div className='console-body__title'>Запрос:</div>
          <div className='console-body__panel'>
            <textarea className='console-body__textarea' value={request} onChange={e => setRequest(e.target.value)}>
              test1
            </textarea>
          </div>
        </div>

        <div className='console-body__panel-block'>
          <div className='console-body__title'>Ответ:</div>
          <div className='console-body__panel' style={{ padding: '10px' }}>
            {response}
          </div>
        </div>
      </Split>

      <div className='row console-body__footer'>
        <div className='col-12 col-sm-4 mt-3 mt-sm-0'>
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
        </div>
        <div className='col-12 col-sm-3 col-md-4 d-flex justify-content-sm-center align-items-center mt-3 mt-sm-0'>
          <a href='https://github.com/Kirigaya-Igor' target='_blank' className='git-hub-link' rel='noreferrer'>
            @Мой GitHub
          </a>
        </div>
        <div className='col-12 col-sm-5 col-md-4 d-flex justify-content-sm-end mt-3 mt-sm-0'>
          <button type='submit' className='console-body__format-button' onClick={formatRequest}>
            <FormatIcon style={{ marginRight: '10px' }} />
            Форматировать
          </button>
        </div>
      </div>
    </div>
  );
};
