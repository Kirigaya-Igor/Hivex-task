import { all, put, call, takeLatest } from 'redux-saga/effects';
import api from '../../helpers/sendsay';

import { ActionTypes } from '../constants';
import { authenticateSuccess, authenticateFailure, showAlert } from '../actions/auth';

export function* authenticateCheckSaga() {
  try {
    yield api.sendsay.request({
      action: 'pong',
    });
  } catch (error) {
    //@ts-ignore
    if (error.id === 'error/auth/failed') {
      yield call(logoutSaga);
    }
  }
}

//@ts-ignore
export function* authenticateSaga({ payload }) {
  try {
    yield api.sendsay
      .login({
        login: payload.login,
        sublogin: payload.sublogin,
        password: payload.password,
      })
      .then(() => {
        document.cookie = `sendsay_session=${api.sendsay.session}`;
      });
  } catch (e) {
    console.log('err', e);
    document.cookie = '';
    yield put(
      showAlert({
        showAlert: true,
        //@ts-ignore
        alertMessage: { id: e.id, explain: e.explain },
      })
    );
  }

  yield put(
    authenticateSuccess({
      sessionKey: api.sendsay.session,
      login: payload.login,
      sublogin: payload.sublogin,
    })
  );
}

export function* logoutSaga() {
  yield put(authenticateFailure());
  document.cookie = '';
}

export default function* root() {
  yield all([
    //@ts-ignore
    takeLatest(ActionTypes.AUTHENTICATE, authenticateSaga),
    takeLatest(ActionTypes.AUTHENTICATE_CHECK, authenticateCheckSaga),
    takeLatest(ActionTypes.LOGOUT, logoutSaga),
  ]);
}
