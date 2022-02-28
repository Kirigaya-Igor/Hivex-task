import { ConsolePage } from '@components/ConsolePage/ConsolePage';
import LoginPage from '@components/LoginPage/LoginPage';
import { persistor, store } from '@store/index';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Switch>
            <Route exact path='/'>
              <LoginPage />
            </Route>

            <Route exact path='/console'>
              <ConsolePage />
            </Route>
          </Switch>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
