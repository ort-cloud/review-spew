import React, {Component} from "react";
import "../../App.css";

class Form extends Component {
  render() {
    return (
      <div>
        <form>
          <div>
            <label>Username</label>
            <input type='text' />
          </div>
          <div>
            <label for='password'>Password</label>
            <input type='password' />
          </div>
          <button type='submit'>Log in</button>
        </form>
      </div>
    );
  }
}

export default Form;
