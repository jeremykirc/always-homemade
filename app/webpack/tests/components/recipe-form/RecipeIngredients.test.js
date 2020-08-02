import React from 'react';
import { shallow } from 'enzyme';
import RecipeIngredients from '../../../components/recipe-form/RecipeIngredients';

const ingredients = [{
  name: 'broccoli',
  quantity: 1,
  unit: 'head',
},
{
  name: 'butter',
  quantity: 1.5,
  unit: 'tbsp',
}];

describe('RecipeIngredients', () => {
  it('should render inputs for each ingredient', () => {
    const wrapper = shallow(<RecipeIngredients
      addNewIngredient={() => {}}
      ingredients={ingredients}
      removeIngredient={() => {}}
      updateIngredient={() => {}}
    />);

    ['name', 'quantity', 'unit'].forEach((field) => {
      const inputs = wrapper.find(`.ingredient-${field}-input`);
      expect(inputs).toHaveLength(ingredients.length);
      expect(inputs.at(0).props()).toHaveProperty('defaultValue', ingredients[0][field]);
      expect(inputs.at(1).props()).toHaveProperty('defaultValue', ingredients[1][field]);
    });
  });

  it('should call the updateIngredient when the quantity changes', () => {
    const updateIngredient = jest.fn();
    const wrapper = shallow(<RecipeIngredients
      addNewIngredient={() => {}}
      ingredients={ingredients}
      removeIngredient={() => {}}
      updateIngredient={updateIngredient}
    />);

    wrapper.find('.ingredient-quantity-input').at(1).simulate('change', {
      target: { value: '2.5' }
    });
    
    expect(updateIngredient).toHaveBeenCalledWith(1, {
      name: 'butter',
      quantity: 2.5,
      unit: 'tbsp',
    });
  });

  it('should call the updateIngredient when the unit changes', () => {
    const updateIngredient = jest.fn();
    const wrapper = shallow(<RecipeIngredients
      addNewIngredient={() => {}}
      ingredients={ingredients}
      removeIngredient={() => {}}
      updateIngredient={updateIngredient}
    />);

    wrapper.find('.ingredient-unit-input').at(1).simulate('change', {
      target: { value: 'tsp' }
    });
    
    expect(updateIngredient).toHaveBeenCalledWith(1, {
      name: 'butter',
      quantity: 1.5,
      unit: 'tsp',
    });
  });
  it('should call the updateIngredient when the unit changes', () => {
    const updateIngredient = jest.fn();
    const wrapper = shallow(<RecipeIngredients
      addNewIngredient={() => {}}
      ingredients={ingredients}
      removeIngredient={() => {}}
      updateIngredient={updateIngredient}
    />);

    wrapper.find('.ingredient-name-input').at(1).simulate('change', {
      target: { value: 'olive oil' }
    });
    
    expect(updateIngredient).toHaveBeenCalledWith(1, {
      name: 'olive oil',
      quantity: 1.5,
      unit: 'tbsp',
    });
  });

  it('should call addNewIngredient when the add button is clicked', () => {
    const addNewIngredient = jest.fn();
    const wrapper = shallow(<RecipeIngredients
      addNewIngredient={addNewIngredient}
      ingredients={[]}
      removeIngredient={() => {}}
      updateIngredient={() => {}}
    />);

    wrapper.find('.add-btn').simulate('click');

    expect(addNewIngredient).toHaveBeenCalled();
  });
});