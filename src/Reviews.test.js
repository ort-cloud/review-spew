import React from 'react';
import ReactDOM from 'react-dom';
import Reviews from './Reviews';
import {BrowserRouter} from "react-router-dom";


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Reviews />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
