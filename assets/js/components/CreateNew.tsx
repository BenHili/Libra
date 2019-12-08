import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

import "../App.css";

interface ComponentState {
  description: string
}

class CreateNew extends Component<RouteComponentProps, ComponentState> {
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      description: props.location.state.volumeInfo.description
    } as ComponentState;
  }

  render() {
    return (
      <div className="Root">
        <h1> Create new title info </h1>
        <h2>{this.state.description}</h2>
      </div>
    );
  }
}

export default withRouter(CreateNew);
