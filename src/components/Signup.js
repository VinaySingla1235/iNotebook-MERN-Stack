import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
const Signup = () => {
  const [credentials, setCredentials] = useState({
    name:"",
    email: "",
    password: "",
    cpassword:""
  });
  let navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(credentials.password!==credentials.cpassword){
      alert("Both passwords do not match");
      setCredentials({
        password:"",
        cpassword:""
      })
      return;
    }
    const response = await fetch("http://localhost:5000/api/auth/createUser", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json=await response.json();
    // console.log(json)
    if(json.success){
      //Save the authtoken in local storage and redirect
      localStorage.setItem('iNotebook-token',json.authtoken);
      navigate("/");
    }
    else{
      alert("Invalid Credentials");
      setCredentials({name:"",email:"",password:"",cpassword:""})
    }
  };
  const onChange = (e) => {
    
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            value={credentials.name}
            onChange={onChange}
            className="form-control"
            id="name"
            name="name"
            minLength={3}
          />
        </div>
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
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            value={credentials.cpassword}
            onChange={onChange}
            className="form-control"
            id="cpassword"
            name="cpassword"
            minLength={5}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
