import React from 'react'
import { useState } from 'react/cjs/react.development'
 import UserRegistrationForm from "../UserRegisteration/UserRegisterationForm";
import { BrowserRouter, Link, Route  } from 'react-router-dom';

function LoginForm({Login, error }) {
  const [details, setDetails] = useState({email: "", password: ""});
  
  const submitHandler = e => {
    e.preventDefault();

    Login(details);
  }

  return (
    <form onSubmit = {submitHandler}>
        <div className="form-inner">
          <h2>Employee Login</h2>
          {(error !== "") ? (<div className="error">{error}</div>) : ""}
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" onChange = {e => setDetails({...details, email: e.target.value})} value={details.email} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" onChange = {e => setDetails({...details, password: e.target.value})} value={details.password}/>
            </div>
            <input type="submit" value="Login"></input>
            <BrowserRouter>
              <Link to = "../UserRegisteration/UserRegisterationForm">SignUp</Link>
              <Route
                    path="/UserRegisteration/UserRegisterationForm"
                    component={UserRegistrationForm}
                    exact 
                />
            </BrowserRouter>
        </div>
    </form>
  )
}

export default LoginForm
