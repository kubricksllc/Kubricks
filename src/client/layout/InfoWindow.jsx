import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Window = styled.div`
  background-color: black;
  border-radius: 3px;
  position: fixed;
  z-index: 1;
  max-width: 250px;
  word-break: break-word;
  width: 100%;
  color: white;
  padding: 10px;
  font-family: Lucida Console, Lucida Sans Typewriter, monaco,
    Bitstream Vera Sans Mono, monospace;
`;

const Title = styled.h1`
  font-size: 1em;
  text-align: center;
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
    if (
      this.props.currentNode !== null &&
      this.props.currentPod === null &&
      this.props.currentService === null
    ) {
      return (
        <Window style={windowStyle}>
          <div>
            <Title>NODE</Title>
            <p>NAME: {this.props.currentNode.name}</p>
            <p>STATUS: {this.props.currentNode.status}</p>
            <p>AGE: {this.props.currentNode.age}</p>
            <p>VERSION: {this.props.currentNode.version}</p>
          </div>
        </Window>
      );
    }
    if (this.props.viewMode === "Traffic") {
      if (this.props.currentPod) {
        return (
          <Window style={windowStyle}>
            <div>
              <Title>POD</Title>
              <p>NAME: {this.props.currentPod.name}</p>
              <p>STATUS: {this.props.currentPod.status.currentStatus}</p>
              <p>IP: {this.props.currentPod.status.podIP}</p>
              <p>LABELS: {JSON.stringify(this.props.currentPod.labels)}</p>
              <p>AGE: {this.props.currentPod.age}</p>
            </div>
          </Window>
        );
      } else if (this.props.currentService) {
        return (
          <Window style={windowStyle}>
            <div>
              <Title>SERVICE</Title>
              <p>name: {this.props.currentService.name}</p>
              <p>type: {this.props.currentService.type}</p>
              {this.props.currentService.type === "ClusterIP" && (
                <p>clusterIP: {this.props.currentService.clusterIP}</p>
              )}
            </div>
          </Window>
        );
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    viewMode: state.windowReducer.viewMode,
    currentNode: state.nodesReducer.currentNode,
    currentPod: state.podsReducer.currentPod,
    currentService: state.servicesReducer.currentService,
    mouseInfo: state.windowReducer.mouseInfo,
    typeContent: state.windowReducer.typeContent
  };
};

export default connect(mapStateToProps)(InfoWindow);
