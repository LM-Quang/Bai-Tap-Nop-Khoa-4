import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

//setup redux
import store from "./redux/configStore";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { history } from "./util/history";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
   <Router history={history}>
      <Provider store={store}>
         <App />
      </Provider>
   </Router>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
