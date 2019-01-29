import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';
import ReactDOM from 'react-dom';

const InfoTitle = styled.h1`
  margin-top: 10px !important;
  margin: 0;
`;
class InfoPane extends Component {
  constructor() {
    super();
  }

  render() {
    let rjvConfig = {
      src: {},
      name: false,
      theme: 'monokai',
      enableClipboard: false,
      displayObjectSize: false,
      displayDataTypes: false
    };

    const infoTitle = ReactDOM.findDOMNode(this.refs.infoTitle);
    const height =
      infoTitle === null
        ? 0
        : this.props.infoWindowHeight - infoTitle.offsetHeight - 15;
    let inlineStyle = {
      overflow: 'auto',
      maxHeight: height
    };

    switch (this.props.typeContent) {
      case 'node':
        rjvConfig.src = this.props.currentNode;
        break;
      case 'pod':
        rjvConfig.src = this.props.currentPod;
        break;
      case 'service':
        rjvConfig.src = this.props.currentService;
        break;
      case 'pv':
        rjvConfig.src = this.props.currentPV;
        break;
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
    currentPV: state.pvsReducer.currentPV,
    typeContent: state.windowReducer.typeContent
  };
};

export default connect(mapStateToProps)(InfoPane);
