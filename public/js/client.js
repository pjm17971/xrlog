console.log("Client: imports");
import React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute } from "react-router";
import App from "./components/app";
import Home from "./components/home";
import Auth from "./components/auth";

console.log("Client: render");
render((
  <Router>
    <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="/access_token*" component={Auth} />
    </Route>
  </Router>
), document.getElementById("content"));
