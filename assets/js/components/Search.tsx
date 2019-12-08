import React, { Component } from "react";
import "./Search.css";
import { parse as QueryParse } from "query-string";
import { withRouter, RouteComponentProps } from "react-router-dom";

const appName = "Libra";

interface SearchState {
  value: string;
  query: string;
}

class Search extends Component<RouteComponentProps, SearchState> {
  constructor(props: RouteComponentProps) {
    super(props);

    const value = QueryParse(props.location.search);

    this.state = { value: value.query, query: value.query } as SearchState;
    this.searchChange = this.searchChange.bind(this);
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  searchChange(event: any) {
    this.setState({ value: event.target.value });
  }

  searchSubmit(event: any) {
    if (event.charCode === 13) {
      this.props.history.push(`/search?query=${this.state.value}`);
      event.target.value = "";
      this.state = { value: "", query: this.state.value };
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
        />
      </div>
    );
  }
}

export default withRouter(Search);
