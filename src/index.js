import React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import routes from "./routes";
import "./styles/styles.scss";
import "./styles/animations.scss";
import { loadState, saveState } from "./store/localStorage";

const persistedStore = loadState();
const store = configureStore(persistedStore);

store.subscribe(() => {
  saveState(store.getState());
});

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById("app")
);
