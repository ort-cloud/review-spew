import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import uuid from "uuid";
import "../App/App.css";

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
    const loadData = this.props.location.state.users_id;
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
      });
  }

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
        this.removeDelFromDom(reviews_id);
        return res;
      })
      .then(data => {
        if (data.error) {
          throw new Error("Somethng went wrong 2");
        }
      })
      .catch(err => {
        this.setState({
          error: err.message,
        });
      });
  };

  removeDelFromDom(reviews_id) {
    const mapUserReviews = this.state.userReviewArr;
    const flattened = [].concat.apply([], mapUserReviews);
    const copyArray = Object.assign([], flattened);
    const result = copyArray.filter(item => item.reviews_id !== reviews_id);
    this.setState({userReviewArr: result});
  }

  render() {
    const noReviews = this.state.userHasNoSavedReviews ? (
      <div>
        <h2>You haven't saved any reviews yet.</h2>
      </div>
    ) : (
      ""
    );
    const mapUserReviews = this.state.userReviewArr;
    const flattened = [].concat.apply([], mapUserReviews);
    const displaySavedReviews = flattened.map(item => {
      return (
        <div className='display-reviews' key={uuid()}>
          <ul key={uuid()}>
            <h4 className='movie_title' key={uuid()}>
              {item.movie_title}
            </h4>

            <li key={uuid()}>
              <label>Genre:</label> {item.genre}
            </li>

            <li key={uuid()}>
              <label key={uuid()}>Author:</label> {item.review_author}
            </li>

            <li key={uuid()}>
              <label key={uuid()}>URL:</label> {item.review_url}
            </li>

            <li key={uuid()}>
              <label key={uuid()}>Blurb:</label> {item.review_text}
            </li>
            <button
              className='delete-btn'
              key={uuid()}
              onClick={() => this.handleDelete(item.reviews_id)}
            >
              Delete
            </button>
          </ul>
        </div>
      );
    });

    return (
      <div>
        <header>
          <h1>Reviews</h1>
          <h2>...here's all your fav's.</h2>
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
export default withRouter(Reviews);
