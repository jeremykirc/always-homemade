import filtersReducer from '../../reducers/filters';

describe('filtersReducer', () => {
  let currentState = {
    text: '',
    group: ''
  };

  it('should set up default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(currentState);
  });

  it('should set text filter', () => {
    const action = { type: 'SET_TEXT_FILTER', text: 'foo' };
    const state = filtersReducer(currentState, action);
    expect(state.text).toEqual('foo');
  });

  it('should set group filter', () => {
    const action = { type: 'SET_GROUP_FILTER', group: 'OWN' };
    const state = filtersReducer(currentState, action);
    expect(state.group).toEqual('OWN');
  });
});
