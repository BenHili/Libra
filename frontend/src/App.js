import React from "react";
import "./App.css";

import book from "./images/road_to_learn_react.jpg";

const title = `My title`
const description = `Swipe at owner's legs purr like an angel. `;

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
    <div>
      <div className="Book-card-new">
        <div className="Image-box">
          <img src={props.image} />
        </div>
        <div className="Test-box">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
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
