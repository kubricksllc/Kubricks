import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";
import ReactJson from 'react-json-view';
import { ScrollBox, ScrollAxes } from 'react-scroll-box';

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

    let scrollBoxConfig = {
      
    };

    if(this.props.currentNode) {
      rjvConfig.src = this.props.currentNode;
    } else if(this.props.currentService) {
      rjvConfig.src = this.props.currentService;
    } else if(this.props.currentPod) {
      rjvConfig.src = this.props.currentPod;
    }

    return (
      <ScrollBox>
        <div>
          <InfoTitle>Info Window</InfoTitle>
          <ReactJson {...rjvConfig}/>
        </div>
      </ScrollBox>
    )
  }
}

const mapStateToProps = state => {
  return {
      currentNode: state.nodesReducer.currentNode,
      currentService: state.servicesReducer.currentService,
      currentPod: state.podsReducer.currentPod
  };
}


export default connect(mapStateToProps)(InfoPane);