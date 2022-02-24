import React, { useState } from 'react';
import './requestHistory.scss';

export const RequestHistory: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.currentTarget.scrollTo({
      left: e.currentTarget.scrollLeft + e.deltaY * 4,
      behavior: 'smooth',
    });
  };

  return (
    <div className='d-flex'>
      <div className='request-history' onWheel={onWheel}>
        {arr.map((item, index) => (
          <div key={index}>
            <button className='request-history__item' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
              <img src={`${isSuccess ? '/icons/good-request.svg' : '/icons/bad-request.svg'}`} alt='logout' />
              <span className='request-history__text'>test</span>
              <img src='/icons/dots.svg' alt='logout' />
            </button>
            <ul className='dropdown-menu'>
              <li>
                <button className='custom__dropdown__item custom__dropdown__item__standart' type='button'>
                  Выполнить
                </button>
              </li>
              <li>
                <button className='custom__dropdown__item custom__dropdown__item__standart' type='button'>
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
