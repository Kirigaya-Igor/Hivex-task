import { ReactComponent as FormatIcon } from '@icons/format.svg';
import React, { useEffect, useRef, useState } from 'react';
import Split from 'react-split';
import './consoleBody.scss';

export const ConsoleBody = () => {
  const [loading, setLoading] = useState(false);

  const refLeft = useRef(null);
  const [panelsSize, setPanelsSize] = useState([50, 50]);

  const [request, setRequest] = useState('');
  const [requestErr, setRequestErr] = useState(false);

  const [response, setResponse] = useState('Отет сервера');
  const [responseErr, setResponseErr] = useState(false);

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
    try {
      console.log(JSON.parse(request));
      console.log(JSON.stringify(JSON.parse(request), null, 2));
      setRequest(JSON.stringify(JSON.parse(request), null, 2));
      setResponse(JSON.stringify(JSON.parse(request), null, 2));
      setRequestErr(false);
    } catch (e) {
      console.log(e);
      setRequestErr(true);
    }

    // { "test": "5", "hello": "hello", "arr": [{"num": "5", "text": "test"}], "obj": {"test": "hi"} }
    // const str = '{ test: 5, hello: "hello", arr: [{num: 5, text: "test"}], obj: {test: "hi"} }';

    // const reg = /,/;
    // const reg1 = /^.|.$/g;

    // const res = str.split(reg);
    // const res1 = str.replace(reg1, '');

    // console.log(res1);
  };

  return (
    <div className='console-body'>
      <Split className='console-body__panels' minSize={400} gutterSize={15} sizes={panelsSize} onDragEnd={dragEnd}>
        <div className='console-body__panel-block' ref={refLeft}>
          <div className={`console-body__title ${requestErr ? 'console-body__title-err' : ''}`}>
            <span>Запрос:</span>
            {requestErr && <span>{`Пример: { "action": "pong" }`}</span>}
          </div>
          <div className={`console-body__panel ${requestErr ? 'console-body__panel-err' : ''}`}>
            <textarea
              className='console-body__textarea'
              placeholder='Введите запрос в JSON формате'
              value={request}
              onChange={e => setRequest(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className='console-body__panel-block'>
          <div className={`console-body__title ${responseErr ? 'console-body__title-err' : ''}`}>Ответ:</div>
          <div className={`console-body__panel ${responseErr ? 'console-body__panel-err' : ''}`}>
            <textarea className='console-body__textarea' placeholder='Отет сервера' disabled value={response}></textarea>
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
