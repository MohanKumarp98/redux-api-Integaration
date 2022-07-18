import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginData } from "../redux/actions/loginAction";

function Dashboard() {
  const [Details, setDetails] = useState({});
  const loginDetail = useSelector(
    (state) => state.login.loginDetails?.data?.admin_details[0]
  );
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getLoginData("data"));
  }, []);

  useEffect(() => {
console.log("23456");
    setDetails(loginDetail)
  }, [loginDetail]);  
  
  return (
    <div className=" w-50 m-auto p-5 shadow-lg">
      <div className="m-auto">
      <img className="profile-img m-auto" src={loginDetail?.profile_image} alt="profile" />
      </div>
      <div className="m-auto">
      <h4 className="mt-5">name: {Details.name}</h4>
      <h4 className="mt-3">Role: {Details.admin_type}</h4>
      <h4 className="mt-3">City: {Details.city}</h4>
      <h4 className="mt-3">country: {Details.country}</h4>
      <h4 className="mt-3">Email: {Details.email}</h4>
      <h4 className="mt-3">Mobile Number: {Details.mobile_number}</h4>
      </div>
    </div>
  );
}

export default Dashboard;
