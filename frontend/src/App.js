import React from "react";
import Book from "./components/Book";
import Search from "./components/Search";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import "./App.css";

function Header(props) {
  return <header className="App-header">{props.search}</header>;
}

function Results(props) {
  return (
    <div className="App">
      <Header search={<Search {...props.searchProps} />} />
      <div className="App-books">
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };
    this.searchChange = this.searchChange.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  searchChange(event) {
    this.setState({ searchValue: event.target.value });
  }

  searchSubmit(key) {
    if (key.charCode == 13) {
      this.props.history.push(`/search?query=${this.state.searchValue}`);
      this.setState({ search: this.state.searchValue });
    }
  }

  render() {
    const searchProps = {
      search: this.state.search,
      submit: this.searchSubmit,
      change: this.searchChange
    };

    return (
      <Router>
        <Route
          path="/search"
          component={Results}
          render={() => <Results searchProps={searchProps} />}
        />
        <Route
          exact
          path="/"
          render={() => <Home searchProps={searchProps} />}
        />
      </Router>
    );
  }
}

export default withRouter(App);
