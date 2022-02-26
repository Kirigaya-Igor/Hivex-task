import React, { useState } from 'react';
import './requestHistory.scss';

export const RequestHistory: React.FC = () => {
  const [testArr, setTestArr] = useState([
    { id: 1, title: 'test1', isCopied: false, isSuccess: false },
    { id: 2, title: 'test2', isCopied: false, isSuccess: true },
    { id: 3, title: 'test3', isCopied: false, isSuccess: false },
    { id: 5, title: 'test4', isCopied: false, isSuccess: true },
    { id: 6, title: 'test5', isCopied: false, isSuccess: true },
    { id: 7, title: 'test6', isCopied: false, isSuccess: true },
    { id: 8, title: 'test7', isCopied: false, isSuccess: true },
    { id: 9, title: 'test8', isCopied: false, isSuccess: true },
    { id: 10, title: 'test9', isCopied: false, isSuccess: true },
    { id: 11, title: 'test10', isCopied: false, isSuccess: true },
    { id: 12, title: 'test11', isCopied: false, isSuccess: true },
    { id: 13, title: 'test12', isCopied: false, isSuccess: true },
    { id: 14, title: 'test13', isCopied: false, isSuccess: true },
    { id: 15, title: 'test14', isCopied: false, isSuccess: true },
  ]);

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.currentTarget.scrollTo({
      left: e.currentTarget.scrollLeft + e.deltaY * 4,
      behavior: 'smooth',
    });
  };

  const copyRequest = (item: any) => {
    const theClipboard = navigator.clipboard;

    try {
      theClipboard.writeText(item.title);
      setTestArr(testArr.map(el => (el.id == item.id ? { ...el, isCopied: true } : el)));

      setTimeout(() => setTestArr(testArr.map(el => (el.id == item.id ? { ...el, isCopied: false } : el))), 1000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <div className='d-flex'>
      <div className='request-history' onWheel={onWheel}>
        {testArr.map((item, index) => (
          <div key={index}>
            <button className='request-history__item' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
              <img src={`${item.isSuccess ? '/icons/good-request.svg' : '/icons/bad-request.svg'}`} alt='logout' />
              <div>
                <span className='request-history__text'>{item.title}</span>
                {item.isCopied && <span className='request-history__copy-text'>Скопировано</span>}
              </div>
              <img src='/icons/dots.svg' alt='logout' />
            </button>
            <ul className='dropdown-menu'>
              <li>
                <button className='custom__dropdown__item custom__dropdown__item__standart' type='button'>
                  Выполнить
                </button>
              </li>
              <li>
                <button className='custom__dropdown__item custom__dropdown__item__standart' type='button' onClick={() => copyRequest(item)}>
                  Скопировать
                </button>
              </li>
              <li>
                <hr className='dropdown-divider' />
              </li>
              <li>
                <button className='custom__dropdown__item custom__dropdown__item__delete' type='button'>
                  Удалить
                </button>
              </li>
            </ul>
          </div>
        ))}

        <div className='history-gradient'></div>
      </div>
      <div className='clear-history'>
        <button style={{ border: 'none', backgroundColor: 'transparent' }}>
          <img src='/icons/cross.svg' alt='clear' />
        </button>
      </div>
    </div>
  );
};
