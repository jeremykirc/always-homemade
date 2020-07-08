import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

describe('Header', () => {
  it('should render Header', () => {
    const wrapper = shallow(<Header />);
    wrapper.find('#nav-logo').simulate('click');
  }); 
});
