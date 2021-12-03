import { GET_USER_INFO, USER_INFO_ERROR } from "../types";

const initialState = {
  userInfo: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case USER_INFO_ERROR:
      return {
        ...state,
      };

    default:
      return state;
  }
}
