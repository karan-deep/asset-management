import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import AssetManager from "./components/assets-manager/assets-manager";
import Login from "./components/login/login";
import Register from "./components/register/register";
import { ProtectedRoute } from "./routes/protected-route";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <ProtectedRoute exact path="/assets" component={AssetManager} />
        <Redirect to="/login" />
      </Switch>
    </main>
  );
}

export default App;
