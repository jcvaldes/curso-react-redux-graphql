import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "font-awesome/css/font-awesome.css";

// import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import generateStore from "./redux/store";
// genero el store

let WithRouter = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
let store = generateStore();

// el ruteo lo encerramos en un Provider para configurar el store
let WithStore = () => (
  <Provider store={store}>
    <WithRouter />
  </Provider>
);
ReactDOM.render(<WithStore />, document.getElementById("root"));
