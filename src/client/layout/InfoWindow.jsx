import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Window = styled.div`
  background-color: black;
  border-radius: 3px;
  position: fixed;
  zindex: 1;
  max-width: 250px;
  word-break: break-word;
  width: 100%;
  color: white;
  padding-left: 10px;
  font-family: Lucida Console,Lucida Sans Typewriter,monaco,Bitstream Vera Sans Mono,monospace;
`;

class InfoWindow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var windowStyle = {
      left: this.props.mouseInfo.x,
      top: this.props.mouseInfo.y
    };

    return (
      <Window style={windowStyle}>
        {this.props.currentNode !== null && (
          <div>
            <p>NAME: {this.props.currentNode.name}</p>
            <p>STATUS: {this.props.currentNode.status}</p>
            <p>AGE: {this.props.currentNode.age}</p>
            <p>VERSION: {this.props.currentNode.version}</p>
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
