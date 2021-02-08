/* used as global point for actions and state of stores (redux) */
import * as Facebook from '../stores/Facebook.js'
// export states
export var AppState = {
  facebook: Facebook.initState,
}
// export actions
export var AppActions = {
  facebookActions: Facebook.actions,
}
// export reducers (use in configureStore)
export var AppReducers = {
  facebook: Facebook.reducer,
}

// export action types
export var AppActionTypes = {
  facebookActionTypes: Facebook.actionTypes,
}
