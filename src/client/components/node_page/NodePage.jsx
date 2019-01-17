import React, { Component } from "react";
import { connect } from "react-redux";
import buildTreeData from "./BuildTree.jsx";
import styled from "styled-components";
import Tree from "react-d3-tree";
import { updateCurrentPod } from "../redux/actions/podsActions";
import InfoWindow from "../../layout/InfoWindow.jsx";
import * as d3 from 'd3';

//TODO: fix the width and height after hex viewport is implemented!!!!!!!!!!!!!!!!

const TreeContainer = styled.div`
  name: treeWrapper;
  width: 1000px;
  height: 800px;
  background-color: skyblue;
`;

function checkNodeType(node, e, updateCurrentPod, updateCurrentService) {
  // console.log(node)
  if (node.otherAttr.podIdx) {
    // console.log(updateCurrentPod);
    // console.log(node)
    updateCurrentPod(node.otherAttr.podIdx);
  } else {
    console.log(node);
  }
}

class NodePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    const nodes = d3.selectAll('.linkBase');
    console.log(nodes)
  }

  render() {
    return (
      <TreeContainer id="treeContainer">
        <Tree
          data={[buildTreeData(
            this.props.activeServices,
            this.props.listOfServices,
            this.props.listOfPods,
            this.props.currentNode
          )]}
          translate={{x: Math.random()*75, y:Math.random()*75}}
          onMouseOver={(node, e) => {
            // console.log(e.clientX, e.clientY)
            checkNodeType(node, e, this.props.updateCurrentPod);
          }}
        />
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NodePage);
