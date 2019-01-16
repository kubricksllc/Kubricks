import React, { Component } from "react";
import { connect } from "react-redux";
import Tree from "react-d3-tree";
import buildTreeData from "./TreeData.jsx";
import styled from "styled-components";
import InfoWindow from "../../layout/InfoWindow.jsx";

const TreeWrapper = styled.div`
  name: treeWrapper;
  width: 1000px;
  height: 200px;
  background-color: white;
`;

class NodePage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const arr = buildTreeData(
      this.props.listOfServices,
      this.props.listOfPods,
      "gke-kubricks-default-pool-b055752b-wb5z"
    );

    return (
      <TreeWrapper id="treeWrapper">
        {/* <Tree
            data={buildTreeData(
              this.props.listOfServices,
              this.props.listOfPods,
              "gke-kubricks-default-pool-b055752b-wb5z"
            )}
            separation={{ siblings: 2, nonSiblings: 2 }}
          /> */}
        {arr}
      </TreeWrapper>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    listOfServices: state.servicesReducer.listOfServices,
    listOfPods: state.podsReducer.listOfPods,
    infoWindowOpen: state.windowReducer.infoWindowOpen
  };
};

export default connect(mapStateToProps)(NodePage);
