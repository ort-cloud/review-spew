import React from "react";
import "./App.css";

function Login() {
  return (
    <div>
      <header role='banner'>
        <h1>Login</h1>
      </header>

      <section>
        <h2>Welcome back!</h2>
        <form class='signup-form'>
          <div>
            <label for='username'>Username</label>
            <input type='text' name='username' id='username' />
          </div>
          <div>
            <label for='password'>Password</label>
            <input type='password' name='password' id='password' />
          </div>
          <button type='submit'>Log in</button>
        </form>
      </section>
      <footer role='content-info'>Footer</footer>
    </div>
  );
}

export default Login;