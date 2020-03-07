import React, {Component} from "react";
import "./App.css";
import {Link} from "react-router-dom";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  updateUsername(username) {
    /* console.log("heyyyyy"); */
    this.setState({username: username});
  }

  updatePassword(password) {
    /* console.log("ohhhhhhh"); */
    this.setState({password: password});
  }

  handleRegSubmit(event) {
    event.preventDefault();
    /* console.log("Submitted"); */
    const {history} = this.props;
    const {username, password} = this.state;
    const newUser = {username, password};
    const url = "http://localhost:8000/api/users";
    const options = {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error("something went wrong");
        }
        return res.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error("something went wrong 2");
        }
        this.setState({
          username: this.updateUsername(username),
          password: this.updatePassword(password),
        });
      })
      .then(() => {
        history.push("/search");
      })
      .catch(err => {
        this.setState({
          error: err.message,
        });
      });
  }

  render() {
    return (
      <div className='App'>
        <main>
          <header>
            <h1>Review Spew</h1>
            <p>
              Stuck trying to figure out what to watch? Maybe you’re a movie
              nerd and you’re not sure if the dubbed German toture-horror, or
              the sci fi/thriller/space noir is right for your blog? Maybe it’s
              late, you just got that text to chill, and now you have to choose
              between the ultra-violent anime you were going to watch or
              literally anything else? This is where Review Spew comes in to
              hold your hair back for you. Enter the name of the movie or tv
              show in question and Review Spew will regurgitate reviews from the
              top review sites from all across the web. A fair and honest
              upchuck of all the pretentious opinions your cinephilic heart
              desires smeared across your screen.
            </p>
          </header>

          <section>
            <h2>Check it out!</h2>
          </section>

          <section>
            <form
              className='form'
              onSubmit={event => this.handleRegSubmit(event)}
            >
              <div>
                <label>Username</label>
                <input
                  required
                  type='text'
                  onChange={e => this.updateUsername(e.target.value)}
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  required
                  type='password'
                  onChange={e => this.updatePassword(e.target.value)}
                />
              </div>
              {/* <Link to={"/search"}>
                <button type='submit'>Login</button>
              </Link> */}

              <button type='submit'>Sign Up</button>

              {/* <Link to={"/search"}>
                <button type='submit'>Sign Up</button>
              </Link> */}
            </form>
          </section>
        </main>
      </div>
    );
  }
}

export default Landing;
