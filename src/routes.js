import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./components/app";
import AboutPage from "./components/about/aboutPage";
import HomePage from "./components/home/homePage";
import UpgradesPage from "./components/upgrades/upgradesPage";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="upgrades" component={UpgradesPage} />
  </Route>
);
