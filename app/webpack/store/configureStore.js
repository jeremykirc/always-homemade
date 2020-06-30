import { createStore, combineReducers } from 'redux';

import filtersReducer from '../reducers/filters';
import recipesReducer from '../reducers/recipes';

export default () => {
  const store = createStore(
    combineReducers({
      filters: filtersReducer,
      recipes: recipesReducer
    })
  );

  return store;
};
