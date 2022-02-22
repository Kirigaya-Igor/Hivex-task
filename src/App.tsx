import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import createStore from './store';
import LoginPage from '../src/components/LoginPage/LoginPage';
import { ConsolePage } from './components/ConsolePage/ConsolePage';

const { store, persistor } = createStore();

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
