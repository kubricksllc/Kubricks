import React, { Component } from "react";
import HexWindow from "./HexWindow.jsx";

class MainWindow extends Component {
  constructor() {
    super();
    this.state = { mouseX: 0, mouseY: 0 };
    document.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  handleMouseMove(e) {
    this.setState({
      mouseX: e.clientX,
      mouseY: e.clientY
    });
  }

  render() {
    return (
      <div>
        <HexWindow mouseX={this.state.mouseX} mouseY={this.state.mouseY} />
      </div>
    );
  }
}

export default MainWindow;
