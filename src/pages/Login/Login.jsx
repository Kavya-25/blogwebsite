import { useState,useContext } from "react";
import "./Login.scss";
import { API } from "../../services/api";
import { DataContext } from "../../context/DataProvider";
import {useNavigate} from 'react-router-dom';

const logininitialValues = {
  username: "",
  password: "",
};

const signupinitialValues = {
  name: "",
  username: "",
  password: "",
};

export const Login = ({isUserAuthenticated}) => {
  const [accountstatus, setAccountstatus] = useState("login");
  const [signup, setSignUp] = useState(signupinitialValues);
  const [login, setLogin] = useState(logininitialValues);
  const [error, setError] = useState("");

  const {setAccount}=useContext(DataContext)

  const navigate=useNavigate();

  // signup & login page handler
  const toggleAccount = () => {
    {
      accountstatus == "signup" ? setAccountstatus("login") : setAccountstatus("signup");
    }
  };

  // login onchange handler

  const handleLoginChange = (e) => {
    setLogin({...login,[e.target.name]:e.target.value})
  };

// onclick loginuser handler
const loginuser=async(e)=>{
  e.preventDefault();
  let response=await API.userLogin(login);
  if(response.isSuccess){
    sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
    sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);
    setAccount({username:response.data.username,name:response.data.name})
    navigate('/')
    isUserAuthenticated(true)
  }
  else{
    setError('Something went wrong! try later')
  }
}
  // Sign UP onchangehandler
  const handleChange = (e) => {
    setSignUp({ ...signup, [e.target.name]: e.target.value });
  };

  //onclick signup handler
  const signupuser = async (e) => {
    e.preventDefault();
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setSignUp(signupinitialValues);
      setAccountstatus("login");
    } else {
      setError("Something went wrong!.Please try again later");
    }
  };

  return (
    <div className="login">
      {accountstatus === "login" ? (
        <div className="container">
          <img src="/images/blogalback.png" alt="" />
          <form action="">
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              value={login.username}
              onChange={handleLoginChange}
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={login.password}
              onChange={handleLoginChange}
            />
            {error && <div className="error">{error}</div>}
            <button type="submit" className="form-btn" onClick={loginuser}>
              Login
            </button>
            <p>OR</p>
            <button onClick={toggleAccount}>Create an account</button>
          </form>
        </div>
      ) : (
        <div className="container">
          <img src="/images/blogalback.png" alt="" />
          <form action="">
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={signup.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              value={signup.username}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              value={signup.password}
              onChange={handleChange}
            />
            {error && <div className="error">{error}</div>}
            <button type="submit" className="form-btn" onClick={signupuser}>
              Sign Up
            </button>
            <p>OR</p>
            <button onClick={toggleAccount}>Already have an account</button>
          </form>
        </div>
      )}
    </div>
  );
};
