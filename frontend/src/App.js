import React from "react";
import "./App.css";

import book from "./images/road_to_learn_react.jpg";
function Header(props) {
  return (
    <header className="App-header">
      <h1 style={{ width: "auto" }}>{props.name}</h1>
      <input className="App-search" type="text" />
    </header>
  );
}

function Result(props) {
  return (
    <div className="App-result">
      <img src={book} />
      <p>
        Swipe at owner's legs purr like an angel. Crash against wall but walk
        away like nothing happened so you're just gonna scroll by without saying
        meowdy? yet love and coo around boyfriend who purrs and makes the
        perfect moonlight eyes so i can purr and swat the glittery gleaming yarn
        to him (the yarn is from a $125 sweater) for lick the plastic bag, cats
        making all the muffins. When in doubt, wash always ensure to lay down in
        such a manner that tail can lightly brush human's nose yet kitty
        scratches couch bad kitty for 𝕄𝔼𝕆𝕎 sit in a box for hours.
      </p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Header name="📖 Libra" />
      <Result />
    </div>
  );
}

export default App;
