import React from "react";
import Book from "./components/Book";
import Search from "./components/Search";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import "./App.css";

function Results(props) {
  return (
    <div className="App">
      <Search {...props.searchProps} search={props.match.params.query} />
      <div className="App-books">
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
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
      <Route path="/search" component={Results} />
      <Route exact path="/" component={Home} />
    </Router>
  );
}

export default withRouter(App);
