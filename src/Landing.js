import React, {Component} from "react";
import TokenService from "./service/token-service";
import {withRouter} from "react-router-dom";
import "./App.css";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      clickedLogin: false,
      clickedSignUp: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  updateUsername(username) {
    this.setState({username: username});
  }

  updatePassword(password) {
    this.setState({password: password});
  }

  handleBasicAuthLogin(event) {
    event.preventDefault();
    const {history} = this.props;
    const {username, password} = this.state;
    const url = "http://localhost:8000/api/users/login";
    const options = {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(username.value, password.value)
    );
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
        localStorage.setItem("username", username);
        history.push("/search");
      })
      .catch(err => {
        this.setState({
          error: err.message,
        });
      });
  }

  handleBasicAuthReg(event) {
    event.preventDefault();
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
    TokenService.saveAuthToken(
      TokenService.makeBasicAuthToken(username.value, password.value)
    );
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
        localStorage.setItem("username", username);
        history.push("/search");
      })
      .catch(err => {
        this.setState({
          error: err.message,
        });
      });
  }

  handleLogin = () => {
    this.setState({
      clickedLogin: true,
    });
  };

  handleLogOut = () => {
    localStorage.clear();
  };

  handleSignUp = () => {
    this.setState({
      clickedSignUp: true,
    });
  };

  render() {
    const loginOrSignup = this.state.clickedLogin
      ? event => this.handleBasicAuthLogin(event)
      : null || this.state.clickedSignUp
      ? event => this.handleBasicAuthReg(event)
      : null;

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
              hold your hair back for you. Enter the name of the movie in
              question and Review Spew will regurgitate reviews from the top
              review sites from all across the web. A fair and honest upchuck of
              all the pretentious opinions your cinephilic heart desires smeared
              across your screen.
            </p>

            <h2 className='splatter'>Splatter Warning</h2>

            <p>
              This app, at the present time, is just a demonstration. So we have
              chosen to limit our list of films.
            </p>
            <p>
              Don't let this get you sick with worry. You still have 100 to
              chose from!
            </p>
            <p>
              Our list is provided by The American Film Institute's "100
              Years...100 Movies List".
            </p>
            <p>
              You can find their complete list{" "}
              <a
                target='_blank'
                rel='noopener noreferrer'
                href='https://www.afi.com/afis-100-years-100-movies-10th-anniversary-edition/'
              >
                here
              </a>
              . They even have a downloadable pdf checklist!
            </p>
          </header>

          <section className="splatter-section" >
            <h2>Check it out!</h2>

            <h3>Demo Login</h3>
            <p>
              {" "}
              <b>Username:</b> demo
            </p>
            <p>
              {" "}
              <b>Password:</b> demopass
            </p>
          </section>

          <section>
            <form className='form' onSubmit={loginOrSignup}>
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
              <button type='submit' onClick={this.handleLogin}>
                Login
              </button>
              <button type='submit' onClick={this.handleSignUp}>
                Sigh up
              </button>
            </form>
          </section>
        </main>
      </div>
    );
  }
}

export default withRouter(Landing);
