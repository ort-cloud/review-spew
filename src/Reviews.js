import React, {Component} from "react";
import {Link} from "react-router-dom";
import uuid from "uuid";

import "./App.css";

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userReviewArr: [],
      savedReviewId: [],
      userHasNoSavedReviews: null,
    };
  }

  componentDidMount() {
    const loadData = this.props.location.state.users_id
    const url = `http://localhost:8000/api/reviews/savedReview/check/${loadData}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, options)
      .then(res => {
        return res;
      })
      .then(res => res.json())
      .then(data => {
        if (data === false) {
          this.setState({
            userHasNoSavedReviews: true,
          });
          return null;
        }
        return fetch(
          `http://localhost:8000/api/reviews/savedReview/user/${this.props.location.state.users_id}`,
          options
        )
          .then(res => {
            if (!res.ok) {
              throw new Error("Oh, no. Error!");
            }
            return res;
          })
          .then(res => res.json())
          .then(data => {
            let idArray = [];
            let savedIdArray = [...data];
            data.filter(item => {
              return idArray.push(item.reviews_id);
            });
            this.setState({
              savedReviewId: savedIdArray,
            });
            const promises = idArray.map(item => {
              return fetch(
                `http://localhost:8000/api/reviews/${item}`,
                options
              )
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
      });
  }

  removeDelFromDom = index => {
    const copyArray = Object.assign([], this.state.userReviewArr);
    copyArray.splice(index, 1);
    this.setState({
      userReviewArr: copyArray,
    });
  };

  handleDelete = reviews_id => {
    let deleteArray = [];
    this.state.savedReviewId.filter(item => {
      return item.reviews_id === reviews_id ? deleteArray.push(item.id) : null;
    });

    const url = `http://localhost:8000/api/reviews/savedReview/${deleteArray}`;
    const options = {
      method: "DELETE",
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
      .then(data => {
        this.removeDelFromDom();
      })
      .catch(err => {
        this.setState({
          error: err.message,
        });
      });
  };

  render() {
    const noReviews = this.state.userHasNoSavedReviews ? (
      <div>You haven't saved any reviews yet.</div>
    ) : (
      ""
    );
    const mapUserReviews = this.state.userReviewArr;
    const flattened = [].concat.apply([], mapUserReviews);
    const displaySavedReviews = flattened.map(item => {
      return (
        <div key={uuid()}>
          <ul key={uuid()}>
            <li key={uuid()}>{item.movie_title}</li>

            <li key={uuid()}>
              <span>Genre:</span> {item.genre}
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
          </ul>
          <button onClick={() => this.handleDelete(item.reviews_id)}>
            Delete
          </button>
        </div>
      );
    });

    return (
      <div>
        <header>
          <h1>Reviews</h1>
          <h2>The searchiest of search pages</h2>
          {noReviews}
        </header>
        <div key={uuid()}>{displaySavedReviews}</div>
        <Link to={"/search"}>
          <button>Back To Search</button>
        </Link>
      </div>
    );
  }
}
export default Reviews;
