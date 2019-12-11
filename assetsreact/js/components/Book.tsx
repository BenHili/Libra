import React from "react";
import "./Book.css";

interface BookProps {
  title: string;
  description: string;
  img: string;
  price: string;
}

function Book(props: BookProps) {
  return (
    <div className="Book-card">
      <span>
        <div className="Image-box">
          <img src={props.img} alt="Book Cover" />
          <button className="View-btn">View</button>
        </div>
      </span>
      <div className="Text-box">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <h2>{props.price}</h2>
      </div>
    </div>
  );
}

export default Book;
