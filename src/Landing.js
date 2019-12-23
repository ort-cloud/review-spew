import React from "react";
import "./App.css";

function Landing() {
  return (
    <div className='App'>
      <nav>Nav
        <button>Login</button>
      </nav>

      <main role="main">
    <header role="banner">
      <h1>Review Spew</h1>
      <h2>[tag line here]</h2>
    </header>

    <section>
      <header>
        <h3>More reviews than you can handle!</h3>
      </header>
      <p>[<em>placeholder for...</em>]</p>
      <p>[placeholder description of the app and it's general functions]</p>
    </section>

    <section>
      <header>
        <h3>Hey, you can save reviews!</h3>
      </header>
      <p>[<em>placeholder for...</em>]</p>
      <p>[placeholder for text explaining you can save inividual reviews]</p>
    </section>

    <section>
      <header>
        <h3>Reviews, reviews, reviews. Folders, folders, folders!</h3>
      </header>
      <p>[placeholder for...]</p>
      <p>[placeholder for text expalining the option to organize saved reviews into folders]</p>
    </section>

    <section>
      <h3>Check it out!</h3>
      <p>[above text will be link to search page]</p>
    </section>

    <section>
      <header>
        <h3>Signup Form</h3>
      </header>
      <form class='signup-form'>
        <div>
          <label for="username">Username</label>
          <input type="text" name='username' id='username' />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" name='password' id='password' />
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </section>

  </main>
  <footer role="contact-info">Footer</footer>
    </div>
  );
}

export default Landing;