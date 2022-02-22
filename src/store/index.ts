import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../store/reducers/index';
import rootSaga from '../store/sagas/index';

const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: 'root',
  storage,
};
//@ts-ignore
const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

function configureStore(initialState = {}) {
  const store = createStore(
    combineReducers({
      auth: persistReducer(persistConfig, rootReducer.auth),
    }),
    initialState,
    bindMiddleware([sagaMiddleware])
  );
  //@ts-ignore
  const persistor = persistStore(store);

  //@ts-ignore
  store.runSagaTask = () => {
    //@ts-ignore
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  //@ts-ignore
  store.runSagaTask();
  return {
    store,
    persistor,
  };
}

export default configureStore;
