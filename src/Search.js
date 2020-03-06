import React from "react";
import "./App.css";
import {Link} from "react-router-dom";

function Search() {
  return (
    <div>
      <nav>Nav</nav>
      <header>
        <p>[placeholder for logo]</p>
        <p>[logo will also be button returning to the landing page]</p>
        <Link to={"/"}>
          <h1>Search Page</h1>
        </Link>
        <h2>The searchiest of search pages</h2>
      </header>

      <section>
        <h3>Enter movie title in the box below. Spew results.</h3>
        <input
          type='text'
          name='search-box'
          id='search-box'
          placeholder='Enter movie title'
        />
        <button type='submit'>Search...</button>
      </section>

      <section>
        <p>
          [Results from server will populate below with the option to save if
          logged in]
        </p>
        <p>[If no search made this section will not appear]</p>
      </section>

      <section>
        <h2>Review 1</h2>
        <p>Movie Title</p>
        <p>Genre</p>
        <p>Review Author</p>
        <p>Review url</p>
        <p>Review text</p>
        <button>Save review</button>
      </section>

      <section>
        <h2>Review 2</h2>
        <p>Movie Title</p>
        <p>Genre</p>
        <p>Review Author</p>
        <p>Review url</p>
        <p>Review text</p>
        <button>Save review</button>
      </section>

      <section>
        <h2>Review 3</h2>
        <p>Movie Title</p>
        <p>Genre</p>
        <p>Review Author</p>
        <p>Review url</p>
        <p>Review text</p>
        <button>Save review</button>
      </section>

      <section>
        <p>[saved list page will have an option to change username]</p>
        <Link to={"/savedreviews"}>
          <button>Go To Saved List</button>
        </Link>
      </section>
    </div>
  );
}

export default Search;
