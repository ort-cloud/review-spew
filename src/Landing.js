import React, {Component} from "react";
import "./App.css";
import {Link} from "react-router-dom";


class Landing extends Component {
  render() {
    return (
      <div className='App'>
        <main>
          <header>
            <h1>Review Spew</h1>
            <h2>[tag line here]</h2>
          </header>

          <section>
            <h3>Check it out!</h3>
            <p>[TODO: make search bar]</p>
          </section>

          <section>
            <form className='form'>
              <div>
                <label>Username</label>
                <input type='text' />
              </div>
              <div>
                <label>Password</label>
                <input type='password' />
              </div>
              <Link to={"/search"}>
                <button type='submit'>Login</button>
              </Link>

              <Link to={"/search"}>
                <button type='submit'>Sign Up</button>
              </Link>
            </form>
          </section>
        </main>
      </div>
    );
  }
}

export default Landing;
