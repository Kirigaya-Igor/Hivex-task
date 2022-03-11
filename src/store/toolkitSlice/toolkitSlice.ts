import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  loading: false,
  sessionKey: null,
  login: null,
  sublogin: null,
  showAlert: false,
  alertMessage: null,
};

const toolkitSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate: (state, action) => {
      state.loading = true;
    },
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
  },
});

const { actions, reducer } = toolkitSlice;

export default reducer;

export const { authenticate, authenticateSuccess, authenticateFailure, logout, showAlert } = actions;
