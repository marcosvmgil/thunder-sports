import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import Nba from "./Nba";
import SelectFavorites from "./SelectFavorites";
import F1 from "./F1";
import Match from "./Match";
import Team from "./Team";
import NbaDateSearch from "./NbaDateSearch";
import F1DateSearch from "./F1DateSearch"
import NbaSeason from "./NbaSeason";
import F1Season from "./F1Season";
import Home from "./Home";

function App() {
  return (
    <Container className="bg-dark text-black" style={{ minHeight: "100vh" }}>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute path="/nba" component={Nba} />
            <PrivateRoute path="/f1" component={F1} />
            <PrivateRoute
              path="/select-favorites"
              component={SelectFavorites}
            />
            <PrivateRoute path="/match/:game/:id" component={Match} />
            <PrivateRoute path="/team/:game/:id" component={Team} />
            <PrivateRoute path="/nbaDateSearch" component={NbaDateSearch} />
            <PrivateRoute path="/f1DateSearch" component={F1DateSearch} />
            <PrivateRoute path="/nbaSeason" component={NbaSeason} />
            <PrivateRoute path="/f1Season" component={F1Season} />
            <PrivateRoute path="/profile" component={Dashboard} />
          </Switch>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;
