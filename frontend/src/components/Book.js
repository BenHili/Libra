import React from "react";
import "./Book.css";
import book from "../images/road_to_learn_react.jpg";

const title = `My title`;
const description = `Swipe at owner's legs purr like an angel. `;

function Book() {
  return (
    <div className="Book-card">
      <div className="Image-box">
        <img src={book} />
      </div>
      <div className="Text-box">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Book;
