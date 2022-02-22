import { handleActions } from 'redux-actions';

import { ActionTypes } from '../constants';

export const initialState = {
  loading: false,
  sessionKey: null,
  login: null,
  sublogin: null,
  showAlert: false,
  alertMessage: null,
};

export default {
  auth: handleActions(
    {
      [ActionTypes.AUTHENTICATE]: state => {
        return {
          ...state,
          loading: true,
        };
      },
      [ActionTypes.AUTHENTICATE_SUCCESS]: (state, { payload }) => {
        return {
          ...state,
          loading: false,
          sessionKey: payload.sessionKey,
          login: payload.login,
          sublogin: payload.sublogin,
        };
      },
      [ActionTypes.AUTHENTICATE_FAILURE]: state => {
        return {
          ...state,
          sessionKey: null,
          login: null,
          sublogin: null,
        };
      },
      [ActionTypes.LOGOUT]: state => {
        return {
          ...state,
          loading: false,
          sessionKey: null,
        };
      },
      [ActionTypes.SHOW_ALERT]: (state, { payload }) => {
        return {
          ...state,
          showAlert: payload.showAlert,
          alertMessage: payload.alertMessage,
        };
      },
    },
    initialState
  ),
};
