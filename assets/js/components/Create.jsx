var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React from "react";
import axios from "axios";
import Book from "./Book";
import { withRouter, Link } from "react-router-dom";
import "../App.css";
class Create extends React.Component {
    constructor(props) {
        super(props);
        this.searchSubmit = this.searchSubmit.bind(this);
    }
    getGoogleResults(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query}`);
            if (response.data.items && response.data.items.length > 0) {
                this.setState({
                    response: response.data.items,
                    img: response.data.items[0].volumeInfo.imageLinks.smallThumbnail
                });
            }
        });
    }
    searchSubmit(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const queryInput = document.getElementById("queryInput");
            yield this.getGoogleResults(queryInput.value);
        });
    }
    render() {
        let results = [];
        if (this.state && this.state.response) {
            results.push(this.state.response.map((item, index) => {
                return (<div key={index}>
              <Book {...{
                    img: item.volumeInfo.imageLinks.smallThumbnail,
                    description: item.volumeInfo.description,
                    title: item.volumeInfo.title
                }}/>
              <Link to={{
                    pathname: "/create/new",
                    state: { volumeInfo: item.volumeInfo }
                }}>
                {" "}
                My Link{" "}
              </Link>
            </div>);
            }));
        }
        return (<div className="App">
        <form style={{
            textAlign: "left",
            justifyContent: "left",
            display: "flex",
            flexDirection: "column",
            width: "20%"
        }} onSubmit={this.searchSubmit}>
          <label>Title</label>
          <input id="queryInput" type="text"/>
          <button type="submit">Search</button>
        </form>
        <div className="App-books">{results}</div>
      </div>);
    }
}
export default withRouter(Create);
//# sourceMappingURL=Create.jsx.map