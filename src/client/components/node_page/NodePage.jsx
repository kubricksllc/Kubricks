import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { updateCurrentPod } from "../redux/actions/podsActions";
import { withRouter } from 'react-router-dom';

//TODO: fix the width and height after hex viewport is implemented!!!!!!!!!!!!!!!!

const TreeContainer = styled.div`
  name: treeWrapper;
  width: 97%;
  height: 97%;
  display: flex;
  flex-direction: column;
`;

class NodePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }



  render() {
    return (
      <TreeContainer id="treeContainer">
      </TreeContainer>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    listOfServices: state.servicesReducer.listOfServices,
    activeServices: state.servicesReducer.activeServices,
    listOfPods: state.podsReducer.listOfPods,
    infoWindowOpen: state.windowReducer.infoWindowOpen,
    currentNode: state.nodesReducer.currentNode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCurrentPod: podIdx => dispatch(updateCurrentPod(podIdx)),
    updateCurrentService: serviceIdx =>
      dispatch(updateCurrentService(serviceIdx))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(NodePage));
