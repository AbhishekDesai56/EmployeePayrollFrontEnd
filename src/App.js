import './App.scss';
import LoginForm from './components/Login/LoginForm';
import UserRegistrationForm from './components/UserRegisteration/UserRegisterationForm';
import Dashboard from './components/Dashboard/dashboard';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route path='/UserRegisteration/' exact component={UserRegistrationForm}></Route>
            <Route path='/Dashboard/' exact component={Dashboard}></Route>
            <Route path='/'>
              <LoginForm />  
            </Route> 
          </Switch>
      </div>
    </Router>
  );
}

export default App;
