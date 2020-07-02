const defaultState = {
  visible: true
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        visible: true 
      };
    case 'LOADED':
      return {
        ...state,
        visible: false 
      };
    default:
      return state;
  }
}
