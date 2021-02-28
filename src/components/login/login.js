import React, { Component } from "react";
import validator from "validator";
import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: "",
        password: "",
      },
      errors: {
        email: "",
        password: "",
      },
    };
  }

  render() {
    return (
      <div className="limiter col-sm-12">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-form-title">
              <span className="login100-form-title-1">Sign In</span>
            </div>
            <form className="login100-form">
              <div className="wrap-input100">
                <span className="label-input100">Email</span>
                <input
                  className="input100"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                />
                <span className="focus-input100"></span>
              </div>
              <div className="wrap-input100">
                <span className="label-input100">Password</span>
                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                />
                <span className="focus-input100"></span>
              </div>
              <div className="container-login100-form-btn mt-3">
                <button type="submit" className="login100-form-btn">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
