import { all, put, call, takeLatest } from 'redux-saga/effects';
import api from '@helpers/sendsay';

import { authenticate, authenticateSuccess, authenticateFailure, showAlert, logout, authenticateCheck } from '@toolkitSlice/toolkitSlice';

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

type authenticateType = {
  payload: {
    login: string;
    sublogin: string;
    password: string;
  };
};

export function* authenticateSaga({ payload }: authenticateType) {
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

    yield put(
      authenticateSuccess({
        sessionKey: api.sendsay.session,
        login: payload.login,
        sublogin: payload.sublogin,
      })
    );
  } catch (e) {
    document.cookie = 'sendsay_session=';
    document.cookie = 'sendsay_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    yield put(
      showAlert({
        showAlert: true,
        //@ts-ignore
        alertMessage: { id: e.id, explain: e.explain },
      })
    );
  }
}

export function* logoutSaga() {
  yield put(authenticateFailure());
  document.cookie = 'sendsay_session=';
  document.cookie = 'sendsay_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

export default function* root() {
  yield all([
    takeLatest(authenticate, authenticateSaga),
    takeLatest(authenticateCheck, authenticateCheckSaga),
    takeLatest(logout, logoutSaga),
  ]);
}
