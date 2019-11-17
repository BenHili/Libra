import React from "react";
import "./App.css";

import book from "./images/road_to_learn_react.jpg";

const title = `My title`
const description = `Swipe at owner's legs purr like an angel. `;

function Header(props) {
  return (
    <header className="Header">
      <h1>{props.name}</h1>
      <input className="Header-search" type="text" />
    </header>
  );
}

function Result(props) {
  return (
    <div>
      <div className="Book-card-new">
        <div className="Image-box">
          <img src={props.image} />
        </div>
        <div className="Test-box">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Header name="📖 Libra" />
      <Result image={book} description={description} title={title} />
    </div>
  );
}

export default App;
