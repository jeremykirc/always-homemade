import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';

import { FormContext } from '../context/form-context';
import AppRouter from '../routers/AppRouter';
import configureStore from '../store/configureStore';

const store = configureStore();

const App = ({ authenticityToken }) => (
  <Provider store={store}>
    <FormContext.Provider value={authenticityToken}>
      <AppRouter />
    </FormContext.Provider>
  </Provider>
);

App.propTypes = {
  authenticityToken: PropTypes.string.isRequired,
};

export default App;
