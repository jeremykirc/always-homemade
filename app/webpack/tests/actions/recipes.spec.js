import { setRecipes } from '../../actions/recipes';

describe('setRecipes', () => {
  it('should generate set recipes action object', () => {
    const action = setRecipes(['foo', 'bar']);
    expect(action).toEqual({
      type: 'SET_RECIPES',
      recipes: ['foo', 'bar']
    });
  });

  it('should generate set recipes action object with default', () => {
    const action = setRecipes();
    expect(action).toEqual({
      type: 'SET_RECIPES',
      recipes: []
    });
  });
});
