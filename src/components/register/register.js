import React, { Component } from "react";

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
  render() {
    return <div></div>;

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
  }
}

export default Register;
