
import './App.css';
import { useState } from 'react';
import LoginForm from './components/Login/LoginForm';

function App() {
  const emploeeLogin = {
    name:"Test",
    email: "Test@gmail.com",
    password:"Test@123"
  }

  const [user, setUser] = useState({email:"", name: ""});
  const [error, setError] = useState("");
  

  const Login = (loginDetails) => {
    if(emploeeLogin.email === loginDetails.email || emploeeLogin.password === loginDetails.password) {
      console.log("Successfully Login In");
      setUser({
        name: emploeeLogin.name,
        email: loginDetails.email
      })
    } else {
      console.log("Invalid Credintials");
      setError("Invalid Credintials");
    }
  }

  const Logout = () => {
    setUser({
      name: "",
      email: ""
    })
  }

  return (
    <div className="App">
      {(user.email !== "") ? (
        <div className= "welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
        </div>
      ) : (
        <LoginForm Login = {Login} error={error} />
      )}
    </div>
  );
}

export default App;
