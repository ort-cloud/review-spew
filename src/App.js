import React, {Component} from "react";
import "./App.css";
import {Route, Switch} from "react-router-dom";
import Landing from "./Landing";
import PageNotFound from "./PageNotFound";
import Search from "./Search";
import Reviews from "./Reviews";

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route exact path={"/"} component={Landing} />
          <Route path={"/search"} component={Search} />
          <Route path={"/savedreviews"} component={Reviews} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
