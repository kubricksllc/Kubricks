import React, { Component } from "react";
import { connect } from "react-redux";
import buildTreeData from "./TreeData.jsx";
import styled from "styled-components";
import { updateCurrentPod } from "../redux/actions/podsActions";

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

  render() {
    const arr = buildTreeData(
      this.props.activeServices,
      this.props.listOfServices,
      this.props.listOfPods,
      this.props.currentNode,
      this.props.updateCurrentPod,
      this.props.updateCurrentService
    );

    return <TreeContainer id="treeContainer">{arr}</TreeContainer>;
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NodePage);
