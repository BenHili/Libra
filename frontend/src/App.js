import React from "react";
import Book from "./components/Book";
import Search from "./components/Search";
import "./App.css";

import book from "./images/road_to_learn_react.jpg";

const title = `My title`;
const description = `Swipe at owner's legs purr like an angel. `;

function Header(props) {
  return <header className="App-header">{props.search}</header>;
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
      this.setState({ search: this.state.searchValue });
    }
  }

  render() {
    const searchProps = {
      name: "Libra",
      search: this.state.search,
      submit: this.searchSubmit,
      change: this.searchChange
    };

    if (this.state.search) {
      return (
        <div className="App">
          <Header search={<Search {...searchProps} />} />
          <div className="App-books">
            <Book title={title} image={book} description={description} />
            <Book title={title} image={book} description={description} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="App-fullscreen-background">
            <div className="App-fullscreen-search">
              <Search {...searchProps} search="Enter your search terms" />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
