import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json=await response.json();
    // console.log(json)
    if(json.success){
      //Save the authtoken in local storage and redirect
      localStorage.setItem('iNotebook-token',json.authtoken);
      props.showAlert("Logged In successfully","success");
      navigate("/");
    }
    else{
      props.showAlert("Invalid Credentials","danger");
      setCredentials({email:"",password:""})
    }
  };
  const onChange = (e) => {
    
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    
  };
  return (
    <div>
      <form onSubmit={handleSubmit} style={{marginTop:"70px"}}>
        <h2>Login to continue to iNotebook</h2>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={onChange}
          />
          <div id="emailHelp" value={credentials.email} className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={credentials.password}
            onChange={onChange}
            className="form-control"
            id="password"
            name="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
