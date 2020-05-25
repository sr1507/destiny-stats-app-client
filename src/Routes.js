import React from "react";
import {Route, Switch} from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NotFound from "./containers/NotFound";
//import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes() {
  return (<Switch>
    <Route exact="exact" path="/">
      <Home/>
    </Route>
    <UnauthenticatedRoute exact="exact" path="/login">
      <Login/>
    </UnauthenticatedRoute>
    <UnauthenticatedRoute exact="exact" path="/signup">
      <Signup/>
    </UnauthenticatedRoute>
    {/* Finally, catch all unmatched routes */}
    <Route>
      <NotFound/>
    </Route>
  </Switch>);
}
