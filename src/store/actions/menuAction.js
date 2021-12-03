import { COLLAPSE_MENU } from "../types";

export const handleMenu = (e) => async (dispatch) => {
  dispatch({
    type: COLLAPSE_MENU,
    payload: e,
  });
};
