import React from 'react';
import { shallow } from 'enzyme';
import RecipeInstructions from '../../../components/recipe-form/RecipeInstructions';

describe('RecipeInstructions', () => {
  it('should render a textarea for each instruction', () => {
    const instructions = ['foo', 'bar'];
    const wrapper = shallow(<RecipeInstructions
      addNewInstruction={() => {}}
      instructions={instructions}
      updateInstruction={() => {}}
    />);

    const textareas = wrapper.find('.instruction-input');
    expect(textareas).toHaveLength(instructions.length);
    expect(textareas.at(0).props()).toHaveProperty('defaultValue', instructions[0]);
    expect(textareas.at(1).props()).toHaveProperty('defaultValue', instructions[1]);
  });

  it('should call the updateInstruction when an instruction changes', () => {
    const updateInstruction = jest.fn();
    const wrapper = shallow(<RecipeInstructions
      addNewInstruction={() => {}}
      instructions={['foo', '']}
      updateInstruction={updateInstruction}
    />);

    const textareas = wrapper.find('.instruction-input');
    textareas.at(1).simulate('change', {
      target: { value: 'bar' }
    });
    
    expect(updateInstruction).toHaveBeenCalledWith(1, 'bar');
  });

  it('should call addNewInstruction when the add button is clicked', () => {
    const addNewInstruction = jest.fn();
    const wrapper = shallow(<RecipeInstructions
      addNewInstruction={addNewInstruction}
      instructions={[]}
      updateInstruction={() => {}}
    />);

    wrapper.find('.add-btn').simulate('click');

    expect(addNewInstruction).toHaveBeenCalled();
  });
});