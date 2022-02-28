import { createSlice } from '@reduxjs/toolkit';

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

export const initialState: initialStateType = {
  loading: false,
  sessionKey: null,
  login: null,
  sublogin: null,
  showAlert: false,
  alertMessage: null,
  requestHistoryArr: [],
};

const toolkitSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.loading = true;
    },
    authenticateCheck: state => state,
    authenticateSuccess: (state, action) => {
      state.loading = false;
      state.sessionKey = action.payload.sessionKey;
      state.login = action.payload.login;
      state.sublogin = action.payload.sublogin;
    },
    authenticateFailure: state => {
      state.sessionKey = null;
      state.login = null;
      state.sublogin = null;
    },
    logout: state => {
      state.loading = false;
      state.sessionKey = null;
    },
    showAlert: (state, action) => {
      state.loading = false;
      state.showAlert = action.payload.showAlert;
      state.alertMessage = action.payload.alertMessage;
    },
    addRequestHistory: (state, action) => {
      if (state.requestHistoryArr.length !== 0) {
        state.requestHistoryArr = [
          action.payload,
          ...state.requestHistoryArr.filter(el => el.title !== action.payload.title && el.body !== action.payload.body),
        ];
      } else {
        state.requestHistoryArr = [action.payload, ...state.requestHistoryArr];
      }
    },
    removeRequestHistory: (state, action) => {
      state.requestHistoryArr = state.requestHistoryArr.filter(el => el.id !== action.payload.id);
    },
    clearRequestHistory: state => {
      state.requestHistoryArr = [];
    },
    copyRequestHistory: (state, action) => {
      state.requestHistoryArr = state.requestHistoryArr.map(el =>
        el.id == action.payload.id ? { ...el, isCopied: action.payload.isCopied } : el
      );
    },
  },
});

const { actions, reducer } = toolkitSlice;

export default reducer;

export const {
  authenticate,
  authenticateSuccess,
  authenticateFailure,
  logout,
  showAlert,
  authenticateCheck,
  addRequestHistory,
  removeRequestHistory,
  clearRequestHistory,
  copyRequestHistory,
} = actions;
