import selectRecipes from '../../selectors/recipes';
import recipes from '../fixtures/recipes';

describe('selectRecipes', () => {
  it('should filter by text', () => {
    const filters = {
      text: 'FoO',
      group: ''
    };
    const result = selectRecipes(recipes, filters);
    expect(result).toEqual([recipes[0], recipes[2]])
  });

  it('should filter by OWN group', () => {
    const filters = {
      text: '',
      group: 'OWN'
    };
    const result = selectRecipes(recipes, filters);
    expect(result).toEqual([])
  });

  it('should filter by FAVORITES group', () => {
    const filters = {
      text: '',
      group: 'FAVORITES'
    };
    const result = selectRecipes(recipes, filters);
    expect(result).toEqual([])
  });

  it('should filter by text and group', () => {
    const filters = {
      text: 'foo',
      group: 'FAVORITES'
    };
    const result = selectRecipes(recipes, filters);
    expect(result).toEqual([])
  });
});

