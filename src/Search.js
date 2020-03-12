import React, {Component} from "react";
import "./App.css";
import {Link, withRouter} from "react-router-dom";
import uuid from "react-uuid";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieTitle: "",
      reviewArr: [],
      users_id: "",
      username: "",
    };
    this.handleMovieTitle = this.handleMovieTitle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const getUser = localStorage.getItem("username");
    const url = `http://localhost:8000/api/users/username/${getUser}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error("Oh, no. Error!");
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          users_id: data.users_id,
          username: getUser,
        });
      })
      .catch(err => {
        this.setState({
          error: err.message,
        });
      });
  }

  handleSearch(event) {
    event.preventDefault();
    const url = `http://localhost:8000/api/search/${this.state.movieTitle}`;
    const options = {
      method: "GET",
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
          reviewArr: data,
        });
      })
      .catch(err => {
        this.setState({
          error: err.message,
        });
      });
  }

  handleSaveReview = reviews_id => {
    this.state.reviewArr.filter(item => {
      return item.reviews_id;
    });
    const url = `http://localhost:8000/api/reviews/savedReview`;
    const options = {
      method: "POST",
      body: JSON.stringify({
        users_id: this.state.users_id,
        reviews_id: reviews_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error("Somethng went wrong 2");
        }
        alert("Saved");
      })
      .catch(err => {
        this.setState({
          error: err.message,
        });
      });
  };

  handleChange(event) {
    this.setState({username: event.target.value});
  }

  handleMovieTitle(event) {
    this.setState({movieTitle: event.target.value});
  }

  handleUserNameChange = event => {
    event.preventDefault();
    const url = `http://localhost:8000/api/users/${this.state.users_id}`;
    const options = {
      method: "PATCH",
      body: JSON.stringify({
        users_id: this.state.users_id,
        username: this.state.username,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, options)
      .then(res => {
        if (!res.ok) {
          throw new Error("something went wrong");
        }
        return res;
      })
      .then(res => res.json())
      
      .catch(err => {
        this.setState({
          error: err.message,
        });
      });

    localStorage.setItem("username", this.state.username);
  };

  capString(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  resetForm = () => {
    this.myFormRef.reset();
  };

  render() {
    const mapReviewRes = this.state.reviewArr;
    const displaySearchReviews = mapReviewRes.map(item => {
      return (
        <div>
          <ul>
            <li key={uuid()}>{item.movie_title}</li>
            <li key={uuid()}>
              <span key={uuid()}>Genre:</span> {item.genre}
            </li>
            <li key={uuid()}>
              <span key={uuid()}>Author:</span> {item.review_author}
            </li>
            <li key={uuid()}>
              <span key={uuid()}>URL:</span> {item.review_url}
            </li>
            <li key={uuid()}>
              <span key={uuid()}>Blurb:</span> {item.review_text}
            </li>
            <button
              key={uuid()}
              onClick={() => this.handleSaveReview(item.reviews_id)}
            >
              Save Trigger
            </button>
          </ul>
        </div>
      );
    });

    return (
      <div>
        <header>
          <Link to={"/"}>
            <h1>Search Page</h1>
          </Link>
          <h2>
            Welcome <span>{this.state.username}</span>
          </h2>
          <p>User name make you gag?</p>
          <form onSubmit={event => this.handleUserNameChange(event)}>
            <input
              type='text'
              /* value={this.state.username} */
              onChange={this.handleChange}
            />
          </form>
        </header>
        <form
          ref={el => (this.myFormRef = el)}
          onSubmit={event => this.handleSearch(event)}
        >
          <h3>Enter movie title in the box below. Spew results.</h3>
          <input
            type='text'
            name='search-box'
            id='search-box'
            placeholder='Enter movie title'
            value={this.capString(this.state.movieTitle)}
            onChange={this.handleMovieTitle}
          />
          <button type='submit'>Search...</button>
        </form>

        <div>{displaySearchReviews}</div>

        <section>
          <Link
            to={{
              pathname: "/savedreviews",
              state: {users_id: this.state.users_id},
            }}
          >
            <button>Go To Saved List</button>
          </Link>
        </section>
      </div>
    );
  }
}

export default withRouter(Search);
