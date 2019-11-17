import React from "react";
import "./App.css";

function Header(props) {
  return (
    <header className="App-header">
      <h1 style={{ width: "auto" }}>{props.name}</h1>
      <input class="App-search" type="text" />
    </header>
  );
}

function App() {
  return (
    <div className="App">
      <Header name="📖 Libra" />
      <h1>blah</h1>
    </div>
  );
}

export default App;
