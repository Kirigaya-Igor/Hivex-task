import { configureStore } from '@reduxjs/toolkit';
import rootSaga from '@store/sagas';
import rootReducer from '@toolkitSlice/toolkitSlice';
import { combineReducers } from 'redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
};

const mainReducer = combineReducers({
  auth: rootReducer,
});

const persistedReducer = persistReducer(persistConfig, mainReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
});

//@ts-ignore
store.runSagaTask = () => {
  //@ts-ignore
  store.sagaTask = sagaMiddleware.run(rootSaga);
};

//@ts-ignore
store.runSagaTask();

//@ts-ignore
export const persistor = persistStore(store);

export type RootStateType = ReturnType<typeof store.getState>;
