import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import ReactJson from 'react-json-view';

const InfoTitle = styled.h1`
  text-decoration: underline;
`

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
      displayDataTypes: false,
    }; 

    let inlineStyle = {
        overflow: 'auto',
        maxHeight: 150
    };

    switch(this.props.typeContent) {
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
      default:
      //   rjvConfig.src = {};
    }

    return (
        <div>
          <InfoTitle>Info Window</InfoTitle>
          <ReactJson {...rjvConfig} style={inlineStyle}/>
        </div>
    )
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
}


export default connect(mapStateToProps)(InfoPane);