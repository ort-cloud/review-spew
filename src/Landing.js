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
            <p>Stuck trying to figure out what to watch? Maybe you’re a movie nerd and you’re not sure if the dubbed German toture-horror, or the sci fi/thriller/space noir is right for your blog? Maybe it’s late, you just got that text to chill, and now you have to choose between the ultra-violent anime you were going to watch or literally anything else? This is where Review Spew comes in to hold your hair back for you. Enter the name of the movie or tv show in question and Review Spew will regurgitate reviews from the top review sites from all across the web. A fair and honest upchuck of all the pretentious opinions your cinephilic heart desires smeared across your screen.</p>
          </header>

          <section>
            <h2>Check it out!</h2>
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
