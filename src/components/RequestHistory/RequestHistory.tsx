import React, { useEffect, useRef, useState } from 'react';
import './requestHistory.scss';

export const RequestHistory: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

  //   useEffect(() => {
  //     const element = scrollRef.current;
  //     console.log(element);
  //     if (element) {
  //       const onWheel = (e: any) => {
  //         e.preventDefault();
  //         element.scrollTo({
  //           left: element.scrollLeft + e.deltaY * 4,
  //           behavior: 'smooth',
  //         });
  //       };

  //       element.addEventListener('wheel', onWheel);

  //       return () => element.removeEventListener('wheel', onWheel);
  //     }
  //   }, []);

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.currentTarget.scrollTo({
      left: e.currentTarget.scrollLeft + e.deltaY * 4,
      behavior: 'smooth',
    });
  };

  return (
    <div className='request-history' ref={scrollRef} onWheel={onWheel}>
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
    </div>
  );
};
