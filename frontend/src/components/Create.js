import React from "react";
import axios from "axios";
import Book from "./Book";

import "../App.css";

class Create extends React.Component {
  constructor(props) {
    super(props);

    this.state = { img: "", query: "" };
    this.searchSubmit = this.searchSubmit.bind(this);
  }

  async getGoogleResults(query) {
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=intitle:${query}`
    );

    this.setState({
      response: response.data.items,
      img: response.data.items[0].volumeInfo.imageLinks.smallThumbnail
    });
  }

  async searchSubmit() {
    const queryInput = document.getElementById("queryInput");
    this.setState({ query: queryInput.value });

    await this.getGoogleResults(queryInput.value);
  }

  render() {
    let results = [];
    if (this.state.response) {
      results = this.state.response.map(item => {
        return (
          <Book
            {...{
              img: item.volumeInfo.imageLinks.smallThumbnail,
              description: item.volumeInfo.description,
              title: item.volumeInfo.title
            }}
          />
        );
      });
    }
    return (
      <div className="App">
        <form
          style={{
            textAlign: "left",
            justifyContent: "left",
            display: "flex",
            flexDirection: "column",
            width: "20%"
          }}
        >
          <label>Title</label>
          <input id="queryInput" type="text" />
          <button type="button" onClick={this.searchSubmit}>
            Search
          </button>
        </form>

        <div className="App-books">{results}</div>
      </div>
    );
  }
}

export default Create;
