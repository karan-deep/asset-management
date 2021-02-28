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
  render() {
    return <div></div>;
  }
}

export default Register;
