import React from "react";
import ReactDOM from "react-dom";
import Reviews from "./Reviews";
import {Router} from "react-router-dom";
import {createMemoryHistory} from "history";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const history = createMemoryHistory();
  const state = {user_id: 1};
  history.push("/", state);

  ReactDOM.render(
    <Router history={history}>
      <Reviews />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
