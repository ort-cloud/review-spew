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
        this.removeSavedFromDom();
        alert("Saved");
      })
      .catch(err => {
        this.setState({
          error: err.message,
        });
      });
  };

  handleMovieTitle(event) {
    this.setState({movieTitle: event.target.value});
  }

  capString(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  resetForm = () => {
    this.myFormRef.reset();
  };

  handleLogOut = () => {
    localStorage.clear();
  };

  removeSavedFromDom = index => {
    const copyArray = Object.assign([], this.state.reviewArr);
    copyArray.splice(index, 1);
    this.setState({
      reviewArr: copyArray,
    });
  };

  render() {
    const mapReviewRes = this.state.reviewArr;
    const displaySearchReviews = mapReviewRes.map(item => {
      return (
        <div className="display-reviews" key={uuid()}>
          <ul key={uuid()}>
            <h4 className='movie_title' key={uuid()}>{item.movie_title}</h4>
            <li key={uuid()}>
              <label key={uuid()}>Genre:</label> {item.genre}
            </li>
            <li key={uuid()}>
              <label key={uuid()}>Author:</label> {item.review_author}
            </li>
            <li key={uuid()}>
              <label key={uuid()}>URL:</label> {item.review_url}
            </li>
            <li key={uuid()}>
              <label key={uuid()}>Review:</label> {item.review_text}
            </li>
            <button
              key={uuid()}
              onClick={() => this.handleSaveReview(item.reviews_id)}
            >
              Save
            </button>
          </ul>
        </div>
      );
    });

    return (
      <div>
        <header>
            <h1>Search Page</h1>
          <h2>
            Welcome <span>{this.state.username}</span>
          </h2>
        </header>
        <section>
          <Link
            to={{
              pathname: "/savedreviews",
              state: {users_id: this.state.users_id},
            }}
          >
            <button>Go To Saved List</button>
          </Link>
          <Link to={"/"}>
            <button onClick={() => this.handleLogOut()}>Logout</button>
          </Link>
        </section>
        <form
          className='search-form'
          ref={el => (this.myFormRef = el)}
          onSubmit={event => this.handleSearch(event)}
        >
          <h3>Enter a movie title in the box below. Spew results.</h3>
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

        <div key={uuid()} >{displaySearchReviews}</div>
      </div>
    );
  }
}

export default withRouter(Search);
