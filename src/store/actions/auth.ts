import { createActions } from 'redux-actions';

import { ActionTypes } from '@store/constants';

export const { authenticate, authenticateCheck, authenticateSuccess, authenticateFailure, logout, showAlert } = createActions({
  [ActionTypes.AUTHENTICATE_CHECK]: payload => payload,
});
