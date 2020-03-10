import React, {Component} from "react";
import {Link} from "react-router-dom";
import uuid from "react-uuid";
import "./App.css";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userReviewArr: [],
    };
  }

  componentDidMount() {
    const url = `http://localhost:8000/api/reviews/savedReview/user/2`;
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
        console.log("USER DATA:", data);
        let idArray = [];
        data.filter(item => {
          return idArray.push(item.reviews_id);
        });
        console.log(`ID ARRAY:`, idArray);
        const promises = idArray.map(item => {
          return fetch(`http://localhost:8000/api/reviews/${item}`, options)
            .then(res => {
              if (!res.ok) {
                throw new Error("Oh, no. Error!");
              }
              return res;
            })
            .then(res => {
              return res.json();
            });
        });
        Promise.all(promises).then(data => {
          let arrayArray = [];
          data.map(item => {
            return arrayArray.push(item);
          });
          this.setState({
            userReviewArr: arrayArray,
          });
        });
      });
  }

  render() {
    const mapUserReviews = this.state.userReviewArr;
    const flattened = [].concat.apply([], mapUserReviews)
    const displaySavedReviews = flattened.map((item) => {

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
            <h1>Reviews</h1>
          </Link>
          <h2>The searchiest of search pages</h2>
        </header>

        <div>{displaySavedReviews}</div>

        <Link to={"/search"}>
          <button>Back To Search</button>
        </Link>
      </div>
    );
  }
}
export default Reviews;
