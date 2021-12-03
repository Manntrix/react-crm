import { GET_USER_INFO, USER_INFO_ERROR } from "../types";

import axios from "axios";
export const handleUserInfo = (e) => async (dispatch) => {
  try {
    var token = localStorage.getItem("token_key");
    var config = {
      method: "get",
      url: "https://crm-api.esimpanel.com/api/customer/me",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios(config);
    localStorage.setItem("userinfo", res.data);
    dispatch({
      type: GET_USER_INFO,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_INFO_ERROR,
      payload: error,
    });
  }
};
