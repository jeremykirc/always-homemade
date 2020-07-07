import { setRecipes } from '../../actions/recipes';
import recipes from '../fixtures/recipes';

describe('setRecipes', () => {
  it('should generate set recipes action object with default', () => {
    const action = setRecipes();
    expect(action).toEqual({
      type: 'SET_RECIPES',
      recipes: []
    });
  });

  it('should generate set recipes action object', () => {
    const action = setRecipes(recipes);
    expect(action).toEqual({
      type: 'SET_RECIPES',
      recipes: recipes
    });
  });
});
