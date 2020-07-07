import recipesReducer from '../../reducers/recipes';

describe('recipesReducer', () => {
  let currentState = [];
  let recipes = ['foo', 'bar'];

  it('should set up default recipes value', () => {
    const state = recipesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(currentState);
  });

  it('should set recipes', () => {
    const action = { type: 'SET_RECIPES', recipes: recipes };
    const state = recipesReducer(currentState, action);
    expect(state).toEqual(recipes);
  });
});
