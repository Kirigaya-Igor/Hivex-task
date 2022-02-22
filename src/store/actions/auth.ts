import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants';

export const { authenticate, authenticateCheck, authenticateSuccess, authenticateFailure, logout, showAlert } = createActions({
  [ActionTypes.AUTHENTICATE]: payload => payload,
  [ActionTypes.AUTHENTICATE_CHECK]: payload => payload,
  [ActionTypes.AUTHENTICATE_SUCCESS]: payload => payload,
  [ActionTypes.AUTHENTICATE_FAILURE]: payload => payload,
  [ActionTypes.LOGOUT]: payload => payload,
  [ActionTypes.SHOW_ALERT]: payload => payload,
});
