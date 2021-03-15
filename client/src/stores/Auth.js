import { AppState } from ".";
import axios from "axios";
// auth state
export const initState = {
  isAuthenticated: false,
  token: null,
  isNewlyRegistered: false,
};

// action types
export const actionTypes = {
  passwordLogin: "PASSWORD_LOGIN",
  createAccount: "CREATE_ACCOUNT",
  logOut: "LOG_OUT",
};

// actions
export const actions = {
  login: (loginObj) => async (dispatch) => {
    await dispatch({ type: actionTypes.createAccount, isNewlyRegistered: false });
    return await axios
      .post(`http://localhost:5000/login`, loginObj)
      .then(async (res) => {
        const token = res.data;
        await dispatch({ type: actionTypes.passwordLogin, token });
        return { valid: true, error: "" };
      })
      .catch(async (err) => {
        err = err.response.data;
        console.log(err);
        await dispatch({ type: actionTypes.passwordLogin, token: null });
        return { valid: false, error: err?.error ? err.error : err };
      });
  },
  createAccount: (registerObj) => async (dispatch) => {
    return await axios
      .post(`http://localhost:5000/register`, registerObj)
      .then(async (res) => {
        const { password, ...registeredAcc } = registerObj;
        await dispatch({ type: actionTypes.createAccount, isNewlyRegistered: registeredAcc });
        return { valid: true, error: "" };
      })
      .catch(async (err) => {
        err = err.response.data;
        console.log(err);
        await dispatch({ type: actionTypes.createAccount, isNewlyRegistered: false });
        return { valid: false, error: err?.error ? err.error : err };
      });
  },
  updateRegisteredFlag: (isNewlyRegistered) => async (dispatch) => {
    await dispatch({ type: actionTypes.createAccount, isNewlyRegistered });
  },
  logOut: () => async (dispatch) => {
    await dispatch({ type: actionTypes.logOut });
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
    case actionTypes.createAccount:
      AppState.auth = {
        ...state,
        isNewlyRegistered: action.isNewlyRegistered,
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
