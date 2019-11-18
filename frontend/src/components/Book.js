import React from "react";
import "./Book.css";

function Book(props) {
  return (
    <div className="Book-card">
      <span>
        <div className="Image-box">
          <img src={props.img} />
          <a className="View-btn">View</a>
        </div>
      </span>
      <div className="Text-box">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
    </div>
  );
}

export default Book;
