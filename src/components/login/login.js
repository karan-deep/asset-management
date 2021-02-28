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
  onLogin(event) {
    event.preventDefault();
    this.isFormSubmitted = true;
    this.validatingInput();
  }

  onValueChange(event) {
    const { formData } = this.state;
    this.setState(
      {
        formData: {
          ...formData, // leaving other values unchanged
          [event.target.name]: event.target.value, // updating changed value
        },
      },
      () => {
        if (this.isFormSubmitted) {
          this.validatingInput();
        }
      }
    );
  }

  validatingInput() {
    this.isValid = true;
    let { formData, errors } = this.state;
    const { email, password } = formData;
    if (validator.isEmpty(email)) {
      // validation for email required
      this.isValid = false;
      errors = {
        ...errors,
        email: "Email is required",
      };
    } else {
      if (!validator.isEmail(email)) {
        // validation for valid email
        this.isValid = false;
        errors = {
          ...errors,
          email: "Email must be a valid email address",
        };
      } else {
        errors = {
          ...errors,
          email: "",
        };
      }
    }
    if (validator.isEmpty(password)) {
      // validation for password required
      this.isValid = false;
      errors = {
        ...errors,
        password: "Password is required",
      };
    } else {
      if (!validator.isLength(password, { min: 6 })) {
        // validation for minimum password length
        this.isValid = false;
        errors = {
          ...errors,
          password: "Password must be at least 6 characters",
        };
      } else {
        errors = {
          ...errors,
          password: "",
        };
      }
    }
    if (this.isValid) {
      errors = {
        email: "",
        password: "",
      };
    }
    this.setState({
      errors: errors,
    });
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
