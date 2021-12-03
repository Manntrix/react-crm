import {
  AUTH_LOGIN,
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_SIGNUP,
  AUTH_SIGNUP_ERROR,
} from "../types";
import axios from "axios";
import FormData from "form-data";
export const handleLogin = (e) => async (dispatch) => {
  try {
    var data = new FormData();
    data.append("email", e.email);
    data.append("password", e.password);
    data.append("captcha_token", e.captchatoken);

    var config = {
      method: "post",
      url: "https://crm-api.esimpanel.com/api/customer/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios(config);
    const { access_token } = res.data;
    localStorage.setItem("token_key", access_token);
    dispatch({
      type: AUTH_LOGIN,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    });
  }
};
export const handleLogout = (e) => async (dispatch) => {
  localStorage.clear();
  location.reload();
  dispatch({
    type: AUTH_LOGOUT,
    payload: "",
  });
};

export const handleSignup = (e) => async (dispatch) => {
  try {
    var data = new FormData();
    data.append("email", e.email);
    data.append("password", e.password);
    data.append("password_confirmation", e.confirmPassword);
    data.append("first_name", e.firstName);
    data.append("last_name", e.lastName);
    data.append("mobile", e.mobileNumber);
    data.append("captcha_token", e.captchatoken);

    var config = {
      method: "post",
      url: "https://crm-api.esimpanel.com/api/customer/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const res = await axios(config);
    console.log(res);
    const { token } = res.data;
    localStorage.setItem("token_key", token);
    dispatch({
      type: AUTH_SIGNUP,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_SIGNUP_ERROR,
      payload: error,
    });
  }
};
