import { ReactComponent as FormatIcon } from '@icons/format.svg';
import React, { useEffect, useRef, useState } from 'react';
import Split from 'react-split';
import './consoleBody.scss';
import api from '@helpers/sendsay';
import { RequestHistory } from '@components/RequestHistory/RequestHistory';
import { addRequestHistory, requestHistoryArrType } from '@store/toolkitSlice/toolkitSlice';
import { useDispatch } from 'react-redux';

export const ConsoleBody = () => {
  const dispatch = useDispatch();
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

  const formatRequest = (request: string) => {
    try {
      setRequest(JSON.stringify(JSON.parse(request), null, 2));
      setRequestErr(false);
    } catch (e) {
      setRequestErr(true);
    }
  };

  const addHIstoryItem = (isSuccess: boolean, request: string) => {
    const obj = JSON.parse(request);
    const item = {
      id: obj.action + Date.now(),
      title: obj.action,
      body: request,
      isCopied: false,
      isSuccess,
    };

    dispatch(addRequestHistory(item));
  };

  const sendRequest = async (request: string) => {
    formatRequest(request);
    setLoading(true);
    try {
      if (JSON.parse(request)) {
        await api.sendsay
          .request(JSON.parse(request))
          //@ts-ignore
          .then(res => {
            setResponse(JSON.stringify(res, null, 2));
            setResponseErr(false);
            setLoading(false);
            addHIstoryItem(true, request);
          })
          //@ts-ignore
          .catch(err => {
            setResponseErr(true);
            setResponse(JSON.stringify(err, null, 2));
            setLoading(false);
            addHIstoryItem(false, request);
          });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const runHistoryRequest = (item: requestHistoryArrType) => {
    sendRequest(item.body);
  };

  return (
    <div className='console-body'>
      <RequestHistory runHistoryRequest={runHistoryRequest} />
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
              disabled={loading && true}
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
              <button type='submit' className='submit-button' onClick={() => sendRequest(request)}>
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
          <button type='submit' className='console-body__format-button' onClick={() => formatRequest(request)}>
            <FormatIcon style={{ marginRight: '10px' }} />
            Форматировать
          </button>
        </div>
      </div>
    </div>
  );
};
