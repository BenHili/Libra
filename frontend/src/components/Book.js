import React from "react";

function Book(props) {
  return (
    <div className="Book-card">
      <img src={props.image} />
      <p>{props.description}</p>
    </div>
  );
}

export default Book;
