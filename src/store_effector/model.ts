import { createEffect, createEvent, createStore } from 'effector';
import api from '@helpers/sendsay';
import { withPersist } from './help';

interface MyFormValues {
  login: string;
  sublogin: string;
  password: string;
}

export type requestHistoryArrType = {
  id: number;
  title: string;
  body: string;
  isCopied: boolean;
  isSuccess: boolean;
};

type alertMessageType = {
  id: string;
  explain: string;
};

type initialStateType = {
  loading: boolean;
  sessionKey: string | null;
  login: string | null;
  sublogin: string | null;
  showAlert: boolean;
  alertMessage: alertMessageType | null;
  requestHistoryArr: Array<requestHistoryArrType>;
};

export const $appState = withPersist(
  createStore<initialStateType>(
    {
      loading: false,
      sessionKey: null,
      login: null,
      sublogin: null,
      showAlert: false,
      alertMessage: null,
      requestHistoryArr: [],
    },
    { name: 'appState' }
  )
);

export const closeAlert = createEvent('closeAlert');
export const logoutButtonClicked = createEvent('logout');
export const addRequestHistory = createEvent<requestHistoryArrType>({});
export const copyRequestHistory = createEvent<requestHistoryArrType>({});
export const removeRequestHistory = createEvent<requestHistoryArrType>({});
export const clearRequestHistory = createEvent('clearHistory');

export const loginButtonClicked = createEffect(async (payload: MyFormValues) => {
  const res = await api.sendsay
    .login({
      login: payload.login,
      sublogin: payload.sublogin,
      password: payload.password,
    })
    .then(() => {
      document.cookie = `sendsay_session=${api.sendsay.session}`;
      return {
        sessionKey: api.sendsay.session,
        login: payload.login,
        sublogin: payload.sublogin,
      };
    })
    .catch((err: any) => {
      document.cookie = 'sendsay_session=';
      document.cookie = 'sendsay_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      return err;
    });

  return res;
});

export const authenticateCheck = createEffect(async () => {
  const res = await api.sendsay
    .request({
      action: 'pong',
    })
    .then(() => {
      return true;
    })
    .catch((err: any) => {
      return err;
    });

  return res;
});

$appState.on(authenticateCheck.doneData, (state, payload) => {
  if (payload.id === 'error/auth/failed') {
    document.cookie = 'sendsay_session=';
    document.cookie = 'sendsay_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    return { ...state, loading: false, sessionKey: null, login: null, sublogin: null };
  }
});

$appState.on(loginButtonClicked.pending, (state, pending) => {
  if (pending) {
    return { ...state, loading: true };
  } else {
    return { ...state, loading: false };
  }
});

$appState.on(loginButtonClicked.doneData, (state, payload) => {
  if (payload.id !== 'error/auth/failed') {
    return { ...state, ...payload };
  } else {
    return { ...state, showAlert: true, alertMessage: { id: payload.id, explain: payload.explain } };
  }
});

$appState.on(closeAlert, state => {
  return { ...state, showAlert: false, alertMessage: null };
});

$appState.on(logoutButtonClicked, state => {
  document.cookie = 'sendsay_session=';
  document.cookie = 'sendsay_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  return { ...state, loading: false, sessionKey: null, login: null, sublogin: null };
});

$appState.on(addRequestHistory, (state, payload) => {
  if (state.requestHistoryArr.length !== 0) {
    return {
      ...state,
      requestHistoryArr: [payload, ...state.requestHistoryArr.filter(el => el.title !== payload.title && el.body !== payload.body)],
    };
  } else {
    return {
      ...state,
      requestHistoryArr: [payload, ...state.requestHistoryArr],
    };
  }
});

$appState.on(copyRequestHistory, (state, payload) => {
  return {
    ...state,
    requestHistoryArr: state.requestHistoryArr.map(el => (el.id == payload.id ? { ...el, isCopied: payload.isCopied } : el)),
  };
});

$appState.on(removeRequestHistory, (state, payload) => {
  return {
    ...state,
    requestHistoryArr: state.requestHistoryArr.filter(el => el.id !== payload.id),
  };
});

$appState.on(clearRequestHistory, state => {
  return {
    ...state,
    requestHistoryArr: [],
  };
});
