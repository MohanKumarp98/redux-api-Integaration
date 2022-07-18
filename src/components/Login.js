import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import Logo from "../assets/logo/taught.png";
import { eye, noteye, chevRight } from "../assets/icons/IconList";
import "../App.scss";
import { useDispatch, useSelector } from "react-redux";
import { success } from "../services/apiCalls/loginApi/loginActionCall";
// import { login } from '../../../../stores/Auth/AuthAction';

const Login = (props) => {
  const [data, setData] = useState({email:"",password:""});
  const [error, setError] = useState({email:"",password:""});
  const [showpass, setShowpass] = useState(false);
  const [dataErr, setDataErr] = useState("");
  const [isLoginLoading, setisLoginLoading] = useState(false);
  const navigate = useNavigate();

  const {message,loginStatus} = useSelector((state) => state?.login);
  const dispatch = useDispatch();
 
  useEffect(() => {
   (message !== "")?setDataErr("No Such User Found"):setDataErr("")
  }, [message]);

  useEffect(() => {
      loginValid(data)
  }, [error]);

  useEffect(()=>{
    if(loginStatus===true){
      navigate("/dashboard")
    }
  },[loginStatus])


  const handleChange = (e) => {
    const {name,value}=e.target;
    setData({...data,[name]:value});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(validation())
  };
  
  const loginValid = ({email,password}) => {
    let values= Object.values(error)
    let x=values.filter((val) => val !== "");
    console.log(x.length === 0 && email!=="" && password!=="");
    if (x.length === 0 && email!=="" && password!=="") {
      dispatch(success(data));
    }
  };

  const validation = () => {
    const errors = {
      email: "",
      password: "",
    };
    let mailrx =/(?=.*[a-z])(?=.*[0-9])(?=.{8,})/;
    if (data.password === "") {
      errors.password = "Password Cannot be Empty";
    } else if (mailrx.test(data.password))
      errors.password = "";
    else {
      errors.password = "Password Should Start with Alpahabet & contain one Number ";
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)) {
      errors.email = "Please Enter A Valid Email Adress";
    } else if (data.email === "") errors.email = "Email Cannot Be Empty";
    else errors.email = "";
    return errors;
  };

  return (
    <div className="login-page">
      <div className="login-main">
        <div className="login-head text-center">
          <img src={Logo} alt="logo" />
          <h3>Login</h3>
        <h4 style={{color:"red"}}>{dataErr}</h4>

        </div>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="email">
            Email or username*
            <input
              type="text"
              name="email"
              onChange={handleChange}
              value={data.email}
              className={`${error.email!=="" ? "error" : ""}`}
            />
          </label>
          {error.email ? (
            <p className="error-msg">
              <span>
                <b>!</b>
              </span>
              {error.email}
            </p>
          ) : (
            ""
          )}
          <label htmlFor="email" className="password-label">
            Password*
            <input
              type={`${showpass ? "text" : "password"}`}
              name="password"
              onChange={handleChange}
              value={data.password}
              className={`${error.password!=="" && "error"}`}
            />
            <button type="button" onClick={() => setShowpass(!showpass)}>
              {showpass ? noteye : eye}
            </button>
          </label>
          {error.password && (
            <p className="error-msg">
              <span>
                <b>!</b>
              </span>
              {error.password}
            </p>
          )}
          <div className="row remember-forgot">
            <div className="col-sm-6 col-xs-12">
              <label htmlFor="remember">
                Remember me
                <input type="checkbox" id="remember" />
                <span className="checkmark" />
              </label>
            </div>
            <div className="col-sm-6 col-xs-12 text-right">
              <span className="green">
                <Link to="/forgotPassword" className="green">
                  Forgot password?
                </Link>
              </span>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" value="Login" className="submit-btn">
              {" "}
              {isLoginLoading ? (
                <Spinner animation="border" variant="light" />
              ) : (
                "Login"
              )}{" "}
              <span>{chevRight}</span>
            </button>
            <p className="not-register">
              Not registered yet?
              <Link to="/register" className="green">
                {" "}
                Create an account
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
