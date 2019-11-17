import React from "react";
import "./Search.css";

const appName = "Libra";

function Search(props) {
  return (
    <div className="Search-container">
      <h1>{appName}</h1>
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
