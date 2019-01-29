import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ReactJson from "react-json-view";
import ReactDOM from "react-dom";

const InfoTitle = styled.h1`
  text-decoration: underline;
  margin: 0;
`;
const InfoBox = styled.div``;
class InfoPane extends Component {
  constructor() {
    super();
  }

  render() {
    let rjvConfig = {
      src: {},
      name: false,
      theme: "monokai",
      enableClipboard: false,
      displayObjectSize: false,
      displayDataTypes: false
    };

    const infoTitle = ReactDOM.findDOMNode(this.refs.infoTitle);
    const height =
      infoTitle === null
        ? 0
        : this.props.infoWindowHeight - infoTitle.offsetHeight;
    let inlineStyle = {
      overflow: "auto",
      maxHeight: height
    };

    console.log("height", height);
    switch (this.props.typeContent) {
      case "node":
        rjvConfig.src = this.props.currentNode;
        break;
      case "pod":
        rjvConfig.src = this.props.currentPod;
        break;
      case "service":
        rjvConfig.src = this.props.currentService;
        break;
      default:
      //   rjvConfig.src = {};
    }

    return (
      <div>
        <InfoTitle ref="infoTitle">Info Window</InfoTitle>
        <ReactJson {...rjvConfig} style={inlineStyle} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentNode: state.nodesReducer.currentNode,
    currentService: state.servicesReducer.currentService,
    currentPod: state.podsReducer.currentPod,
    typeContent: state.windowReducer.typeContent
  };
};

export default connect(mapStateToProps)(InfoPane);
