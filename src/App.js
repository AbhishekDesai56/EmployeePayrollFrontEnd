import "./App.scss";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import CssBaseline from "@material-ui/core/CssBaseline";
import ReactDOM from "react-dom";
import Dashboard from "./pages/dashboard/dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register/" exact component={Register}></Route>
          <Route path="/dashboard/" exact component={Dashboard}></Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
        <CssBaseline />
        <Dashboard />
      </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;
