import { setTextFilter, setGroupFilter } from '../../actions/filters';

describe('setTextFilter', () => {
  it('should generate set text filter action object', () => {
    const action = setTextFilter('foo');
    expect(action).toEqual({
      type: 'SET_TEXT_FILTER',
      text: 'foo'
    });
  });

  it('should generate set text filter action object with default', () => {
    const action = setTextFilter();
    expect(action).toEqual({
      type: 'SET_TEXT_FILTER',
      text: ''
    });
  });
});

describe('setGroupFilter', () => {
  it('should generate set group filter action object', () => {
    const action = setGroupFilter('foo');
    expect(action).toEqual({
      type: 'SET_GROUP_FILTER',
      group: 'foo'
    });
  });

  it('should generate set group filter action object with default', () => {
    const action = setGroupFilter('');
    expect(action).toEqual({
      type: 'SET_GROUP_FILTER',
      group: ''
    });
  });
});
