import { COLLAPSE_MENU } from "../types";

const initialState = {
  menuCollapse: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COLLAPSE_MENU:
      return {
        ...state,
        menuCollapse: action.payload,
      };
    default:
      return state;
  }
}
