import { GET_LOGIN_DETAILS, LOGIN_SUCESSFULL } from "../constants/allConstants";

export const sucess= (products) => {
  return {
    type: LOGIN_SUCESSFULL,
    payload: products,
  };
};

export const getLoginData= (data) => {
  const key =localStorage.getItem(data)
  const json=JSON.parse(key)
  return {
    type: GET_LOGIN_DETAILS,
    payload: json,
  };
};

