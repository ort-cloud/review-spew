import React from "react";
import {Link} from "react-router-dom";
import "./App.css";

function Reviews() {
  return (
    <div>
      <main role='main'>
        <header role='banner'>
          <h1>Review List</h1>
          <p>[Below will be a list of saved reviews]</p>
        </header>

        <section>
          <form>
            <label htmlFor='change-username'>Change Username</label>
            <input type='text' />
          </form>
        </section>

        <section>
          <h2>Review</h2>
          <p>[placeholder for review text blurb]</p>
          <button>Delete Review</button>
        </section>

        <section>
          <h2>Review</h2>
          <p>[placeholder for review text blurb]</p>
          <button>Delete Review</button>
        </section>

        <section>
          <h2>Review</h2>
          <p>[placeholder for review text blurb]</p>
          <button>Delete Review</button>
        </section>

        <section>
          <h2>Review</h2>
          <p>[placeholder for review text blurb]</p>
          <button>Delete Review</button>
        </section>

        <section>
          <h2>Review</h2>
          <p>[placeholder for review text blurb]</p>
          <button>Delete Review</button>
        </section>

        <Link to={"/search"}>
          <button>Back To Search</button>
        </Link>
      </main>
    </div>
  );
}
export default Reviews;
