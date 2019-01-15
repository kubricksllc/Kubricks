import React, { Component } from "react";
import styled from "styled-components";

const Window = styled.div`
  position: fixed;
  border: solid;
  border-width: 2px;
  color: white;
  border-color: black;
  background-color: black;
  width: 200px;
  height: 200px;
  z-index: 1;
`;
export default class InfoWindow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var windowStyle = {
      top: this.props.mouseY - 100,
      left: this.props.mouseX + 20
    };

    return (
      <Window style={windowStyle}>
        <p>Name: {this.props.node.name}</p>
        <p>Status: {this.props.node.status}</p>
        <p>CreatedAt: {this.props.node.createdAt}</p>
        <p>Version: {this.props.node.version}</p>
      </Window>
    );
  }
}
