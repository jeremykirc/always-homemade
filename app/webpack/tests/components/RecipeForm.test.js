import axios from 'axios';
import React from 'react';
import { shallow } from 'enzyme';
import flushPromises from 'flush-promises';
import RecipeForm from '../../components/RecipeForm';

jest.mock('axios');

describe('RecipeForm', () => {
  let wrapper;
  let history;

  beforeEach(() => {
    history = { push: jest.fn() };
    jest.spyOn(document, 'querySelector').mockReturnValue({ content: 'csrfToken' });
    wrapper = shallow(<RecipeForm history={history} />);
  });

  it('should submit RecipeForm and indicate error', async () => {
    axios.post.mockReturnValue(Promise.reject('error message'));
    wrapper.find('Form').simulate('submit', {
      preventDefault: () => {}
    });
    await flushPromises();

    // TODO Confirm error is indicated.
  }); 

  it('should submit RecipeForm and redirect to root path on success', async () => {
    axios.post.mockReturnValue(Promise.resolve());
    wrapper.find('Form').simulate('submit', {
      preventDefault: () => {}
    });
    await flushPromises();

    expect(history.push).toHaveBeenCalledWith('/');
  }); 
});
