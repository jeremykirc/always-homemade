import React from 'react';
import { Provider } from 'react-redux';

import AppRouter from '../routers/AppRouter';
import configureStore from '../store/configureStore';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

export default App;
