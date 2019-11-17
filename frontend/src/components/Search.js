import React from "react";
import "./Search.css";

function Search(props) {
  return (
    <div className="Search-container">
      <h1>{props.name}</h1>
      <input
        className="Search-input"
        type="text"
        onKeyPress={props.submit}
        onChange={props.change}
        placeholder={props.search}
      />
    </div>
  );
}

export default Search;
