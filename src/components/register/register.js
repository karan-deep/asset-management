import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: "",
        password: "",
        confirmPassword: "",
      },
      errors: {
        username: "",
        password: "",
        confirmPassword: "",
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
  }
}

export default Register;
