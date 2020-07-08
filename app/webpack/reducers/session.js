const defaultState = {
  loggedIn: false,
  user: {}
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_SESSION':
      return {
        ...state,
        loggedIn: action.session.logged_in,
        user: action.session.user
      };
    default:
      return state;
  }
}
