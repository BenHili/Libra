import React from "react";
import Book from "./components/Book";
import NavBar from "./components/NavBar";
import Search from "./components/Search";
import Create from "./components/Create";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import "./App.css";

import book from "./images/road_to_learn_react.jpg";
const title = `My title`;
const description = `Swipe at owner's legs purr like an angel. `;

const bookParams = {
  img: book,
  title,
  description
};

function Results(props) {
  return (
    <div className="App">
      <NavBar />
      <Search {...props.searchProps} search={props.match.params.query} />
      <div className="App-books">
        <Book {...bookParams} />
        <Book {...bookParams} />
        <Book {...bookParams} />
        <Book {...bookParams} />
        <Book {...bookParams} />
        <Book {...bookParams} />
        <Book {...bookParams} />
      </div>
    </div>
  );
}

function Home(props) {
  return (
    <div className="App">
      <div className="App-fullscreen-background">
        <div className="App-fullscreen-search">
          <Search {...props.searchProps} search="Enter your search terms" />
        </div>
      </div>
    </div>
  );
}


function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route path="/search" component={Results} />
      <Route path="/create" component={Create} />
    </Router>
  );
}

export default withRouter(App);
