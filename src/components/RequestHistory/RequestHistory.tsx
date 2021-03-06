import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '@store/index';
import { clearRequestHistory, copyRequestHistory, removeRequestHistory, requestHistoryArrType } from '@store/toolkitSlice/toolkitSlice';
import GoodRequest from '@icons/good-request.svg';
import BadRequest from '@icons/bad-request.svg';
import Clear from '@icons/cross.svg';
import Dots from '@icons/dots.svg';
import './requestHistory.scss';
import { copySelectItem, deleteSelectItem, doSelectItem, itemCoped } from '@namingList/namingList';

type RequestHistoryType = {
  runHistoryRequest: (item: requestHistoryArrType) => void;
};

export const RequestHistory: React.FC<RequestHistoryType> = ({ runHistoryRequest }) => {
  const dispatch = useDispatch();
  const requestHistoryArr: Array<requestHistoryArrType> = useSelector((state: RootStateType) => state.auth.requestHistoryArr);

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.currentTarget.scrollTo({
      left: e.currentTarget.scrollLeft + e.deltaY * 4,
      behavior: 'smooth',
    });
  };

  const copyRequest = (item: requestHistoryArrType) => {
    const theClipboard = navigator.clipboard;

    try {
      theClipboard.writeText(item.body);
      dispatch(copyRequestHistory({ ...item, isCopied: true }));

      setTimeout(() => dispatch(copyRequestHistory({ ...item, isCopied: false })), 1000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const removeHistoryItem = (item: requestHistoryArrType) => {
    dispatch(removeRequestHistory(item));
  };

  const clearHistory = () => {
    dispatch(clearRequestHistory());
  };

  return (
    <div className='d-flex'>
      <div className='request-history' onWheel={onWheel}>
        {requestHistoryArr.map((item, index) => (
          <div key={index}>
            <button className='request-history__item' type='button' data-bs-toggle='dropdown' aria-expanded='false'>
              <img src={`${item.isSuccess ? GoodRequest : BadRequest}`} alt='circle' />
              <div>
                <span className='request-history__text'>{item.title}</span>
                {item.isCopied && <span className='request-history__copy-text'>{itemCoped}</span>}
              </div>
              <img src={Dots} alt='dots' />
            </button>
            <ul className='dropdown-menu'>
              <li>
                <button
                  className='custom__dropdown__item custom__dropdown__item__standart'
                  type='button'
                  onClick={() => runHistoryRequest(item)}
                >
                  {doSelectItem}
                </button>
              </li>
              <li>
                <button className='custom__dropdown__item custom__dropdown__item__standart' type='button' onClick={() => copyRequest(item)}>
                  {copySelectItem}
                </button>
              </li>
              <li>
                <hr className='dropdown-divider' />
              </li>
              <li>
                <button
                  className='custom__dropdown__item custom__dropdown__item__delete'
                  type='button'
                  onClick={() => removeHistoryItem(item)}
                >
                  {deleteSelectItem}
                </button>
              </li>
            </ul>
          </div>
        ))}

        <div className='history-gradient'></div>
      </div>
      <div className='clear-history'>
        <button style={{ border: 'none', backgroundColor: 'transparent' }} onClick={clearHistory}>
          <img src={Clear} alt='clear' />
        </button>
      </div>
    </div>
  );
};
