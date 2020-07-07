import { createStore, combineReducers } from 'redux';

import filtersReducer from '../reducers/filters';
import preloaderReducer from '../reducers/preloader';
import recipesReducer from '../reducers/recipes';

export default () => {
  const store = createStore(
    combineReducers({
      filters: filtersReducer,
      preloader: preloaderReducer,
      recipes: recipesReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};
