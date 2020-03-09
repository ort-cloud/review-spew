import React, {Component} from "react";
import "./App.css";
import Form from "./components/Form/Form";

//! May not need this component at all.

class Login extends Component {
  render() {
    return (
      <div>
        <header role='banner'>
          <h1>Login</h1>
        </header>
        <h2>Welcome back!</h2>
        <Form />
      </div>
    );
  }
}

export default Login;
