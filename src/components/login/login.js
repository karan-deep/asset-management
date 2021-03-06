import React, { Component } from "react";
import { Link } from "react-router-dom";
import validator from "validator";
import authService from "../../services/auth";
import "./login.css";

// Class component Login inheriting React.Component gives the component access to React.Component's functions
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
        response: "",
      },
    };
    this.isValid = false;
    this.isFormSubmitted = false;

    //Binding functions to access the state of the component
    this.onValueChange = this.onValueChange.bind(this);
    this.validatingInput = this.validatingInput.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  // React hook using to navigate to the last route path, could be protected route as well if token is present in the local storage
  componentDidMount() {
    if (localStorage.getItem("token")) {
      authService.isLogin = true;
      authService.token = localStorage.getItem("token");
      const { state } = this.props.location;
      if (state && state.from && state.from.pathname) {
        this.props.history.push(state.from.pathname);
      }
    }
  }

  // Function for making api call for login authentication only if form is validated, navigating to the assets page and saving token to the local storage
  async onLogin(event) {
    event.preventDefault();
    this.isFormSubmitted = true;
    this.validatingInput();
    if (!this.isValid) {
      return;
    }
    const requestBody = {
      username: this.state.formData.email,
      password: this.state.formData.password,
    };
    try {
      const response = await authService.login(requestBody);
      if (response && response.data) {
        authService.isLogin = true;
        authService.token = response.data.token;
        localStorage.setItem("token", response.data.token);
        this.props.history.push("/assets");
      }
    } catch (error) {
      console.error(error.response);
      if (error && error.response && error.response.data) {
        this.setState({
          errors: {
            ...this.state.errors,
            response: error.response.data.message,
          },
        });
      }
    }
  }

  //Function for updating the state object that will allow to re-rendering the component. In a call back, when state object is updated then calling validatingInput function only if form is once submitted
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

  // Function for validating the input fields according to their type
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
        response: errors.response,
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
            <form className="login100-form" onSubmit={this.onLogin} noValidate>
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
                  required
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
                  required
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
              <div className="row col-sm-12 anchor">
                <span>
                  Don't have an account?{" "}
                  <Link to="/register" className="anchor">
                    Register here
                  </Link>
                </span>
              </div>
              {this.state.errors.response && (
                <div>
                  <small className="text-danger">
                    {this.state.errors.response}
                  </small>
                </div>
              )}
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
