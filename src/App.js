import "./App.scss";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Dashboard from "./pages/dashboard/dashboard";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "../src/components/protected.route";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register/" exact component={Register}></Route>
          <ProtectedRoute
            path="/dashboard/"
            exact
            component={Dashboard}
          ></ProtectedRoute>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default App;
