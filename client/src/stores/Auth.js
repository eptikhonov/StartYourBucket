import { AppState } from ".";
import axios from "axios";
// auth state
export const initState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// action types
export const actionTypes = {
  passwordLogin: "PASSWORD_LOGIN",
};

// actions
export const actions = {
  login: (loginObj) => async (dispatch) => {
    return await axios
      .post(`http://localhost:5000/login`, loginObj)
      .then(async (res) => {
        const token = res.data;
        await dispatch({ type: actionTypes.passwordLogin, token });
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
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
    default:
      return state;
  }
};
