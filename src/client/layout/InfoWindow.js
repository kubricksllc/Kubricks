import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

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

class InfoWindow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var windowStyle = {
      top: this.props.mouseInfo.y - 100,
      left: this.props.mouseInfo.x + 40
    };

    return (
      <Window style={windowStyle}>
        {this.props.currentNode !== null && (
          <div>
            <p>Name: {this.props.currentNode.name}</p>
            <p>Status: {this.props.currentNode.status}</p>
            <p>CreatedAt: {this.props.currentNode.createdAt}</p>
            <p>Version: {this.props.currentNode.version}</p>
          </div>
        )}
      </Window>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentNode: state.nodesReducer.currentNode,
    mouseInfo: state.windowReducer.mouseInfo
  };
};

export default connect(mapStateToProps)(InfoWindow);
