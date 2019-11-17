import React from "react";

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

export default Search;
