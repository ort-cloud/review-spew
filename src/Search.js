import React, {Component} from "react";
import "./App.css";
import {Link} from "react-router-dom";
import uuid from "react-uuid";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieTitle: "",
      reviewArr: [],
    };
    this.handleMovieTitle = this.handleMovieTitle.bind(this);
  }

  handleSearch(event) {
    event.preventDefault();
    const searchText = this.state.movieTitle;
    const url = `http://localhost:8000/api/search/${searchText}`;
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

  render() {
    /* console.log(this.state.reviewArr); */
    const serverErrorMessage = this.state.error ? (
      <div className='create-error'>Don't Have that one yet, sorry.</div>
    ) : (
      ""
    );

    const mapReviewRes = this.state.reviewArr;

    const displayReviews = mapReviewRes.map(item => {
      return (
        <div>
          <ul>
            <li key={uuid()}>{item.movie_title}</li>

            <li key={uuid()}>
              <span>Genre:</span> {item.genre}
            </li>

            <li key={uuid()}>
              <span>Author:</span> {item.review_author}
            </li>

            <li key={uuid()}>
              <span>URL:</span> {item.review_url}
            </li>

            <li key={uuid()}>
              <span>Blurb:</span> {item.review_text}
            </li>
          </ul>
        </div>
      );
    });

    return (
      <div>
        <header>
          <p>[placeholder for logo]</p>
          <p>[logo will also be button returning to the landing page]</p>
          <Link to={"/"}>
            <h1>Search Page</h1>
          </Link>
          <h2>The searchiest of search pages</h2>
        </header>
        {serverErrorMessage}
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

        <div>{displayReviews}</div>

        <section>
          <Link to={"/savedreviews"}>
            <button>Go To Saved List</button>
          </Link>
        </section>
      </div>
    );
  }
}

export default Search;
