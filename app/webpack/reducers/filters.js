const defaultState = {
  text: '',
  group: ''
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text 
      };
    case 'SET_GROUP_FILTER':
      return {
        ...state,
        group: action.group
      };
    default:
      return state;
  }
}
