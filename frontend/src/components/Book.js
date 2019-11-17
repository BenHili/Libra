import React from "react";
import "./Book.css";

function Book(props) {
  return (
    <div className="Book-card">
      <div className="Image-box">
        <img src={props.image} />
      </div>
      <div className="Text-box">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default Book;
