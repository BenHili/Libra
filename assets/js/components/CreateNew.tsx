import React from "react";
import { withRouter } from "react-router-dom";

import "../App.css";

class CreateNew extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.location.state);
    this.state = {description: props.location.state.volumeInfo.description}
  }

  render() {
    return (
      <div className="App">
        <h1> Create new title info </h1>
        <h2>{this.state.description}</h2>
      </div>
    );
  }
}

export default withRouter(CreateNew);
