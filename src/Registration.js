import React, {Component} from "react";
import "./App.css";
import Form from "./components/Form/Form";

class Registration extends Component {
  render() {
    return (
      <div>
        <header role='banner'>
          <h1>Login</h1>
        </header>
        <Form />
      </div>
    );
  }
}

export default Registration;