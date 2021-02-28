import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import AssetManager from "./components/assets-manager/assets-manager";
import Login from "./components/login/login";
import Register from "./components/register/register";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/assets" component={AssetManager} exact />
        <Redirect to="/login" />
      </Switch>
    </main>
  );
}

export default App;
