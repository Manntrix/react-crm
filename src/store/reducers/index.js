import { combineReducers } from "redux";
import menuReducer from "./menuReducer";
import authReducer from "./authReducer";
import userInfoReducer from "./userInfoReducer";

export default combineReducers({
  menu: menuReducer,
  auth: authReducer,
  userInfo: userInfoReducer,
});
