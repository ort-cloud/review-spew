import React from 'react'
import "./App.css"

function Search() {
  return (
    <div>
    <nav role="navigation">Nav</nav>
    <header role="banner">
      <p>[placeholder for logo]</p>
      <p>[logo will also be button returning to the landing page]</p>
      <h1>Search Page</h1>
      <h2>The searchiest of search pages</h2>
    </header>

    <section>
      <h3>Enter movie title in the box below. Spew results.</h3>
      <input type="text" name="search-box" id="search-box" placeholder="Enter movie title"/>
      <button type="submit">Search...</button>
    </section>

    <section>
      <p>[Results from server will populate below with the option to save if logged in]</p>
      <p>[If no search made this section will not appear]</p>
    </section>

    <section>
      <h2>Review</h2>
      <p>[placeholder for review text blurb]</p>
      <button>Save review (hidden if not logged in)</button>
      <button>Share (if time)</button>
    </section>

    <section>
      <h2>Review</h2>
      <p>[placeholder for review text blurb]</p>
      <button>Save review (hidden if not logged in)</button>
      <button>Share (if time)</button>
    </section>

    <section>
      <h2>Review</h2>
      <p>[placeholder for review text blurb]</p>
      <button>Save review (hidden if not logged in)</button>
      <button>Share (if time)</button>
    </section>
  <footer role="content-info">Footer</footer>
  </div>
  )
}

export default Search;