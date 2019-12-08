import React, { Component, FormEvent } from "react";
import axios from "axios";
import Book from "./Book";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";

import "../App.css";

interface ComponentState {
  response: any[];
  img: string;
}

class Create extends Component<RouteComponentProps, ComponentState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  async getGoogleResults(query: string) {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}`
    );

    if (response.data.items && response.data.items.length > 0) {
      this.setState({
        response: response.data.items,
        img: response.data.items[0].volumeInfo.imageLinks.smallThumbnail
      });
    }
  }

  async searchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const queryInputNode = document.getElementById(
      "queryInput"
    ) as HTMLInputElement;
    if (queryInputNode && queryInputNode.value) {
      await this.getGoogleResults(queryInputNode.value);
    }
  }

  render() {
    let results = [];

    if (this.state && this.state.response) {
      results.push(
        this.state.response.map((item, index) => {
          return (
            <div key={index}>
              <Book
                {...{
                  img: item.volumeInfo.imageLinks.smallThumbnail,
                  description: item.volumeInfo.description,
                  title: item.volumeInfo.title,
                  price: "$59.99"
                }}
              />
              <Link
                to={{
                  pathname: "/create/new",
                  state: { volumeInfo: item.volumeInfo }
                }}
              >
                {" "}
                My Link{" "}
              </Link>
            </div>
          );
        })
      );
    }

    return (
      <div className="Root">
        <form
          style={{
            textAlign: "left",
            justifyContent: "left",
            display: "flex",
            flexDirection: "column",
            width: "20%"
          }}
          onSubmit={this.searchSubmit}
        >
          <label>Title</label>
          <input id="queryInput" type="text" />
          <button type="submit">Search</button>
        </form>
        <div className="Root-books">{results}</div>
      </div>
    );
  }
}

export default withRouter(Create);
