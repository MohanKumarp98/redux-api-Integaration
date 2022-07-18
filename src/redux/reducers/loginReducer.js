import {
  GET_LOGIN_DETAILS,
  IS_LOADING,
  LOGIN_SUCESSFULL,
  LOGIN_UNSUCESSFULL,
} from "../constants/allConstants";

const initialState = {
  loginStatus: false,
  message: "",
  jwtToken: "",
  name: "",
  email: "",
  mobile: "",
  profileImage: "",
  adminType: "",
  adminPermissions: [],
  loginDetails: {},
};

export const loginReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_SUCESSFULL:
      localStorage.clear();
      localStorage.setItem("data", JSON.stringify(payload));
      return { ...state, message: "", loginStatus: true };
    case LOGIN_UNSUCESSFULL:
      return { ...state, message: "no such user found" };
    case IS_LOADING:
      return { ...state, isLoading: !state.isLoading };
    case GET_LOGIN_DETAILS:
      return { ...state, loginDetails: payload };
    default:
      return state;
  }
};
