import React, { useEffect, useRef, useState } from 'react';
import './consoleBody.scss';
import { ReactComponent as FormatIcon } from '@icons/format.svg';
import Split from 'react-split';

type panelsWidthType = {
  initialPos: number;
  initialSize: number;
  leftPanel: number;
  //   rightPanel: number;
};

export const ConsoleBody = () => {
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);
  const [panelsWidth, setPanelsWidth] = useState<panelsWidthType>({
    initialPos: 0,
    initialSize: 0,
    leftPanel: 0,
    // rightPanel: 0,
  });

  useEffect(() => {
    const resizeableEle = ref.current;

    setPanelsWidth({
      ...panelsWidth,
      //@ts-ignore
      leftPanel: resizeableEle.offsetWidth,
      //@ts-ignore
      //   rightPanel: resizeableEle.offsetWidth,
    });
  }, []);

  const initial = (e: any) => {
    const resizable = document.getElementById('Resizable');

    console.log(e.clientX);
    //@ts-ignore
    console.log(resizable.offsetWidth);

    resizable &&
      setPanelsWidth({
        ...panelsWidth,
        initialPos: e.clientX,
        initialSize: resizable.offsetWidth,
      });
  };

  const changeSize = (e: any) => {
    const resizable = document.getElementById('Resizable');

    console.log(e.clientX);
    if (resizable && e.clientX !== 0) {
      setPanelsWidth({
        ...panelsWidth,
        //@ts-ignore
        leftPanel: panelsWidth.initialSize + (e.clientX - panelsWidth.initialPos),
      });
      resizable.style.width = `${panelsWidth.initialSize + (e.clientX - panelsWidth.initialPos)}px`;
      console.log(panelsWidth.initialSize + (e.clientX - panelsWidth.initialPos));
    }
  };

  const onTouchStart = (e: any) => {
    const resizable = document.getElementById('Resizable');

    resizable &&
      setPanelsWidth({
        ...panelsWidth,
        initialPos: e.touches[0].clientX,
        initialSize: resizable.offsetWidth,
      });
  };

  const onTouchMove = (e: any) => {
    const resizable = document.getElementById('Resizable');

    if (resizable) {
      resizable.style.width = `${panelsWidth.initialSize + (e.touches[0].clientX - panelsWidth.initialPos)}px`;

      setPanelsWidth({
        ...panelsWidth,
        leftPanel: panelsWidth.initialSize + (e.touches[0].clientX - panelsWidth.initialPos),
      });
    }
  };

  return (
    <div className='console-body'>
      <div className='console-body__panels'>
        <div id='Resizable' ref={ref} style={{ width: `calc(50% - 10px)` }}>
          <div className='console-body__title'>Запрос:</div>
          <div className='console-body__panel'>test1</div>
        </div>
        <div
          className='gutter'
          draggable='true'
          onDragStart={initial}
          onDrag={changeSize}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
        ></div>
        {/* <div className='gutter' draggable='true' onDragStart={initial} onDrag={changeSize}></div> */}

        {/* <div style={{ width: `calc(${panelsWidth.leftPanel}% - 10px)` }} id='Resizable'>
          <div className='console-body__title'>Запрос:</div>
          <div className='console-body__panel'>test1</div>
        </div> */}

        <div style={{ height: '100%', width: `calc(100% - ${panelsWidth.leftPanel}px - 10px)` }}>
          <div className='console-body__title'>Ответ:</div>
          <div className='console-body__panel'>test2</div>
        </div>
      </div>
      {/* <Split className='console-body__panels' direction='horizontal' minSize={400} gutterSize={10}>
        <div>
          <div className='console-body__title'>Запрос:</div>
          <div className='console-body__panel'>test1</div>
        </div>

        <div>
          <div className='console-body__title'>Ответ:</div>
          <div className='console-body__panel'>test2</div>
        </div>
      </Split> */}

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
          <button type='submit' className='console-body__format-button'>
            <FormatIcon style={{ marginRight: '10px' }} />
            Форматировать
          </button>
        </div>
      </div>
    </div>
  );
};
