import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";

import DeepLive from "./components/DeepLive/DeepLive";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DeepLive />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
