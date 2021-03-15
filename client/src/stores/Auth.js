import { AppState } from ".";
import axios from "axios";
// auth state
export const initState = {
  isAuthenticated: false,
  token: null,
};

// action types
export const actionTypes = {
  passwordLogin: "PASSWORD_LOGIN",
  logOut: "LOG_OUT",
};

// actions
export const actions = {
  login: (loginObj) => async (dispatch) => {
    return await axios
      .post(`http://localhost:5000/login`, loginObj)
      .then(async (res) => {
        const token = res.data;
        await dispatch({ type: actionTypes.passwordLogin, token });
        return { valid: true, error: "" };
      })
      .catch((err) => {
        err = err.response.data;
        console.log(err);
        return { valid: false, error: err?.error ? err.error : err };
      });
  },
  register: (registerObj) => async (dispatch) => {
    await axios
      .post(`http://localhost:5000/register`, registerObj)
      .then((res) => {
        //const token = res.data;
        //dispatch({ type: actionTypes.passwordLogin, token });
      })
      .catch((err) => console.log(err));
  },
  logOut: () => (dispatch) => {
    dispatch({ type: actionTypes.logOut });
  },
};

// reducer
export const reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.passwordLogin:
      AppState.auth = {
        ...state,
        isAuthenticated: true,
        token: action.token,
      };
      return AppState.auth;
    case actionTypes.logOut:
      AppState.auth = {
        ...state,
        isAuthenticated: false,
        token: null,
      };
      return AppState.auth;
    default:
      return state;
  }
};
