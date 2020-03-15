import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import Reviews from './Reviews';


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