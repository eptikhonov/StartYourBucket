/* used as global point for actions and state of stores (redux) */
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // allow async actions
import { composeWithDevTools } from "redux-devtools-extension";
import * as Auth from "../stores/Auth.js";
// export states
export var AppState = {
  auth: Auth.initState,
};
// export actions
export var AppActions = {
  authActions: Auth.actions,
};
// export reducers (use in configureStore)
export var AppReducers = {
  auth: Auth.reducer,
};

// export action types
export var AppActionTypes = {
  authActionTypes: Auth.actionTypes,
};

// configure store
const configureStore = () => createStore(combineReducers({ ...AppReducers }), composeWithDevTools(applyMiddleware(thunk)));

const store = configureStore();
export var ReduxStore = store;
