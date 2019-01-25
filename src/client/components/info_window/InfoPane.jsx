import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from "react-redux";

const InfoTitle = styled.h1`
  text-decoration: underline;
`

class InfoPane extends Component {
  constructor() {
    super();
  }

  render() {    
    return (
      <div>
        <InfoTitle>Info Window</InfoTitle>
        
      </div>
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