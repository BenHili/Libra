import React from "react";
import "./Book.css";
import book from "../images/road_to_learn_react.jpg";

const title = `My title is very very longlonglonglonglonglonglonglong`;
const description = `Swipe at owner's legs p very very very very very very`;
const price = `$420`;

function Book() {
  return (
    <div className="Book-card">
      <span>
        <div className="Image-box">
          <img src={book} />
          <a className="View-btn">View</a>
        </div>
      </span>
      <div className="Text-box">
        <h2>{title}</h2>
        <p>{description}</p>
        <h2>{price}</h2>
      </div>
    </div>
  );
}

export default Book;
