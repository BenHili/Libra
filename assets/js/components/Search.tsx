import React from "react";
import "./Search.css";
import { parse as QueryParse } from "query-string";
import { withRouter } from "react-router-dom";

const appName = "Libra";

class Search extends React.Component {
  constructor(props) {
    super(props);
    if (props.location) {
      const value = QueryParse(props.location.search);
      this.state = { value: value.query, query: value.query };
    } else {
      this.state = { value: "", query: "" };
    }
    this.searchChange = this.searchChange.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  searchChange(event) {
    this.setState({ value: event.target.value });
  }

  searchSubmit(event) {
    if (event.charCode === 13) {
      this.props.history.push(`/search?query=${this.state.value}`);
      event.target.value = "";
      this.setState({ value: "", query: this.state.value });
    }
  }

  render() {
    return (
      <div className="Search-container">
        <h1>{appName}</h1>
        <input
          className="Search-input"
          type="text"
          onChange={this.searchChange}
          onKeyPress={this.searchSubmit}
          placeholder={this.state.query}
        />
      </div>
    );
  }
}

export default withRouter(Search);
