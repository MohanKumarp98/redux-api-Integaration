import {
  LOGIN_SUCESSFULL,
  LOGIN_UNSUCESSFULL,
} from "../../../redux/constants/allConstants";
import loginInstance from "../axiosInstaces/loginInstances";

export const success = (data) =>async (dispatch) => {
  try{
    const response = await loginInstance.post("/login", data);
    if(response?.data?.token_session) return dispatch({type: LOGIN_SUCESSFULL,payload: response});
    else return dispatch({type: LOGIN_UNSUCESSFULL,payload: response});
  }catch(err){
    console.log(err);
  }
};
