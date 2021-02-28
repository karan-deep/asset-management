import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./components/login/login";
import Register from "./components/register/register";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Redirect to="/login" />
      </Switch>
    </main>
  );
}

export default App;
