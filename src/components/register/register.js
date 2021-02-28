import React, { Component } from "react";
import { Link } from "react-router-dom";
import PasswordStrengthBar from "react-password-strength-bar";
import validator from "validator";
import "../login/login.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      errors: {
        email: "",
        password: "",
        confirmPassword: "",
        response: "",
      },
    };
    this.isFormSubmitted = false;
    this.isValid = false;
    this.onValueChange = this.onValueChange.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.validatingInput = this.validatingInput.bind(this);
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
    const { email, password, confirmPassword } = formData;
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
    if (validator.isEmpty(confirmPassword)) {
      // validation for confirmPassword required
      this.isValid = false;
      errors = {
        ...errors,
        confirmPassword: "Password is required",
      };
    } else {
      if (!validator.isLength(confirmPassword, { min: 6 })) {
        // validation for minimum confirmPassword length
        this.isValid = false;
        errors = {
          ...errors,
          confirmPassword: "Password must be at least 6 characters",
        };
      }
      if (
        !validator.isEmpty(password) &&
        !validator.equals(password, confirmPassword)
      ) {
        // validation for matching password
        this.isValid = false;
        errors = {
          ...errors,
          password: "",
          confirmPassword: "Password does not match",
        };
      } else {
        errors = {
          ...errors,
          password: "",
          confirmPassword: "",
        };
      }
    }
    if (this.isValid) {
      errors = {
        email: "",
        password: "",
        confirmPassword: "",
        response: errors.response,
      };
    }
    this.setState({
      errors: errors,
    });
  }

  onRegister(event) {
    event.preventDefault();
    this.isFormSubmitted = true;
    this.validatingInput();
  render() {
    return (
      <div className="limiter col-sm-12">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-form-title">
              <span className="login100-form-title-1">Sign Up</span>
            </div>
            <form
              className="login100-form"
              onSubmit={this.onRegister}
              noValidate
            >
              <div
                className={
                  "wrap-input100 " + (!this.state.errors.email ? "mb-3" : "")
                }
              >
                <span className="label-input100">Email</span>
                <input
                  className="input100"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={this.onValueChange}
                  value={this.state.formData.email}
                />
                <span className="focus-input100"></span>
              </div>
              {this.state.errors.email && (
                <div>
                  <small className="text-danger">
                    {this.state.errors.email}
                  </small>
                </div>
              )}
              <div
                className={
                  "wrap-input100 " + (!this.state.errors.password ? "mb-3" : "")
                }
              >
                <span className="label-input100">Password</span>
                <input
                  className="input100"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onChange={this.onValueChange}
                  value={this.state.formData.password}
                />
                <span className="focus-input100"></span>
              </div>
              {this.state.errors.password && (
                <div>
                  <small className="text-danger">
                    {this.state.errors.password}
                  </small>
                </div>
              )}
              <div
                className={
                  "wrap-input100 " +
                  (!this.state.errors.confirmPassword ? "mb-3" : "")
                }
              >
                <span className="label-input100">Confirm Password</span>
                <input
                  className="input100"
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter password"
                  onChange={this.onValueChange}
                  value={this.state.formData.confirmPassword}
                />
                <span className="focus-input100"></span>
              </div>
              {this.state.errors.confirmPassword && (
                <div>
                  <small className="text-danger">
                    {this.state.errors.confirmPassword}
                  </small>
                </div>
              )}
              <div className="container-login100-form-btn mt-2">
                <PasswordStrengthBar password={this.state.formData.password} />
              </div>
              <div className="row col-sm-12 anchor">
                <span>
                  Already have an account?{" "}
                  <Link to="/login" className="anchor">
                    Login here
                  </Link>
                </span>
              </div>
              <div className="container-login100-form-btn mt-4">
                <button type="submit" className="login100-form-btn">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
