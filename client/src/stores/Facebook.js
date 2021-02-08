import { AppState } from '../stores'
// facebook state
export const initState = {
  isAuthenticated: false,
  feed: null,
}

// action types
export const actionTypes = {
  facebookLogin: 'FACEBOOK_LOGIN',
}

// actions
export const actions = {
  login: () => (dispatch) => {
    dispatch({ type: actionTypes.facebookLogin })
  },
}

// reducer
export const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.facebookLogin:
      AppState.facebook = {
        ...state,
        isAuthenticated: true,
        feed: [
          { text: 'Go 2021, woohoo!', from: 'eric.tikhonov' },
          { text: 'Bring out the champagne! 🍾', from: 'will.harrill' },
        ],
      }
      return AppState.facebook
    default:
      return state
  }
}
