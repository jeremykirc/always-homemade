import React from 'react';
import { Provider } from 'react-redux';

import { FormContext } from '../context/form-context';
import AppRouter from '../routers/AppRouter';
import configureStore from '../store/configureStore';

const store = configureStore();

const App = ({ authenticity_token }) => (
  <Provider store={store}>
    <FormContext.Provider value={authenticity_token}>
      <AppRouter />
    </FormContext.Provider>
  </Provider>
);

export default App;
