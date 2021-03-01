import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import authService from "./services/auth";
import axios from "axios";

// Intercepting API request calls and sending token for secured API calls that being used after login
axios.interceptors.request.use((request) => {
  if (authService.isLogin && authService.token) {
    request.headers.Authorization = `Bearer ${authService.token}`;
  }
  return request;
});

// Intercepting API response and navigating to login page if response status is 401(Unauthorized) or response status is 403(Forbidden)
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      (error && error.response && error.response.status === 403) ||
      error.response.status === 401
    ) {
      return (window.location.href = "/login");
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
