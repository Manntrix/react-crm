import {
  AUTH_LOGIN,
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_SIGNUP_ERROR,
  AUTH_SIGNUP,
} from "../types";

const initialState = {
  isLoggedIn: !!localStorage.getItem("token_key"),
  token: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return {
        ...state,
        isLoggedIn: !!localStorage.getItem("token_key"),
        token: action.payload.access_token,
      };
    case AUTH_SIGNUP:
      return {
        ...state,
        isLoggedIn: !!localStorage.getItem("token_key"),
        token: action.payload.token,
      };
    case AUTH_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        token: "",
      };
    case AUTH_SIGNUP_ERROR:
      return {
        ...state,
        isLoggedIn: false,
        token: "",
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: "",
      };

    default:
      return state;
  }
}
