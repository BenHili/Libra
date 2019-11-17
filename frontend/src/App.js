import React from "react";
import "./App.css";

import book from "./images/road_to_learn_react.jpg";

const description = `Swipe at owner's legs purr like an angel. Crash against wall but walk
        away like nothing happened so you're just gonna scroll by without saying
        meowdy? yet love and coo around boyfriend who purrs and makes the
        perfect moonlight eyes so i can purr and swat the glittery gleaming yarn
        to him (the yarn is from a $125 sweater) for lick the plastic bag, cats
        making all the muffins. When in doubt, wash always ensure to lay down in
        such a manner that tail can lightly brush human's nose yet kitty
        scratches couch bad kitty for 𝕄𝔼𝕆𝕎 sit in a box for hours.`;

function Search(props) {
  return (
    <div className="Search-container">
      <h1>{props.name}</h1>
      <input
        className="App-search"
        type="text"
        onKeyPress={props.submit}
        onChange={props.change}
        placeholder={props.search}
      />
    </div>
  );
}

function Header(props) {
  return <header className="App-header">{props.search}</header>;
}

function Result(props) {
  return (
    <div className="App-result">
      <img src={props.image} />
      <p>{props.description}</p>
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
          <Result image={book} description={description} />
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
